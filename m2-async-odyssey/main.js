// Render: carga los Pokémon, los pinta en la página y escucha el buscador.

import { obtenerPokemons } from "./api.js";
import { buscar, contarTipos } from "./logica.js";

const CANTIDAD = 151; // los Pokémon originales de Kanto

const estado = document.querySelector("#estado");
const resumen = document.querySelector("#resumen");
const lista = document.querySelector("#lista");
const buscador = document.querySelector("#buscador");

let pokemons = []; // se rellena al cargar

// Muestra un mensaje de estado. clase: "cargando", "error" o "" (normal).
function pintarEstado(mensaje, clase = "") {
  estado.textContent = mensaje;
  estado.className = clase;
}

// Una tarjeta por Pokémon. En el HTML solo entran datos de la API, nunca lo que escribe el usuario.
function pintarLista(visibles) {
  if (visibles.length === 0) {
    lista.innerHTML = `<li class="vacio">Ningún Pokémon coincide con la búsqueda.</li>`;
    return;
  }
  lista.innerHTML = visibles
    .map(
      (pokemon) => `
        <li class="tarjeta">
          <img src="${pokemon.imagen}" alt="${pokemon.nombre}" />
          <strong>#${pokemon.id} ${pokemon.nombre}</strong>
          <span>${pokemon.tipos.join(" · ")}</span>
        </li>`,
    )
    .join("");
}

// Una línea con cuántos hay de cada tipo: "Tipos: grass 12 · poison 33 · ..."
function pintarResumen(conteo) {
  const partes = Object.entries(conteo).map(([tipo, cantidad]) => `${tipo} ${cantidad}`);
  resumen.textContent = `Tipos: ${partes.join(" · ")}`;
}

async function iniciar() {
  pintarEstado("Cargando Pokémon…", "cargando");
  try {
    pokemons = await obtenerPokemons(CANTIDAD);
    pintarEstado(`${pokemons.length} Pokémon cargados.`);
    pintarResumen(contarTipos(pokemons));
    pintarLista(buscar(pokemons, buscador.value)); // por si ya se escribió algo mientras cargaba
  } catch (error) {
    console.error(error); // el detalle técnico, para quien abra la consola
    pintarEstado("No se han podido cargar los Pokémon. Revisa tu conexión y recarga la página.", "error");
  }
}

buscador.addEventListener("input", () => {
  pintarLista(buscar(pokemons, buscador.value));
});

iniciar();
