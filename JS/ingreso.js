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




let listaClientes = [];
const botonSalir  = document.getElementById('salir');
const botonName   = document.getElementById('name');
const desplegable = document.getElementById('clientList');


botonName.addEventListener('click', () => {
  botonName.style.display = 'none';
  desplegable.style.display = 'block';
});

botonSalir.addEventListener('click', () => {
  botonName.style.display = 'block';
  desplegable.style.display = 'none';
});


desplegable.style.display = 'none';


document.getElementById('name').addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el botón envíe un formulario y recargue la página

  console.log("Hola EndPoint");

  fetch('https://script.google.com/macros/s/AKfycbwmlQscuxe7GM3tRKLkOkK-soKVjJugOXrBzk4oy66F0McAz7UsXwv8MMbM4RPlNIu0/exec?action=getUsers')
  .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      console.log(data); // Aquí puedes ver el array de objetos en la consola
      
      // Aquí puedes trabajar con los datos
      const select = document.getElementById('clientList');
      data.forEach(cliente => {

        console.log(cliente.Cliente)

        
        // Crear un elemento option para cada cliente
        const option = document.createElement('option');
        option.value = cliente.Id; // Asignar el ID como valor de la opción
        option.textContent = cliente.Cliente; // Asignar el nombre del cliente como texto de la opción
      
        // Agregar la opción al elemento select
        select.appendChild(option);
      });











  })
  .catch(error => {
      console.error('Hubo un problema con la solicitud Fetch:', error);
  });

});

