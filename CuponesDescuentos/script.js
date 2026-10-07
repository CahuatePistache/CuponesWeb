// Catálogo de cupones. Las imágenes están en la misma carpeta que index.html
// Dibujos de respaldo (se muestran si la foto en línea no carga)
function dibujo(fondo, formas) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="${fondo}"/>${formas}</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const dibujos = {
  // Escudo estilo héroe con estrella
  avengers: dibujo("#1b2a49", `<circle cx="300" cy="200" r="150" fill="#c1121f"/><circle cx="300" cy="200" r="110" fill="#f1f1f1"/><circle cx="300" cy="200" r="70" fill="#c1121f"/><circle cx="300" cy="200" r="38" fill="#1d4e9e"/><polygon points="300,170 309,193 334,193 314,208 322,232 300,218 278,232 286,208 266,193 291,193" fill="#fff"/>`),
  // Corazón rosa con corona
  barbie: dibujo("#ff8fc7", `<path d="M300 330 C140 220 170 100 255 120 C285 128 300 150 300 150 C300 150 315 128 345 120 C430 100 460 220 300 330Z" fill="#e5469b" stroke="#fff" stroke-width="10"/><polygon points="240,95 255,50 285,80 300,40 315,80 345,50 360,95" fill="#ffd23f"/>`),
  // Bola disco con destellos
  antro: dibujo("#2b0a4a", `<line x1="300" y1="0" x2="300" y2="90" stroke="#ccc" stroke-width="4"/><circle cx="300" cy="200" r="110" fill="#bfc7d5"/><path d="M190 200H410M205 150H395M205 250H395M300 90V310M245 100V300M355 100V300" stroke="#6b7488" stroke-width="4" fill="none"/><polygon points="120,90 130,115 155,125 130,135 120,160 110,135 85,125 110,115" fill="#ffd23f"/><polygon points="480,250 488,270 508,278 488,286 480,306 472,286 452,278 472,270" fill="#ff5ca8"/>`),
  // Piedras de spa apiladas y hoja
  spa: dibujo("#bfe6df", `<ellipse cx="300" cy="320" rx="130" ry="35" fill="#5b6770"/><ellipse cx="300" cy="260" rx="95" ry="28" fill="#7d8a93"/><ellipse cx="300" cy="210" rx="62" ry="22" fill="#9aa7b0"/><path d="M420 300 C420 220 480 190 520 180 C520 240 480 290 420 300Z" fill="#2a9d8f"/><path d="M80 300 C80 230 130 200 170 190 C170 250 130 290 80 300Z" fill="#3cb9a8"/>`),
  // Mancuerna
  gym: dibujo("#264653", `<rect x="200" y="185" width="200" height="30" rx="8" fill="#cfd8dc"/><rect x="150" y="130" width="40" height="140" rx="10" fill="#e76f51"/><rect x="110" y="155" width="30" height="90" rx="8" fill="#e76f51"/><rect x="410" y="130" width="40" height="140" rx="10" fill="#e76f51"/><rect x="460" y="155" width="30" height="90" rx="8" fill="#e76f51"/>`),
  // Plato con huevo y hot cakes
  brunch: dibujo("#f6d9b0", `<circle cx="300" cy="200" r="150" fill="#fff"/><circle cx="300" cy="200" r="118" fill="#f4ece1"/><ellipse cx="300" cy="215" rx="85" ry="26" fill="#d98e4a"/><ellipse cx="300" cy="195" rx="85" ry="26" fill="#e8a65f"/><ellipse cx="300" cy="175" rx="85" ry="26" fill="#f2b872"/><rect x="270" y="150" width="60" height="22" rx="4" fill="#ffe27a"/><circle cx="300" cy="148" r="9" fill="#ff9f1c"/>`)
};

const cupones = {
  ninoMenor: {
    titulo: "Boleto para ver Avengers",
    lugar: "Cine",
    descripcion: "Un boleto gratis para ver Avengers.",
    imagen: "niño17.jpg",
    respaldo: dibujos.avengers
  },
  ninaMenor: {
    titulo: "Boleto para ver Barbie",
    lugar: "Cine",
    descripcion: "Un boleto gratis para ver Barbie.",
    imagen: "niña17.jpg",
    respaldo: dibujos.barbie
  },
  ninoJoven: {
    titulo: "Entrada gratis al antro",
    lugar: "Antro",
    descripcion: "Entrada sin costo para esta noche.",
    imagen: "antro29.jpg",
    respaldo: dibujos.antro
  },
  ninaJoven: {
    titulo: "Día de relajación en el spa",
    lugar: "Spa",
    descripcion: "Un masaje relajante de cortesía.",
    imagen: "spa29.jpg",
    respaldo: dibujos.spa
  },
  ninoAdulto: {
    titulo: "Pase de una semana al gym",
    lugar: "Gym",
    descripcion: "Siete días de acceso libre.",
    imagen: "gym31.jpg",
    respaldo: dibujos.gym
  },
  ninaAdulto: {
    titulo: "Brunch para dos personas",
    lugar: "Brunch",
    descripcion: "Un brunch gratis para ti y tu acompañante.",
    imagen: "crunch31.jpg",
    respaldo: dibujos.brunch
  }
};

function elegirCupon(edad, sexo) {
  const esNino = sexo === "nino";
  if (edad < 18) return esNino ? cupones.ninoMenor : cupones.ninaMenor;
  if (edad <= 30) return esNino ? cupones.ninoJoven : cupones.ninaJoven;
  return esNino ? cupones.ninoAdulto : cupones.ninaAdulto;
}

function mostrarCupon(nombre, cupon) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  const caja = document.createElement("div");
  caja.className = "cupon";

  // Imagen de la carpeta, con dibujo de respaldo si no se encuentra
  const img = document.createElement("img");
  img.src = cupon.imagen;
  img.alt = cupon.titulo;
  img.onerror = () => {
    img.onerror = null;
    img.src = cupon.respaldo;
  };

  const info = document.createElement("div");
  info.className = "cupon-info";
  info.innerHTML = `
    <h2>${cupon.titulo}</h2>
    <p>¡Felicidades, <strong></strong>!</p>
    <p>${cupon.descripcion}</p>
    <button type="button" class="reclamar">Reclamar cupón</button>
  `;
  // textContent evita inyectar HTML con el nombre
  info.querySelector("strong").textContent = nombre;

  caja.append(img, info);
  resultado.append(caja);
  resultado.hidden = false;
}

document.getElementById("formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);
  const sexoInput = document.querySelector('input[name="sexo"]:checked');
  const error = document.getElementById("error");

  if (!nombre || isNaN(edad) || edad < 1 || edad > 120 || !sexoInput) {
    error.textContent = "Escribe tu nombre, una edad válida y elige una opción.";
    document.getElementById("resultado").hidden = true;
    return;
  }
  error.textContent = "";
  mostrarCupon(nombre, elegirCupon(edad, sexoInput.value));
});