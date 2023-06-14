const clientes = {};

const agregar = document.querySelector('#agregar');
const buscar = document.querySelector('#buscarClientes');
const botonBuscar = document.querySelector('#buscar');
const contenedor = document.querySelector('#contenedor');
const selectClientes = document.querySelector('#selectClientes');

// Agregar un cliente
function agregarCliente(event) {
  event.preventDefault();

  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const identificacion = document.querySelector('#identificacion').value;
  const telefono = document.querySelector('#telefono').value;
  const correo = document.querySelector('#correo').value;
  const fecha = document.querySelector('#fecha').value;
  const nacionalidad = document.querySelector('#nacionalidad').value;

  // Objeto del cliente
  const cliente = {
    identificacion,
    nombre,
    apellido,
    telefono,
    correo,
    fecha,
    nacionalidad
  };

  clientes[identificacion] = cliente;

  actualizarTablaClientes();
  agregar.reset();
}

// Función para buscar a los clientes
function buscarClientes(event) {
  event.preventDefault();

  const termino = buscar.value.trim();
  const terminoBusqueda = termino.toLowerCase();

  const resultados = Object.values(clientes).filter(cliente => {
    const nombre = cliente.nombre.toLowerCase();
    const apellido = cliente.apellido.toLowerCase();
    const identificacion = cliente.identificacion.toLowerCase();

    return nombre.includes(terminoBusqueda) || apellido.includes(terminoBusqueda) || identificacion.includes(terminoBusqueda);
  });

  contenedor.innerHTML = '';

  resultados.forEach(cliente => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.apellido}</td>
      <td>${cliente.identificacion}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.correo}</td>
      <td>${cliente.fecha}</td>
      <td>${cliente.nacionalidad}</td>
      <td>
        <button class="btn btn-danger btn-sm" id="eliminarCliente" onclick="eliminarCliente('${cliente.identificacion}')">Eliminar</button>
        <button class="btn btn-primary btn-sm" id="modificarCliente" onclick="modificarCliente('${cliente.identificacion}')">Modificar</button>
      </td>
    `;

    contenedor.appendChild(fila);
  });

  botonBuscar.reset();
};

agregar.addEventListener('submit', agregarCliente);
botonBuscar.addEventListener('submit', buscarClientes);

// Actualizar la tabla de clientes
function actualizarTablaClientes() {
  contenedor.innerHTML = '';

  Object.values(clientes).forEach(cliente => {
    let fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.apellido}</td>
      <td>${cliente.identificacion}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.correo}</td>
      <td>${cliente.fecha}</td>
      <td>${cliente.nacionalidad}</td>
      <td>
        <button class="btn btn-danger btn-sm" id="eliminarCliente" onclick="eliminarCliente('${cliente.identificacion}')">Eliminar</button>
        <button class="btn btn-primary btn-sm" id="modificarCliente" onclick="modificarCliente('${cliente.identificacion}')">Modificar</button>
      </td>
    `;

    let opcionCompra = document.createElement("option");
    opcionCompra.textContent = cliente.nombre;
    selectClientes.appendChild(opcionCompra);

    contenedor.appendChild(fila);
  });
};

// Funcion para modificar
function modificarCliente(identificacion) {
  const cliente = clientes[identificacion];

  if (cliente) {
    document.querySelector('#nombre').value = cliente.nombre;
    document.querySelector('#apellido').value = cliente.apellido;
    document.querySelector('#identificacion').value = cliente.identificacion;
    document.querySelector('#telefono').value = cliente.telefono;
    document.querySelector('#correo').value = cliente.correo;
    document.querySelector('#fecha').value = cliente.fecha;
    document.querySelector('#nacionalidad').value = cliente.nacionalidad;

    delete clientes[identificacion];

    actualizarTablaClientes();
  };
};

// Función para eliminar
function eliminarCliente(identificacion) {
  if (clientes[identificacion]) {
    delete clientes[identificacion];
    actualizarTablaClientes();
  };
};

actualizarTablaClientes();

// Gestión de rutas aéreas
const selectRutas = document.querySelector('#selectRutas');
let segundoContenedor = document.querySelector('#segundoContenedor');
let agregarRuta = document.querySelector('#agregarRuta');
let rutas = [];
let contadorID = 1;
let acumuladorPuntos = [];

// Agregar nueva ruta
function agregarRutas() {
  let nombreRuta = document.querySelector('#nombreRuta').value;
  let tiquete = document.querySelector('#tiquete').value;
  let origen = document.querySelector('#origen').value;
  let destino = document.querySelector('#destino').value;
  let puntos = Number(document.querySelector('#puntos').value);
  
  let nuevaRuta = {
    id: contadorID,
    nombreRuta: nombreRuta,
    tiquete: tiquete,
    origen: origen,
    destino: destino,
    puntos: puntos
  };

  rutas.push(nuevaRuta);
  acumuladorPuntos.push(nuevaRuta.puntos);

  contadorID++;

  document.querySelector('#nombreRuta').value = '';
  document.querySelector('#tiquete').value = '';
  document.querySelector('#origen').value = '';
  document.querySelector('#destino').value = '';
  document.querySelector('#puntos').value = '';

  actualizarTabla();
};

//Eliminar ruta
function eliminarRuta(id) {
  rutas = rutas.filter(function (ruta) {
    return ruta.id !== id;
  });
  actualizarTabla();
};

function actualizarTabla() {
  segundoContenedor.innerHTML = '';

  rutas.forEach(function (ruta) {
    let fila = document.createElement('tr');

    fila.innerHTML = `
      <td> ${ruta.id}</td>
      <td> ${ruta.nombreRuta}</td>
      <td> ${ruta.tiquete}</td>
      <td> ${ruta.origen}</td>
      <td> ${ruta.destino}</td>
      <td> ${ruta.puntos}</td>
      <td><button id="eliminarRuta" onclick="eliminarRuta(${ruta.id})">Eliminar</button></td>
    `;

    let opcionCompra = document.createElement("option");
    opcionCompra.textContent = ruta.nombreRuta;
    selectRutas.appendChild(opcionCompra);

    segundoContenedor.appendChild(fila);
  });
};

agregarRuta.addEventListener('submit', function (event) {
  event.preventDefault();
  agregarRutas();
});

//Compra de tiquetes
let comprar = document.querySelector('#comprar');
let tarjetaOculta = document.querySelector('#tarjetaOculta');
let tarjetaCuerpo = document.querySelector('#tarjetaCuerpo');

comprar.addEventListener("submit", function (event) {
  event.preventDefault();
  tarjetaOculta.classList.remove("tarjetaOculta");

  const nombreCliente = selectClientes.options[selectClientes.selectedIndex].text;
  const nombreRuta = selectRutas.options[selectRutas.selectedIndex].text;
  let tiquete = 0;
  let puntos = 0;

  for (let ruta of rutas) {
    if (ruta.nombreRuta === nombreRuta) {
      tiquete = parseFloat(ruta.tiquete) * 0.16 + parseFloat(ruta.tiquete) * 0.04 + parseFloat(ruta.tiquete);
      puntos = ruta.puntos;

      break;
    };
  };

  for (let cliente of Object.values(clientes)) {
    if (cliente.nombre === nombreCliente) {
      let xpuntos = pun.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`;

      tarjetaCuerpo.innerHTML = `
        <h5 class="card-title">Resumen compra</h5>
        <p><strong>Nombre del pasajero: </strong>${nombreCompleto}</p>
        <p><strong>Nombre de la ruta: </strong>${nombreRuta}</p>
        <p><strong>Precio total del tiquete: </strong>${tiquete}</p>
        <p><strong>Puntos totales: </strong>${xpuntos}</p>
      `;

      break;
    };
  };
});