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
  var textoFormateado = '¦¦' + texto.replace(/\n/g, '¦¦');

  // Guarda el texto formateado en una variable
  var textoFinal = textoFormateado;

  // Puedes hacer algo con la variable textoFinal aquí
  console.log(textoFinal); // Muestra el texto formateado en la consola para verificación
  // Muestra la fecha en formato yyyy-mm-dd
  console.log(fechaFormateada);




  // Separar el texto por "||"
  let elementos = textoFinal.split("¦¦");

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
  const parrafo2 = document.getElementById('diaHoy');
  
  // Añadir un listener al botón para el evento de clic
  botonConfirmar.addEventListener('click', function() {
      // Cambiar el contenido del párrafo
      parrafo.textContent   = ' Total: $' + valorNumericoGlobal;
      parrafo2.textContent  = 'Hoy:'      + fechaFormateada;
  });
});



function extractNumber(str) { //valores numéricos considerando el signo al final de un string y pasarlo a entero
  const match = str.match(/-?\d+$/);
  //    -?    permite un signo negativo opcional
  //    \d+   busca uno o más dígitos
  //    $     asegura que los dígitos estén al final del string
  return match ? parseInt(match[0]) : null;
}

function formatCurrency(number) {  //transformar un valor entero a cifra de valor monetario
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number); // ejemplo 116200 a $116.200
}

let sumaTexto = function (textoPrecios){      // ejemplo: ¦¦leche 1000¦¦pan 400¦aceite 1600¦kiko 250ml 750¦pan 250¦¦gusta 500
  let valorEntero=0;
  textoPrecios.split("¦¦").forEach(parte => { // ejemplo: ['', 'leche 1000', 'pan 400¦aceite 1600¦kiko 250ml 750¦pan 250', 'gusta 500']
    parte.split("¦").forEach(elemento=>{      // ejemplo: ['pan 400','aceite 1600','kiko 250ml 750','pan 250']
      if(extractNumber(elemento)!=null){
        valorEntero+=extractNumber(elemento);
      };
    });
  });
  return formatCurrency(valorEntero);
}



let listaClientes = [];
const botonSalir  = document.getElementById('salir'     );
const botonName   = document.getElementById('name'      );
const miSelect    = document.getElementById('clientList');
const titulo      = document.getElementById('titulo'    );
const adeudado    = document.getElementById('adeudado'    );

miSelect.style.display  ='none'; // El select al inicio oculto



botonName.addEventListener('click', () => {
  botonName.style.display = 'none';
  miSelect.style.display = 'block';
  //titulo.innerText = "Este es el nuevo texto";
});

botonSalir.addEventListener('click', () => {
  botonName.style.display = 'block';
  miSelect.style.display = 'none';
});



// al seleccionar el Select
miSelect.addEventListener('change', function() {
 
  const valorSeleccionado = this.value;
  console.log(`Valor seleccionado: ${valorSeleccionado}`);
  console.log(listaClientes[valorSeleccionado-2]);
  console.log(listaClientes[valorSeleccionado-2].Producto);
  console.log(sumaTexto(listaClientes[valorSeleccionado-2].Producto));

  titulo.innerText    = listaClientes[valorSeleccionado-2].Cliente;
  adeudado.innerText  = sumaTexto(listaClientes[valorSeleccionado-2].Producto);

});



botonName.addEventListener('click', function(event) {
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
     // Aquí puedes ver el array de objetos en la consola
      listaClientes=data;
      console.log(listaClientes); 
      // Aquí puedes trabajar con los datos
      data.forEach(cliente => {

        console.log(cliente.Cliente)
        // Crear un elemento option para cada cliente
        const option = document.createElement('option');
        option.value = cliente.Id; // Asignar el ID como valor de la opción
        option.textContent = cliente.Cliente; // Asignar el nombre del cliente como texto de la opción
      
        // Agregar la opción al elemento select
        miSelect.appendChild(option);
        
      });
  })
  .catch(error => {
      console.error('Hubo un problema con la solicitud Fetch:', error);
  });

});



