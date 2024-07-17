const botonName      = document.getElementById('name'     );
const botonDetalle   = document.getElementById('detalle'  );
const botonIngreso   = document.getElementById('ingreso'  );
const botonBorrar    = document.getElementById('borrar'   );
const botonSalir     = document.getElementById('salir'    );
const botonConfirmar = document.getElementById('confirmar');

const tableBody   = document.getElementById('myTable'     );
const miSelect    = document.getElementById('clientList'  );
const titulo      = document.getElementById('titulo'      );
const adeudado    = document.getElementById('adeudado'    );
const texarea     = document.getElementById('texarea'     );
const formIngreso = document.getElementById('form1'       );
const tablaTot    = document.getElementById('tablaTotales');
const form1       = document.getElementById('form1');


// Deshabilitar el botón inicialmente
botonDetalle.disabled   = true;
botonIngreso.disabled   = true;
botonBorrar.disabled    = true;
botonConfirmar.disabled = true;

formIngreso.style.display = 'none';
tablaTot.style.display    = 'none';


window.onload=function(){
  //texarea.style.display   = 'none';
  //tableBody.style.display = 'none'
}


// Declara una variable global
let valorNumericoGlobal = 0;



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



function formatearFecha(fechaString,diaBolean) {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'];
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
  const mesAnio = meses[hoy.getMonth()];
  if(diaBolean==1){return `${diaSemana}`};
  if(diaBolean==2){return `${dia}-${mes}-${anio}`};
  return `${diaSemana} ${dia}-${mesAnio}`;// Formatear la fecha en yyyy-mm-dd
}


const fechaFormateada = formatearFecha(NaN);

const inputFecha  = document.getElementById('inputDate' );
const inputID     = document.getElementById('idCliente' ); 
const parrafo2    = document.getElementById('diaHoy'    );

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired!');
  // Your code here
  parrafo2.textContent  = formatearFecha(NaN,1);
  inputFecha.value      = formatearFecha(NaN,2);
  //inputFecha.disabled = true;
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
  botonConfirmar.disabled = true;
  botonBorrar.disabled    = false;
  botonIngreso.disabled   = false;

  titulo.innerText    = listaClientes[valorSeleccionado-2].Cliente;
  adeudado.innerText  = sumaTexto(listaClientes[valorSeleccionado-2].Producto);

  inputID.value = listaClientes[valorSeleccionado-2].Id;

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


//console.log('listaClientes',listaClientes);

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



botonIngreso.addEventListener('click', (e) => {
  e.preventDefault();
  form1.style.display='block';
  tablaTot.style.display='none';
  botonBorrar.disabled    = false;

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

});



botonDetalle.addEventListener('click', (e) => {
  e.preventDefault();
  form1.style.display='none';
  tablaTot.style.display='block';
  botonConfirmar.disabled = true;
  botonIngreso.disabled   = false;
  botonBorrar.disabled    = true;
  agregarDatosTextArea();

});

botonBorrar.addEventListener('click', (e) => {
  e.preventDefault();
  texarea.value='';
  botonConfirmar.disabled = true;
  botonIngreso.disabled   = false;
  tablaTot.style.display = 'none';

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

});


// funcion sin argumentos que devuelve el detalle en ele textArea 
function agregarDatosTextArea() {
  // Generar 50 filas de datos de ejemplo
  const arrayDatos = fechaProductoPrecio(listaClientes[valorSeleccionado-2].Fecha,listaClientes[valorSeleccionado-2].Producto);
  //console.log(listaClientes);
  fechaProductoPrecio(listaClientes[valorSeleccionado-2].Fecha,listaClientes[valorSeleccionado-2].Producto);
  /*let textoTextArea = "";
  for (const dato of arrayDatos) {
    textoTextArea += formatearFecha(dato.fecha) +"\t".repeat(3) + dato.producto +" ".repeat(8-dato.precio.toString().length) + dato.precio+ "\n";
  }
  texarea.value = textoTextArea;*/
  // Add rows to the table
  for (const dato of arrayDatos) {
    tableBody.appendChild(createTableRow([formatearFecha(dato.fecha),dato.producto,dato.precio]));
  }

};



botonConfirmar.addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el botón envíe un formulario y recargue la página
  
  console.log("Hola POST");

  const data = {
  Id: 8,
  Fecha: "2024-07-30",
  Producto: "pan 2000, aceite 1600, kiko 250ml 980,pan 750"
  };

  console.log();
  
  const url = 'https://script.google.com/macros/s/AKfycbwmlQscuxe7GM3tRKLkOkK-soKVjJugOXrBzk4oy66F0McAz7UsXwv8MMbM4RPlNIu0/exec?action=doPost'; // Reemplaza esto con la URL real de tu endpoint de Google Apps Script

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data)
  })

  .then(response => response.text())
  .then(result => {
    console.log('Éxito:', result);
  })

  .catch(error => {
    console.error('Error:', error);
  });

});




const form1SubmitButton = document.querySelector("#form1 button[type='submit']");
form1SubmitButton.addEventListener("click", handleSubmitForm1);


function handleSubmitForm1(e) {

  e.preventDefault();
  console.log('dentro del submit');

  const formEle = document.querySelector("form");
  const formDatab = new FormData(formEle);

  fetch(
    //"https://script.google.com/macros/s/AKfycbwJCA0KZPHtTZONu7MUonjv2csv-CaY_Dvm1CUqHDSJoWcNJh4ndn0mYPHm7RbczoYdtw/exec",
    "https://script.google.com/macros/s/AKfycbyXrFguwfKLyD138I9PdhebbOrUH0U4weOjY7lqihimUAv5LOCUWqz1IcGHLeYlo0z2/exec",
    {
      method: "POST",
      body: formDatab
    }
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

};


