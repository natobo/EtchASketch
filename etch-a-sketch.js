// Seleccionar los elementos de la pagina - canvas, boton sacudir
const canvas = document.querySelector(`#etch-a-sketch`);
const contexto = canvas.getContext(`2d`);
const botonSacudir = document.querySelector(`.sacudir`);
const MOVE_AMOUNT = 10;
// Configurar el canvas para dibujar
contexto.lineJoin = `round`;
contexto.lineCap = `round`;
contexto.lineWidth = 10;

// forma de conseguir variables de un objeto de forma rapida
// se llama destructuring en español "desestructurar"
let tmpColores = 0;
contexto.strokeStyle = `hsl(${tmpColores}, 100%, 50%)`;
const { width, height } = canvas;
// Punto inicial aleatorio
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
contexto.beginPath();
contexto.moveTo(x, y);
contexto.lineTo(x, y);
contexto.stroke();

// Escribir una funcion dibujar
// Parametro destructurado, obtiene del objeto el atributo y le asigna el valor a la mia
function draw({ key }) {
  // incrementa el tmpColores
  tmpColores += 1;
  contexto.strokeStyle = `hsl(${tmpColores}, 100%, 50%)`;
  console.log(key);
  // le dice al contexto que se va iniciar una linea
  contexto.beginPath();
  contexto.moveTo(x, y);
  // Mover los valores x y y dependiendo que hizo el usuario
  switch (key) {
    case `ArrowUp`:
      y -= MOVE_AMOUNT;
      break;
    case `ArrowDown`:
      y += MOVE_AMOUNT;
      break;
    case `ArrowRight`:
      x += MOVE_AMOUNT;
      break;
    case `ArrowLeft`:
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }

  contexto.lineTo(x, y);
  contexto.stroke();
}

// Escribir un manejador para las flechas
function manejarLlave(evento) {
  if (evento.key.includes(`Arrow`)) {
    evento.preventDefault();
    draw({ key: evento.key });
  }
}

// crear / reiniciar
function limpiarCanvas() {
  canvas.classList.add(`shake`);
  contexto.clearRect(0, 0, width, height);
  canvas.addEventListener(
    `animationend`,
    function() {
      canvas.classList.remove(`shake`);
    },
    { once: true }
  );
  contexto.beginPath();
  contexto.moveTo(x, y);
  contexto.lineTo(x, y);
  contexto.stroke();
}

// escuchar teclas flechas
// anadido al window porque es para el sitio completo
window.addEventListener(`keydown`, manejarLlave);
botonSacudir.addEventListener(`click`, limpiarCanvas);
