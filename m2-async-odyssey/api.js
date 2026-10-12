// API: pide los Pokémon a la PokéAPI y los guarda en localStorage (bonus).

import { simplificar } from "./logica.js";

const URL_API = "https://pokeapi.co/api/v2/pokemon";
const CLAVE_CACHE = "pokedex-kanto";

// Pide un Pokémon por su número.
async function pedirPokemon(id) {
  const respuesta = await fetch(`${URL_API}/${id}`);
  // Un 404 o un 500 no hacen fallar a fetch: hay que comprobar response.ok.
  if (!respuesta.ok) {
    throw new Error(`La PokéAPI ha respondido con error ${respuesta.status}`);
  }
  return respuesta.json();
}

// Los Pokémon del 1 al "cantidad". Si ya se pidieron antes, salen de la caché.
export async function obtenerPokemons(cantidad) {
  const guardados = leerCache();
  if (guardados) return guardados;

  const ids = Array.from({ length: cantidad }, (_, i) => i + 1); // [1, 2, ..., cantidad]
  const respuestas = await Promise.all(ids.map(pedirPokemon)); // todas a la vez
  const pokemons = respuestas.map(simplificar);

  guardarCache(pokemons);
  return pokemons;
}

// --- Caché (bonus) ---
// Van en try/catch porque localStorage puede estar bloqueado, lleno o tener datos rotos.

function leerCache() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_CACHE));
    return Array.isArray(guardados) ? guardados : null;
  } catch {
    return null;
  }
}

function guardarCache(pokemons) {
  try {
    localStorage.setItem(CLAVE_CACHE, JSON.stringify(pokemons));
  } catch {
    // Si no se puede guardar, la app funciona igual, solo que sin caché.
  }
}
