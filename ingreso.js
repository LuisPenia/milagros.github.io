const botonName      = document.getElementById('name'     );
const botonDetalle   = document.getElementById('detalle'  );
const botonIngreso   = document.getElementById('ingreso'  );
const botonBorrar    = document.getElementById('borrar'   );
const botonSalir     = document.getElementById('salir'    );
const botonConfirmar = document.getElementById('confirmar');

// Deshabilitar el botón inicialmente
botonDetalle.disabled   = true;
botonIngreso.disabled   = true;
botonBorrar.disabled    = true;
botonConfirmar.disabled = true;


// Declara una variable global
let valorNumericoGlobal = 0;





function formatearFecha(fechaString) {
  const dias = ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'];
  var hoy;
  if(fechaString){
    hoy = new Date(fechaString);// Obtener la fecha de hoy
  }else{
    hoy = new Date();// Obtener la fecha de hoy
  };
  const anio = hoy.getFullYear();// Obtener el año, mes y día
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  const dia = String(hoy.getDate()).padStart(2, '0'); // Obtener el día
  const diaSemana = dias[hoy.getDay()];
  return `${diaSemana} ${dia}-${mes}-${anio}`;// Formatear la fecha en yyyy-mm-dd
}


const fechaFormateada = formatearFecha(NaN);

const parrafo2 = document.getElementById('diaHoy');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired!');
  // Your code here
  parrafo2.textContent  = fechaFormateada;

});









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
  //const botonConfirmar = document.getElementById('confirmar');
  const parrafo = document.getElementById('parrafo-a-modificar');

  
  // Añadir un listener al botón para el evento de clic
  botonConfirmar.addEventListener('click', function() {
      // Cambiar el contenido del párrafo
      parrafo.textContent   = ' Total: $' + valorNumericoGlobal;
      
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


const miSelect    = document.getElementById('clientList');
const titulo      = document.getElementById('titulo'    );
const adeudado    = document.getElementById('adeudado'  );
const texarea     = document.getElementById('texarea'   );

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









let arrayProdcutos = [];
let valorSeleccionado;
// al seleccionar el Select
miSelect.addEventListener('change', function() {
 
  valorSeleccionado = this.value;
  /*console.log(`Valor seleccionado: ${valorSeleccionado}`);
  console.log(listaClientes[valorSeleccionado-2]);
  console.log(listaClientes[valorSeleccionado-2].Producto);
  console.log(sumaTexto(listaClientes[valorSeleccionado-2].Producto));*/

  botonDetalle.disabled   = false;
  botonConfirmar.disabled = false;
  botonBorrar.disabled    = false;
  botonIngreso.disabled   = false;

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
      //console.log(listaClientes); 
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









// 
function fechaProductoPrecio(textoFechas,textoProductos){      // ejemplo: ¦¦leche 1000¦¦pan 400¦aceite 1600¦kiko 250ml 750¦pan 250¦¦gusta 500
  let textoFecha    =[];
  let textoProducto =[];
  let productoFinal =[];

  textoFecha = textoFechas.split("¦¦");
  textoProducto =  textoProductos.split("¦¦");

  for (let i = 0; i < textoProducto.length; i++) {
    if (textoProducto[i]!=''){
    productoFinal.push({fecha:textoFecha[i],producto:textoProducto[i]});
  }}

  textoFecha=[];

  productoFinal.forEach(elemento=>{      // ejemplo: ['pan 400','aceite 1600','kiko 250ml 750','pan 250']
    textoProducto =  elemento.producto.split("¦");
    textoProducto.forEach(e=>{
      textoFecha.push({
        fecha     : elemento.fecha,
        producto  : e.substr(0,e.length-extractNumber(e).toString().length),
        precio    : extractNumber(e)
      })
    })
  })

  console.log(textoFecha);
  

  return textoFecha

}







// funcion sin argumentos que devuelve el detalle en ele textArea 
function agregarDatosTextArea() {
  // Generar 50 filas de datos de ejemplo
  const arrayDatos = fechaProductoPrecio(listaClientes[valorSeleccionado-2].Fecha,listaClientes[valorSeleccionado-2].Producto);
  //console.log(listaClientes[valorSeleccionado-2]);
  fechaProductoPrecio(listaClientes[valorSeleccionado-2].Fecha,listaClientes[valorSeleccionado-2].Producto);
  let textoTextArea = "";
  for (const dato of arrayDatos) {
    textoTextArea += formatearFecha(dato.fecha) +"\t".repeat(3) + dato.producto +" ".repeat(8-dato.precio.toString().length) + dato.precio+ "\n";
  }
  texarea.value = textoTextArea;
};







botonDetalle.addEventListener('click', (e) => {
  e.preventDefault();
  botonConfirmar.disabled = true;
  botonIngreso.disabled   = true;
  agregarDatosTextArea();

});

botonBorrar.addEventListener('click', (e) => {
  e.preventDefault();
  texarea.value='';
  botonConfirmar.disabled = false;
  botonIngreso.disabled   = false;

});








const tableBody = document.getElementById('myTable');

// Function to create a table row
function createTableRow(data) {
  const row = document.createElement('tr');
  for (const value of data) {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  }
  return row;
}

// Sample data (replace with your actual data source)
const tableData = [];
for (let i = 0; i < 50; i++) {
  tableData.push([`Row ${i + 1} - Col 1`, `Row ${i + 1} - Col 2`, `Row ${i + 1} - Col 3`]);
}

// Add rows to the table
const rowsToShow = 5;
for (let i = 0; i < rowsToShow; i++) {
  tableBody.appendChild(createTableRow(tableData[i]));
}