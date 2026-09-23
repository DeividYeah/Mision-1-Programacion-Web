# Caza-Bugs 🐛

**Misión 1 · El despertar del DOM** — U1: Introducción a JavaScript y al cliente web.

> *Sin frameworks. Sin librerías. Tú contra el navegador.*

Mini-juego de reflejos construido con HTML, CSS y JavaScript puro. Aparecen bugs en un
tablero 4x4 y hay que aplastarlos antes de que el tiempo se acabe, evitando los escudos
(código bueno) que restan puntos.

---

## Cómo ejecutarlo

No necesita instalación ni servidor:

1. Clona o descarga el repositorio.
2. Abre `index.html` en el navegador.

## Cómo se juega

| Acción | Resultado |
| --- | --- |
| Clic en 🐛 | +1 punto |
| Clic en 🛡️ | −2 puntos (era código bueno) |
| Clic en una casilla vacía | −1 punto |

- Escribe tu nombre y elige la dificultad (**Tranquilo**, **Normal** o **Caótico**):
  cambia la velocidad de aparición y cuántos escudos hay en pantalla.
- Pulsa **Empezar partida** o la tecla <kbd>Espacio</kbd>.
- La partida dura 30 segundos. El récord se guarda en `localStorage`.

### ⭐ Bonus: modo oscuro

Pulsa la tecla secreta <kbd>N</kbd> (de *night*) en cualquier momento para alternar el
tema claro/oscuro. Funciona cambiando una clase en `<body>`; los colores viven en
variables CSS, así que no hay estilos duplicados.

---

## Estructura

```
m1-despertar-del-dom/
├── index.html        Estructura y marcado semántico
├── css/
│   └── styles.css    Estilos + variables de tema (claro/oscuro)
├── js/
│   └── main.js       Toda la lógica del juego
└── README.md
```

Los tres lenguajes están en archivos propios: el HTML no contiene ni una línea de CSS
ni de JavaScript, y no hay ningún handler inline (`onclick="..."`).

## Decisiones técnicas

- **El tablero se genera desde JS.** `createElement` + `appendChild` en un bucle crean
  las 16 casillas; el HTML solo aporta el contenedor vacío.
- **Delegación de eventos.** Un único `addEventListener` en el tablero en vez de 16
  listeners. `event.target.closest(".casilla")` identifica la casilla pulsada.
- **Estado y presentación separados.** Las variables (`puntos`, `tiempo`, `enJuego`)
  guardan el estado; funciones como `pintarMarcador()` lo vuelcan al DOM. Así el DOM
  nunca es la fuente de verdad.
- **`classList` en lugar de estilos inline.** El tipo de casilla se expresa con las
  clases `.bug` y `.escudo`, y el CSS decide cómo se ven.
- **`const` por defecto, `let` solo donde el valor cambia.** Ninguna `var`.
- **Template literals** para los mensajes al jugador.
- **Dos temporizadores independientes**: uno reparte rondas (su velocidad depende del
  nivel) y otro descuenta segundos. Ambos se limpian con `clearInterval` al terminar,
  para que reiniciar no deje relojes colgando.

## Rúbrica cubierta

| Criterio | Dónde se ve |
| --- | --- |
| Manipulación del DOM | `crearTablero()`, `repartirRonda()`, `limpiarTablero()` |
| Eventos | `click` (tablero y botón), `input` (nombre y dificultad), `keydown` (espacio y tecla secreta) |
| Fundamentos JS | `const`/`let`, funciones con responsabilidad única, `if`/`while`/`forEach`, template literals |
| Calidad y organización | Archivos separados, secciones comentadas, nombres en español sin abreviaturas |
| Originalidad | Sistema de penalizaciones, tres niveles, récord persistente, modo oscuro secreto |

## Tecnología

HTML5, CSS3 (Grid, variables, animaciones) y JavaScript ES6+. Cero dependencias.

---

## Declaración de uso de IA

He usado **Claude (Anthropic)** como apoyo durante el desarrollo de esta práctica:

- Para generar una primera versión del esqueleto del juego y de los estilos.
- Para revisar el código y comentar decisiones (delegación de eventos, limpieza de
  temporizadores, uso de variables CSS para el tema).

He revisado, probado y comprendido todo el código entregado, y soy capaz de explicar
cualquier parte de él. Las decisiones de diseño del juego (mecánica, penalizaciones,
niveles) son propias.
