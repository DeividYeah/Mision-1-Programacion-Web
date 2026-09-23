/*
 * Caza-Bugs — Misión 1: El despertar del DOM
 * JavaScript puro: sin frameworks, sin librerías, sin handlers inline.
 */

// --- Constantes de configuración ---------------------------------------
const CASILLAS = 16;              // tablero 4x4
const DURACION = 30;              // segundos por partida
const CLAVE_RECORD = "cazaBugsRecord";

const NIVELES = {
  1: { nombre: "Tranquilo", intervalo: 900, escudos: 0 },
  2: { nombre: "Normal", intervalo: 650, escudos: 1 },
  3: { nombre: "Caótico", intervalo: 400, escudos: 3 }
};

// --- Referencias al DOM -------------------------------------------------
const tablero = document.querySelector("#tablero");
const inputNombre = document.querySelector("#nombre");
const inputDificultad = document.querySelector("#dificultad");
const etiquetaDificultad = document.querySelector("#etiqueta-dificultad");
const botonJugar = document.querySelector("#jugar");
const marcadorPuntos = document.querySelector("#puntos");
const marcadorTiempo = document.querySelector("#tiempo");
const marcadorRecord = document.querySelector("#record");
const mensaje = document.querySelector("#mensaje");

// --- Estado de la partida ----------------------------------------------
let puntos = 0;
let tiempo = DURACION;
let enJuego = false;
let idRonda = null;
let idReloj = null;

// --- Construcción del tablero -------------------------------------------
function crearTablero() {
  for (let i = 0; i < CASILLAS; i++) {
    const casilla = document.createElement("div");
    casilla.className = "casilla";
    casilla.dataset.indice = i;
    tablero.appendChild(casilla);
  }
}

function limpiarTablero() {
  const casillas = document.querySelectorAll(".casilla");
  casillas.forEach((casilla) => {
    casilla.classList.remove("bug", "escudo", "acertada");
    casilla.textContent = "";
  });
}

// Devuelve `cantidad` índices distintos entre 0 y CASILLAS - 1
function indicesAlAzar(cantidad) {
  const elegidos = [];
  while (elegidos.length < cantidad) {
    const indice = Math.floor(Math.random() * CASILLAS);
    if (!elegidos.includes(indice)) {
      elegidos.push(indice);
    }
  }
  return elegidos;
}

function repartirRonda() {
  limpiarTablero();

  const nivel = NIVELES[inputDificultad.value];
  const casillas = document.querySelectorAll(".casilla");
  const posiciones = indicesAlAzar(1 + nivel.escudos);

  posiciones.forEach((posicion, orden) => {
    const casilla = casillas[posicion];
    if (orden === 0) {
      casilla.classList.add("bug");
      casilla.textContent = "🐛";
    } else {
      casilla.classList.add("escudo");
      casilla.textContent = "🛡️";
    }
  });
}

// --- Marcador -----------------------------------------------------------
function leerRecord() {
  return Number(localStorage.getItem(CLAVE_RECORD)) || 0;
}

function pintarMarcador() {
  marcadorPuntos.textContent = puntos;
  marcadorTiempo.textContent = tiempo;
  marcadorRecord.textContent = leerRecord();
}

function nombreJugador() {
  const escrito = inputNombre.value.trim();
  return escrito === "" ? "Anónimo" : escrito;
}

// --- Ciclo de juego -----------------------------------------------------
function empezarPartida() {
  if (enJuego) {
    terminarPartida(true);
  }

  puntos = 0;
  tiempo = DURACION;
  enJuego = true;
  botonJugar.disabled = true;
  pintarMarcador();

  const nivel = NIVELES[inputDificultad.value];
  mensaje.textContent = `¡Suerte, ${nombreJugador()}! Nivel ${nivel.nombre}.`;

  repartirRonda();
  idRonda = setInterval(repartirRonda, nivel.intervalo);
  idReloj = setInterval(descontarSegundo, 1000);
}

function descontarSegundo() {
  tiempo--;
  marcadorTiempo.textContent = tiempo;

  if (tiempo <= 0) {
    terminarPartida(false);
  }
}

function terminarPartida(silencioso) {
  clearInterval(idRonda);
  clearInterval(idReloj);
  enJuego = false;
  botonJugar.disabled = false;
  limpiarTablero();

  if (silencioso) {
    return;
  }

  const record = leerRecord();
  if (puntos > record) {
    localStorage.setItem(CLAVE_RECORD, puntos);
    mensaje.textContent = `¡Nuevo récord, ${nombreJugador()}: ${puntos} bugs!`;
  } else {
    mensaje.textContent = `Fin de la partida. ${nombreJugador()} cazó ${puntos} bugs.`;
  }

  pintarMarcador();
}

// --- Eventos ------------------------------------------------------------
// Un solo listener en el tablero (delegación) en lugar de 16 listeners.
tablero.addEventListener("click", (evento) => {
  const casilla = evento.target.closest(".casilla");

  if (!casilla || !enJuego) {
    return;
  }

  if (casilla.classList.contains("bug")) {
    puntos++;
    casilla.classList.add("acertada");
    mensaje.textContent = "¡Bug aplastado!";
  } else if (casilla.classList.contains("escudo")) {
    puntos = Math.max(0, puntos - 2);
    mensaje.textContent = "Eso era código bueno... -2 puntos.";
  } else {
    puntos = Math.max(0, puntos - 1);
    mensaje.textContent = "Fallaste. -1 punto.";
  }

  casilla.classList.remove("bug", "escudo");
  casilla.textContent = "";
  marcadorPuntos.textContent = puntos;
});

inputDificultad.addEventListener("input", () => {
  etiquetaDificultad.textContent = NIVELES[inputDificultad.value].nombre;
});

inputNombre.addEventListener("input", () => {
  if (!enJuego) {
    mensaje.textContent = `Listo cuando quieras, ${nombreJugador()}.`;
  }
});

botonJugar.addEventListener("click", empezarPartida);

document.addEventListener("keydown", (evento) => {
  const escribiendo = evento.target.tagName === "INPUT";

  if (evento.code === "Space" && !escribiendo) {
    evento.preventDefault();
    empezarPartida();
  }

  // BONUS: tecla secreta para el modo oscuro.
  if (evento.key.toLowerCase() === "n" && !escribiendo) {
    document.body.classList.toggle("oscuro");
  }
});

// --- Arranque -----------------------------------------------------------
crearTablero();
pintarMarcador();
etiquetaDificultad.textContent = NIVELES[inputDificultad.value].nombre;
