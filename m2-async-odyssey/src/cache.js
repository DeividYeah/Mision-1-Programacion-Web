/*
 * BONUS: caché en localStorage para no repetir peticiones ya hechas.
 * Todo va envuelto en try/catch: el modo incógnito o una cuota llena
 * no deben romper la aplicación, solo desactivar la caché.
 */

const PREFIJO = "odyssey:";
const VIDA_MS = 1000 * 60 * 60; // 1 hora

export function leerCache(clave) {
  try {
    const crudo = localStorage.getItem(PREFIJO + clave);
    if (!crudo) {
      return null;
    }

    const { guardadoEn, datos } = JSON.parse(crudo);
    const caducado = Date.now() - guardadoEn > VIDA_MS;

    if (caducado || !Array.isArray(datos)) {
      localStorage.removeItem(PREFIJO + clave);
      return null;
    }

    return datos;
  } catch (error) {
    console.warn("Caché ilegible, se pedirá a la API:", error.message);
    return null;
  }
}

export function guardarCache(clave, datos) {
  try {
    const paquete = { guardadoEn: Date.now(), datos };
    localStorage.setItem(PREFIJO + clave, JSON.stringify(paquete));
  } catch (error) {
    console.warn("No se pudo guardar en caché:", error.message);
  }
}

export function limpiarCache() {
  try {
    Object.keys(localStorage)
      .filter((clave) => clave.startsWith(PREFIJO))
      .forEach((clave) => localStorage.removeItem(clave));
  } catch (error) {
    console.warn("No se pudo limpiar la caché:", error.message);
  }
}
