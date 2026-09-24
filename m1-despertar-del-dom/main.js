// Caza-Bugs: aparece un bug en una casilla y hay que hacerle clic.

// 1. Elementos de la página que vamos a usar
const tablero = document.querySelector("#tablero");
const boton = document.querySelector("#boton");
const inputNombre = document.querySelector("#nombre");
const textoPuntos = document.querySelector("#puntos");
const textoTiempo = document.querySelector("#tiempo");
const mensaje = document.querySelector("#mensaje");

// 2. Datos del juego
const NUMERO_CASILLAS = 9;
const casillas = [];
let puntos = 0;
let tiempo = 20;
let temporizadorBug = null;
let temporizadorReloj = null;

// 3. Crear las 9 casillas del tablero
function crearTablero() {
  for (let i = 0; i < NUMERO_CASILLAS; i++) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.addEventListener("click", clickEnCasilla);
    tablero.appendChild(casilla);
    casillas.push(casilla);
  }
}

// 4. Quitar el bug de donde esté y ponerlo en una casilla al azar
function moverBug() {
  for (const casilla of casillas) {
    casilla.classList.remove("bug");
    casilla.textContent = "";
  }

  const posicion = Math.floor(Math.random() * NUMERO_CASILLAS);
  casillas[posicion].classList.add("bug");
  casillas[posicion].textContent = "🐛";
}

// 5. Qué pasa al hacer clic en una casilla
function clickEnCasilla(evento) {
  const casilla = evento.target;

  if (casilla.classList.contains("bug")) {
    puntos++;
    textoPuntos.textContent = puntos;
    moverBug();
  }
}

// 6. Nombre del jugador (si no escribe nada, "Anónimo")
function nombreJugador() {
  const nombre = inputNombre.value.trim();
  if (nombre === "") {
    return "Anónimo";
  }
  return nombre;
}

// 7. Empezar la partida
function empezar() {
  puntos = 0;
  tiempo = 20;
  textoPuntos.textContent = puntos;
  textoTiempo.textContent = tiempo;
  boton.disabled = true;
  mensaje.textContent = `¡Suerte, ${nombreJugador()}!`;

  moverBug();
  temporizadorBug = setInterval(moverBug, 800);
  temporizadorReloj = setInterval(restarSegundo, 1000);
}

// 8. Cada segundo baja el tiempo; al llegar a 0 se acaba
function restarSegundo() {
  tiempo--;
  textoTiempo.textContent = tiempo;

  if (tiempo === 0) {
    terminar();
  }
}

// 9. Terminar la partida
function terminar() {
  clearInterval(temporizadorBug);
  clearInterval(temporizadorReloj);
  boton.disabled = false;

  for (const casilla of casillas) {
    casilla.classList.remove("bug");
    casilla.textContent = "";
  }

  mensaje.textContent = `Fin del juego, ${nombreJugador()}. Has cazado ${puntos} bugs.`;
}

// 10. Eventos
boton.addEventListener("click", empezar);

// Mientras escribe el nombre, se saluda al jugador
inputNombre.addEventListener("input", () => {
  mensaje.textContent = `Hola, ${nombreJugador()}. Pulsa Empezar cuando quieras.`;
});

// BONUS: la tecla secreta "n" activa y desactiva el modo oscuro
document.addEventListener("keydown", (evento) => {
  if (evento.key === "n" && evento.target !== inputNombre) {
    document.body.classList.toggle("oscuro");
  }
});

// 11. Al cargar la página, se crea el tablero
crearTablero();
