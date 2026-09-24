# El oráculo de los números

Juego «Adivina el número» (1–100) en el navegador. Cuaderno 1, nivel 2.

## Cómo ejecutarlo

Abre `index.html` en el navegador. No necesita instalación.

## Cómo se juega

1. El oráculo elige un número secreto entre 1 y 100.
2. Escribe un número y pulsa **Consultar**.
3. El oráculo responde si el secreto es mayor o menor.
4. Al acertar se muestra cuántos intentos has necesitado y el botón se desactiva.

Si el campo está vacío o el número está fuera de 1–100, aparece un aviso y **no** se
gasta intento.

## Estructura

```
oraculo-numeros/
├── index.html   Estructura de la página
├── styles.css   Estilos básicos
├── app.js       Lógica del juego
└── README.md
```

## Qué practica

- `const` / `let`, `Number()` y comparación estricta con `===`.
- Condicionales `if` / `else if` / `else`.
- *Template literals* para los mensajes.
- `querySelector`, `textContent` y el evento `click` con `addEventListener`.
- Script cargado con `defer`.

## Declaración de uso de IA

He usado **Claude (Anthropic)** como apoyo para escribir una primera versión del juego.
He revisado y comprendido todo el código.
