// Lógica: transforma los datos. No pide nada a la API ni toca la página.

// La PokéAPI devuelve muchísimos datos: nos quedamos solo con los que se muestran.
// "?." y "??" evitan que la app explote si falta algún campo.
export function simplificar(datos) {
  return {
    id: datos?.id ?? 0,
    nombre: datos?.name ?? "desconocido",
    imagen: datos?.sprites?.front_default ?? "",
    tipos: (datos?.types ?? []).map((entrada) => entrada?.type?.name ?? "?"),
  };
}

// Los Pokémon cuyo nombre contiene el texto buscado.
export function buscar(pokemons, texto) {
  const buscado = texto.trim().toLowerCase();
  return pokemons.filter((pokemon) => pokemon.nombre.includes(buscado));
}

// Cuántos Pokémon hay de cada tipo: { grass: 12, poison: 33, ... }
export function contarTipos(pokemons) {
  return pokemons
    .flatMap((pokemon) => pokemon.tipos)
    .reduce((conteo, tipo) => {
      conteo[tipo] = (conteo[tipo] ?? 0) + 1;
      return conteo;
    }, {});
}
