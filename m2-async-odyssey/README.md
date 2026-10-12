# Pokédex de Kanto

**M2 · Async Odyssey.** Aplicación hecha con Vite que carga los 151 Pokémon originales de la
[PokéAPI](https://pokeapi.co/) con `fetch` + `async/await`, los muestra en tarjetas, cuenta
cuántos hay de cada tipo y permite buscarlos por nombre.

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Y abre la dirección que muestra Vite (normalmente `http://localhost:5173`).

## Decisiones

- El código está separado en tres módulos: `api.js` (peticiones y caché), `logica.js`
  (`map`, `filter` y `reduce`) y `main.js` (pintar en la página y escuchar el buscador).
- Se cargan solo los 151 de Kanto, todos al empezar, así que no hace falta paginar y el
  buscador no hace peticiones.
- Si `response.ok` es falso, `api.js` lanza un error. `main.js` lo recoge con `try/catch` y
  muestra un mensaje de error; mientras tanto se ve «Cargando Pokémon…».
- Bonus: la lista ya simplificada se guarda en `localStorage`, así que al recargar no se repiten
  las peticiones.

## Uso de IA

**Herramienta:** Claude (Anthropic), desde la extensión Claude Code de VS Code, siempre **bajo mi
supervisión**.

**Qué hizo la IA:** creó el JavaScript (`api.js`, `logica.js` y `main.js`) para que la app
funcionara, corrigió fallos míos y puso orden en el proyecto. Además, redactó este README siguiendo
mis indicaciones.

**Qué hice yo a mano:** el HTML y el CSS: la estructura de la página, inspirada en una version de la mision 2 que tomé de referencia para crear mi codigo. También revisé el resultado otorgado por claude tras pedrile ayuda.
y pedí los cambios.

**Prompts reales:**

1. > Haz funcionar este codigo sin cambiar el html y el css, estos solo puedes editarlos si ves algun error o para     buscar limpieza en el codigo.
2. > me parece que esta todo muy currado, haz 1 codigo html 1 css y un javascript, borra todo lo sobrante para ceñirnos a lo que nos pide el enunciado, solo en la mision 2.

   Claude me avisó de que con un solo JavaScript no se cumplía «separar API, lógica y render»,
   y elegí quedarme con tres archivos.

**Cómo lo verifiqué:** `npm run build` termina sin errores. La lógica y la API se probaron con
datos raros y con fallos simulados (sin red, error 500, JSON roto y respuesta vacía). La app se
probó en Chrome: carga los 151, el buscador filtra, al recargar no repite peticiones y, con la
API bloqueada, muestra el mensaje de error.

## Autopsia

1. **Las 151 peticiones a la vez con `Promise.all`.** Si falla una, falla toda la carga.
   *Descarté* `Promise.allSettled`, que mostraría los que sí llegan, porque complica el código
   y la caché podría quedar a medias. También descarté pedirlos uno a uno con `await` en un
   bucle, porque sería mucho más lento.
2. **Las tarjetas se pintan con `innerHTML`.** Es discutible porque interpreta el texto como
   HTML. *Descarté* `createElement` + `textContent`, que es más seguro, porque son muchas más
   líneas. En `innerHTML` solo entran datos de la PokéAPI, nunca lo que escribe el usuario.
