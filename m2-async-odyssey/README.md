# Pokédex Odyssey ⚡

**Misión 2 · Async Odyssey** — U2: JavaScript avanzado y herramientas del frontend.

> *El event loop no espera a nadie.*

Explorador de Pokémon que consume la API pública [PokeAPI](https://pokeapi.co) con
`fetch` + `async/await`, transforma los datos con métodos de array y los renderiza en
el DOM con estados de carga y error visibles. Arrancado con **Vite** y organizado en
módulos ES.

---

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Vite abre la app en `http://localhost:5173`.

Otros comandos:

```bash
npm run build     # build de producción en dist/
npm run preview   # sirve el build para comprobarlo
```

## Qué hace

- Descarga los primeros 48 Pokémon (listado + detalle de cada uno).
- **Buscador** por nombre, **filtro** por tipo y **ordenación** por número, nombre o ataque.
- **Resumen calculado** en vivo: total, ataque medio y Pokémon más fuerte del conjunto visible.
- **Estados explícitos**: spinner mientras carga, mensaje de error con botón *Reintentar*,
  y aviso cuando ningún resultado coincide.

### ⭐ Bonus: caché en localStorage

La respuesta se guarda en `localStorage` con una marca de tiempo y una vida de 1 hora.
Al recargar la página los datos salen de la caché y no se repite la petición; el resumen
indica si el origen es `caché local` o `API`. El botón **Recargar** fuerza ir a la red.

---

## Estructura

```
m2-async-odyssey/
├── index.html          Marcado base + punto de montaje
├── package.json        Scripts de Vite y dependencias
├── .gitignore
└── src/
    ├── main.js         Orquestador: estado y eventos
    ├── api.js          Todo lo que habla con la red
    ├── transform.js    Lógica pura: filtrar, ordenar, resumir
    ├── render.js       Todo lo que toca el DOM
    ├── cache.js        Caché en localStorage
    └── style.css
```

Cada módulo tiene una responsabilidad y no invade la de los demás:

- `api.js` es el **único** que llama a `fetch` y el único que conoce la URL de PokeAPI.
- `transform.js` no toca el DOM ni la red: recibe datos y devuelve datos.
- `render.js` es el **único** que manipula el DOM.
- `main.js` no hace `fetch` ni construye HTML: solo coordina los otros tres.

## Decisiones técnicas

- **`async/await` con `try/catch`.** Cada petición comprueba `response.ok` antes de
  parsear: un 404 o un 500 no lanzan solos, así que se convierten en `Error` a mano.
- **`Promise.allSettled` para el detalle.** Las 48 peticiones de detalle van en paralelo;
  si alguna falla, se descarta esa tarjeta en vez de tumbar toda la carga.
- **Normalización en el borde.** `normalizar()` aplana la respuesta de la API a la forma
  que usa la app, con `??` para los campos que pueden faltar (sprites vacíos, stats raras).
  El resto del código nunca ve la estructura cruda de PokeAPI.
- **Métodos de array, no bucles.** `map` para transformar, `filter` para buscar y filtrar,
  `reduce` para el ataque medio y el más fuerte, `flatMap` + `Set` para la lista de tipos.
- **Un único objeto `estado`.** Los filtros viven ahí y cualquier cambio pasa por
  `refrescarVista()`; no hay datos duplicados entre el DOM y las variables.
- **Delegación para el botón *Reintentar*,** que se crea dentro del estado de error y no
  existe al cargar la página.
- **Caché defensiva.** Todos los accesos a `localStorage` van en `try/catch`: en modo
  incógnito o con la cuota llena la app sigue funcionando, solo pierde la caché.

## Rúbrica cubierta

| Criterio | Dónde se ve |
| --- | --- |
| Asincronía | `api.js` (`async/await`, `response.ok`, `Promise.allSettled`), estados en `render.js` |
| Transformación de datos | `transform.js`: `map`, `filter`, `reduce`, `flatMap`, `sort` |
| Módulos y estructura | 5 módulos ES con responsabilidades separadas |
| Robustez | Listas vacías, peticiones fallidas, campos ausentes, `localStorage` no disponible |
| Originalidad | Resumen estadístico en vivo, triple control de búsqueda/filtro/orden, indicador de origen de los datos |

## Tecnología

Vite 5, JavaScript ES6+ (módulos, `async/await`, optional chaining, nullish coalescing),
CSS Grid y variables CSS. Sin frameworks de UI ni librerías de red.

---

## Declaración de uso de IA

He usado **Claude (Anthropic)** como apoyo durante el desarrollo de esta práctica:

- Para generar una primera versión de la estructura en módulos y del maquetado.
- Para revisar el manejo de errores y comentar decisiones (`Promise.allSettled` frente a
  `Promise.all`, normalización de la respuesta, caché con expiración).

He revisado, probado y comprendido todo el código entregado, y soy capaz de explicar
cualquier parte de él. La elección de la API, el diseño de la interfaz y las funciones
de la app son propias.
