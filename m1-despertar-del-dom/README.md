# Caza-Bugs 🐛

**Misión 1 · El despertar del DOM** — U1: Introducción a JavaScript y al cliente web.

Mini-juego hecho con HTML, CSS y JavaScript puro (sin frameworks ni librerías).
En un tablero de 3x3 aparece un bug que cambia de casilla cada poco tiempo. Hay que
hacerle clic para sumar puntos antes de que se acaben los 20 segundos.

## Cómo ejecutarlo

Abre `index.html` en el navegador. No necesita instalación.

## Cómo se juega

1. Escribe tu nombre (opcional) y pulsa **Empezar**.
2. Haz clic en la casilla del 🐛: cada acierto suma 1 punto.
3. A los 20 segundos se acaba la partida y se muestra tu puntuación.

### ⭐ Bonus: modo oscuro

Pulsa la tecla secreta <kbd>N</kbd> para activar o desactivar el modo oscuro.
Un evento `keydown` sobre `document` hace `document.body.classList.toggle("oscuro")`.

## Estructura

```
m1-despertar-del-dom/
├── index.html   Estructura de la página
├── styles.css   Estilos y modo oscuro
├── main.js      Lógica del juego
└── README.md
```

El HTML no tiene CSS ni JavaScript dentro, ni handlers inline (`onclick="..."`).

## Qué se practica

| Criterio | Dónde se ve |
| --- | --- |
| Manipulación del DOM | `querySelector`, `createElement` + `appendChild` en `crearTablero()`, `textContent` y `classList` en `moverBug()`, que guarda la casilla del bug (`casillaBug`) para limpiar solo esa |
| Eventos | `click` en el botón y **delegación de eventos** en `#tablero` (un solo listener, `evento.target`), `input` (nombre), `keydown` (tecla secreta) con `addEventListener` |
| Fundamentos JS | `const` / `let`, funciones, bucles `for`, `if`, template literals, `setInterval` / `clearInterval` |
| Calidad | Código comentado por pasos y nombres claros en español |

## Tecnología

HTML5, CSS3 (Grid) y JavaScript ES6+. Cero dependencias.

## Declaración de uso de IA

He usado **Claude (Anthropic)** como apoyo para escribir una primera versión del juego
y para que me explicara el código. Tras la primera corrección, también me ayudó a aplicar
las mejoras propuestas (guardar la casilla del bug, delegación de eventos y fijar el nombre
del jugador al empezar), cada una en su propio commit. He revisado, probado y comprendido todo el código
entregado.
