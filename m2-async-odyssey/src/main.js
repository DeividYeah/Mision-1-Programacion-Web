/*
 * Punto de entrada: conecta API, lógica y render. No hace fetch ni
 * construye HTML por su cuenta, solo coordina.
 */

import "./style.css";
import { obtenerPokemon } from "./api.js";
import { aplicarFiltros, listarTipos, resumir } from "./transform.js";
import {
  pintarCargando,
  pintarError,
  pintarPokemon,
  pintarResumen,
  pintarTipos,
  pintarVacio
} from "./render.js";

const inputBusqueda = document.querySelector("#busqueda");
const selectTipo = document.querySelector("#tipo");
const selectOrden = document.querySelector("#orden");
const botonRecargar = document.querySelector("#recargar");
const resultados = document.querySelector("#resultados");

// Única fuente de verdad de la aplicación.
const estado = {
  pokemon: [],
  desdeCache: false,
  filtros: { busqueda: "", tipo: "todos", orden: "numero" }
};

function refrescarVista() {
  const visibles = aplicarFiltros(estado.pokemon, estado.filtros);

  pintarResumen(resumir(visibles), estado.desdeCache);

  if (visibles.length === 0) {
    pintarVacio(estado.filtros.busqueda || estado.filtros.tipo);
    return;
  }

  pintarPokemon(visibles);
}

async function cargar({ forzarRed = false } = {}) {
  pintarCargando();

  try {
    const { datos, desdeCache } = await obtenerPokemon({ forzarRed });

    estado.pokemon = datos;
    estado.desdeCache = desdeCache;

    pintarTipos(listarTipos(datos));
    selectTipo.value = estado.filtros.tipo;
    refrescarVista();
  } catch (error) {
    pintarError(error.message);
  }
}

// --- Eventos ------------------------------------------------------------
inputBusqueda.addEventListener("input", (evento) => {
  estado.filtros.busqueda = evento.target.value.toLowerCase();
  refrescarVista();
});

selectTipo.addEventListener("change", (evento) => {
  estado.filtros.tipo = evento.target.value;
  refrescarVista();
});

selectOrden.addEventListener("change", (evento) => {
  estado.filtros.orden = evento.target.value;
  refrescarVista();
});

botonRecargar.addEventListener("click", () => cargar({ forzarRed: true }));

// El botón de reintentar se crea dentro del estado de error: delegación.
resultados.addEventListener("click", (evento) => {
  if (evento.target.id === "reintentar") {
    cargar({ forzarRed: true });
  }
});

// --- Arranque -----------------------------------------------------------
cargar();
