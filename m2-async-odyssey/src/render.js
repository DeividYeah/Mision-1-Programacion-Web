/*
 * Capa de presentación: es la única que toca el DOM.
 */

const resultados = document.querySelector("#resultados");
const resumen = document.querySelector("#resumen");
const selectTipo = document.querySelector("#tipo");

export function pintarCargando() {
  resumen.textContent = "";
  resultados.innerHTML = `
    <p class="estado estado--cargando">Cargando Pokémon desde la API…</p>
  `;
}

export function pintarError(mensaje) {
  resumen.textContent = "";
  resultados.innerHTML = `
    <div class="estado estado--error">
      <p>Algo ha salido mal: ${mensaje}</p>
      <button type="button" id="reintentar">Reintentar</button>
    </div>
  `;
}

export function pintarVacio(busqueda) {
  resultados.innerHTML = `
    <p class="estado">Ningún Pokémon coincide con «${busqueda}».</p>
  `;
}

export function pintarResumen({ total, ataqueMedio, masFuerte }, desdeCache) {
  if (total === 0) {
    resumen.textContent = "";
    return;
  }

  const origen = desdeCache ? "caché local" : "API";

  resumen.innerHTML = `
    <span><strong>${total}</strong> Pokémon</span>
    <span>Ataque medio: <strong>${ataqueMedio}</strong></span>
    <span>Más fuerte: <strong>${masFuerte.nombre}</strong> (${masFuerte.ataque})</span>
    <span class="origen">Origen: ${origen}</span>
  `;
}

function tarjeta(uno) {
  const tipos = uno.tipos.map((tipo) => `<span class="tipo">${tipo}</span>`).join("");
  const imagen = uno.imagen
    ? `<img src="${uno.imagen}" alt="${uno.nombre}" loading="lazy">`
    : `<div class="sin-imagen">?</div>`;

  return `
    <article class="tarjeta">
      ${imagen}
      <h2>${uno.nombre}</h2>
      <p class="numero">Nº ${String(uno.id).padStart(3, "0")}</p>
      <div class="tipos">${tipos}</div>
      <ul class="stats">
        <li>ATK <strong>${uno.ataque}</strong></li>
        <li>DEF <strong>${uno.defensa}</strong></li>
        <li>VEL <strong>${uno.velocidad}</strong></li>
      </ul>
    </article>
  `;
}

export function pintarPokemon(lista) {
  resultados.innerHTML = lista.map(tarjeta).join("");
}

export function pintarTipos(tipos) {
  const opciones = tipos.map((tipo) => `<option value="${tipo}">${tipo}</option>`).join("");
  selectTipo.innerHTML = `<option value="todos">Todos los tipos</option>${opciones}`;
}
