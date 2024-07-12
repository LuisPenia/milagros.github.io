const botonDetalle = document.getElementById('detalle');
const botonIngreso = document.getElementById('ingreso');

// Deshabilitar el botón inicialmente
botonDetalle.disabled = true;
botonIngreso.disabled = true;

// Habilitar el botón después de un evento (por ejemplo, clic en otro botón)
/*const otroBoton = document.getElementById('otroBoton');
otroBoton.addEventListener('click', () => {
  miBoton.disabled = false;
});*/




// Declara una variable global
let valorNumericoGlobal = 0;



// Obtener la fecha de hoy
const hoy = new Date();
// Obtener el año, mes y día
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
const dia = String(hoy.getDate()).padStart(2, '0'); // Obtener el día
// Formatear la fecha en yyyy-mm-dd
const fechaFormateada = `${anio}-${mes}-${dia}`;




document.getElementById('confirmar').addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el botón envíe un formulario y recargue la página

  // Captura el texto del textarea
  var textarea = document.querySelector('textarea');
  var texto = textarea.value;

  // Reemplaza los saltos de línea con "||"
  var textoFormateado = '||' + texto.replace(/\n/g, '||');

  // Guarda el texto formateado en una variable
  var textoFinal = textoFormateado;

  // Puedes hacer algo con la variable textoFinal aquí
  console.log(textoFinal); // Muestra el texto formateado en la consola para verificación
  // Muestra la fecha en formato yyyy-mm-dd
  console.log(fechaFormateada);




  // Separar el texto por "||"
  let elementos = textoFinal.split("||");

  // Remover posibles elementos vacíos generados por la separación
  elementos = elementos.filter(elemento => elemento);

  let valorNumerico = 0;
  // Recorrer el array y mostrar cada elemento
  elementos.forEach(elemento => {
    // Separar por espacio y tomar el último elemento (el valor numérico)
    let partes = elemento.split(" ");
    valorNumerico = valorNumerico + parseInt(partes[partes.length - 1], 10);
    //console.log(valorNumerico);
  });

  // Asigna el valor a la variable global
  valorNumericoGlobal = valorNumerico;



});


document.addEventListener('DOMContentLoaded', (e) => {
  // Obtener el botón y el párrafo por su ID
  const botonConfirmar = document.getElementById('confirmar');
  const parrafo = document.getElementById('parrafo-a-modificar');
  
  // Añadir un listener al botón para el evento de clic
  botonConfirmar.addEventListener('click', function() {
      // Cambiar el contenido del párrafo
      parrafo.textContent ='Hoy:'+ fechaFormateada + ' Total: $' + valorNumericoGlobal;
  });
});