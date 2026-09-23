/*
 * Lógica pura: recibe datos, devuelve datos. No toca el DOM ni la red,
 * así que se puede razonar (y probar) por separado.
 */

const ORDENES = {
  numero: (a, b) => a.id - b.id,
  nombre: (a, b) => a.nombre.localeCompare(b.nombre),
  ataque: (a, b) => b.ataque - a.ataque
};

export function listarTipos(pokemon) {
  const todos = pokemon.flatMap((uno) => uno.tipos);
  return [...new Set(todos)].sort();
}

export function aplicarFiltros(pokemon, { busqueda = "", tipo = "todos", orden = "numero" }) {
  const texto = busqueda.trim().toLowerCase();

  return pokemon
    .filter((uno) => uno.nombre.includes(texto))
    .filter((uno) => tipo === "todos" || uno.tipos.includes(tipo))
    .sort(ORDENES[orden] ?? ORDENES.numero);
}

export function resumir(pokemon) {
  if (pokemon.length === 0) {
    return { total: 0, ataqueMedio: 0, masFuerte: null };
  }

  const ataqueTotal = pokemon.reduce((suma, uno) => suma + uno.ataque, 0);
  const masFuerte = pokemon.reduce((mejor, uno) => (uno.ataque > mejor.ataque ? uno : mejor));

  return {
    total: pokemon.length,
    ataqueMedio: Math.round(ataqueTotal / pokemon.length),
    masFuerte
  };
}
