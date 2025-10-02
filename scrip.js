alert("Bienvendida bonita")
/* script.js
   Aquí pones la lógica de interacción:
   - Carga diferida de imágenes (lazy load)
   - Lightbox para ampliar fotos
   - Mostrar/ocultar carta completa
   - Reproductor de YouTube opcional
   - Contador de días juntos (configurable)
*/

/* --------------------------
   1) CONFIGURACIONES IMPORTANTES
   --------------------------
   - START_DATE: fecha en la que "empezaron" (formato YYYY-MM-DD).
     Ejemplo: si cumplen 4 meses hoy, y llevan 4 meses a partir del 2025-05-29,
     pon "2025-05-29". Cambia según tu fecha real.
   - YOUTUBE_URL: si prefieres usar YouTube en lugar de un mp3 local, pega
     aquí el enlace. Si no usas YouTube, deja cadena vacía "".
*/
const START_DATE = "2025-05-29"; // <-- Cambia esto por la fecha de inicio real
const YOUTUBE_URL = ""; // <-- Pega aquí el link de YouTube si lo vas a usar

/* --------------------------
   2) Contador de días juntos
   -------------------------- */
function actualizarContador() {
  const start = new Date(START_DATE + "T00:00:00");
  const hoy = new Date();
  // Calcular diferencia en días
  const diffMs = hoy - start;
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diasSpan = document.getElementById("diasJuntos");
  if (!isNaN(dias)) diasSpan.textContent = dias;
  else diasSpan.textContent = "--";
}
actualizarContador();

/* --------------------------
   3) Mostrar / ocultar carta completa
   -------------------------- */
document.getElementById("toggleCarta").addEventListener("click", () => {
  const carta = document.getElementById("cartaCompleta");
  carta.classList.toggle("oculto");
});

/* --------------------------
   4) Lazy-load de imágenes y Lightbox
   -------------------------- */
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const cerrarLightbox = document.getElementById("cerrarLightbox");

// Cargar las imágenes desde data-src (cuando la página se carga)
galleryItems.forEach(img => {
  const src = img.getAttribute("data-src");
  if (src) img.src = src;
  // click -> abrir lightbox
  img.addEventListener("click", () => {
    lightboxImg.src = src;
    lightbox.classList.remove("oculto");
  });
});

cerrarLightbox.addEventListener("click", () => {
  lightbox.classList.add("oculto");
  lightboxImg.src = "";
});

// cerrar lightbox con clic fuera de la imagen
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("oculto");
    lightboxImg.src = "";
  }
});

/* --------------------------
   5) Reproductor de YouTube opcional
   --------------------------
   Si quieres usar YouTube en vez de un mp3 local:
   - Pega la URL de YouTube en la variable YOUTUBE_URL arriba.
   - En index.html comenta el elemento <audio> y descomenta el iframe.
   El script colocará el embed con autoplay desactivado (evita autoplay forzado).
*/
if (YOUTUBE_URL) {
  // Extraer ID del video de la URL
  const ytMatch = YOUTUBE_URL.match(/(?:v=|\/embed\/|\.be\/)([A-Za-z0-9_\-]+)/);
  const ytId = ytMatch ? ytMatch[1] : null;
  if (ytId) {
    const iframe = document.getElementById("ytIframe");
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${ytId}?rel=0`;
    }
  } else {
    console.warn("YouTube URL no válida. Revisa YOUTUBE_URL en script.js");
  }
}

/* --------------------------
   6) Sugerencias de personalización rápida (no hace falta tocar lógica):
   - Para cambiar la canción a un mp3 local: coloca archivo en audio/tu.mp3 y
     actualiza src en index.html <audio>.
   - Para agregar más fotos: añade más <img class="gallery-item" data-src="images/nombre.jpg" /> en index.html.
   - Para cambiar el texto del mensaje: edita el <section id="mensaje"> en index.html.
   -------------------------- */
