const secreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

const input = document.querySelector("#numero");
const boton = document.querySelector("#boton");
const mensaje = document.querySelector("#mensaje");
const marcador = document.querySelector("#intentos");

boton.addEventListener("click", () => {
  const valor = input.value;
  const numero = Number(valor);

  // Vacío o fuera de rango: aviso sin gastar intento
  if (valor === "" || numero < 1 || numero > 100) {
    mensaje.textContent = "Escribe un número entre 1 y 100.";
    return;
  }

  intentos++;
  marcador.textContent = `Intentos: ${intentos}`;

  if (numero === secreto) {
    mensaje.textContent = `¡Correcto! Era el ${secreto}. Lo has adivinado en ${intentos} intentos.`;
    boton.disabled = true;
  } else if (numero < secreto) {
    mensaje.textContent = `El número secreto es mayor que ${numero}.`;
  } else {
    mensaje.textContent = `El número secreto es menor que ${numero}.`;
  }
});
