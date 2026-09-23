/*
 * Capa de acceso a datos: aquí vive todo lo que habla con la red.
 * Ningún otro módulo hace fetch ni conoce la URL de la API.
 */

import { leerCache, guardarCache } from "./cache.js";

const BASE = "https://pokeapi.co/api/v2";
const CANTIDAD = 48;

async function pedirJSON(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`La API respondió ${respuesta.status} (${respuesta.statusText}).`);
  }

  return respuesta.json();
}

// Convierte la respuesta cruda de la API en el objeto que usa la app.
function normalizar(crudo) {
  const estadisticas = crudo.stats ?? [];
  const buscarStat = (nombre) =>
    estadisticas.find((stat) => stat.stat?.name === nombre)?.base_stat ?? 0;

  return {
    id: crudo.id ?? 0,
    nombre: crudo.name ?? "desconocido",
    tipos: (crudo.types ?? []).map((entrada) => entrada.type?.name).filter(Boolean),
    ataque: buscarStat("attack"),
    defensa: buscarStat("defense"),
    velocidad: buscarStat("speed"),
    imagen:
      crudo.sprites?.other?.["official-artwork"]?.front_default ??
      crudo.sprites?.front_default ??
      ""
  };
}

/**
 * Descarga el listado y el detalle de cada Pokémon.
 * Usa la caché si hay datos frescos; si no, pide a la red y guarda.
 */
export async function obtenerPokemon({ forzarRed = false } = {}) {
  const clave = `pokemon:${CANTIDAD}`;

  if (!forzarRed) {
    const enCache = leerCache(clave);
    if (enCache) {
      return { datos: enCache, desdeCache: true };
    }
  }

  const listado = await pedirJSON(`${BASE}/pokemon?limit=${CANTIDAD}`);
  const resultados = listado.results ?? [];

  if (resultados.length === 0) {
    throw new Error("La API devolvió una lista vacía.");
  }

  // Las peticiones de detalle van en paralelo; si una falla, se descarta.
  const respuestas = await Promise.allSettled(
    resultados.map((entrada) => pedirJSON(entrada.url))
  );

  const datos = respuestas
    .filter((respuesta) => respuesta.status === "fulfilled")
    .map((respuesta) => normalizar(respuesta.value));

  if (datos.length === 0) {
    throw new Error("No se pudo recuperar el detalle de ningún Pokémon.");
  }

  guardarCache(clave, datos);
  return { datos, desdeCache: false };
}
