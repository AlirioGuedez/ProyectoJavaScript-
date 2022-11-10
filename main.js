const espacioEstacionamiento = [{ numeroPuesto: 0, fechaentrada: '30/09/2022 9:14:00', estado: true }];
function getEstacionamiento() {
  fetch('dato.json')
    .then((res) => res.json())
    .then((json) => {
      for (const i of json) {
        espacioEstacionamiento.push(i);
      }
      mostrarEstacionamiento();
    })
    .catch((err) => {
      console.log(err);
    });
}
getEstacionamiento();

class estacionamiento {
  constructor(numeroPuesto, fechaentrada, estado) {
    this.numeroPuesto = numeroPuesto;
    this.fechaentrada = fechaentrada;
    this.estado = estado; //true -> ocupado.. false -> no cupado
  }
  estado() {
    let error = 'El puesto esta Disponible';
    if (this.estado == false) {
      this.estado = true;
    } else console.log(error);
  }
  deshabiltiar() {
    let error = 'El puesto no esta disponible';
    if (this.estado == true) {
      this.estado = false;
    } else console.log(error);
  }
}

//Arrays Contenedoras.
const nuevoCliente = [];
const nuevoAuto = [];

function filtrarEstaciomiento() {
  const encontrar = espacioEstacionamiento.find((item) => item.estado == false);
  let resul = '';
  let html = '';
  if (encontrar == undefined) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No tiene Espacio Disponible',
      showConfirmButton: false,
      timer: 1500,
    });
    document.getElementById('resultadoB').innerHTML = resul;
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Si tiene Puesto Disponible',
      showConfirmButton: false,
      timer: 1500,
    });
    resul = `<h3> Los puesto disponibles Son:</h3>`;
    let disponibles = espacioEstacionamiento.filter((estacionamiento) => estacionamiento.estado == false);
    for (let i = 0; i < disponibles.length; i++) {
      html =
        html +
        `
      <div class="caja1"; onclick="(${disponibles[i]});">
        <p>Numero de puesto: ${disponibles[i].numeroPuesto}</p>
        </p>
        </div>
      `;
    }
    document.getElementById('resultadoB').innerHTML = html;
    document.getElementById('ok').innerHTML = resul;
  }
}

function ingresarEstacionamiento() {
  let puesto = document.getElementById('numeroPuesto').value;
  let fechaentrada = '';
  let estado = false;
  let estacinamiento = new estacionamiento(puesto, fechaentrada, estado);

  if (puesto == '') {
    Swal.fire({
      title: 'Error',
      text: 'Faltaron datos por Agregar',
      icon: 'error',
      confirmButtonText: 'error',
    });
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados',
      showConfirmButton: false,
      timer: 1500,
    });
    espacioEstacionamiento.push(estacinamiento);
  }

  document.getElementById('numeroPuesto').value = '';

  mostrarEstacionamiento();
}

function mostrarEstacionamiento() {
  console.log(espacioEstacionamiento);
  let estadoEsta = '';
  let html = '';
  let inicio = '';
  let botones = '';
  for (let i = 0; i < espacioEstacionamiento.length; i++) {
    estadoEsta = 'Desocupado';
    inicio = 'Sin Fecha de inicio';
    botones = `
    <input id="fecha" type="datetime-local" onchange="obtenerFecha(this, ${espacioEstacionamiento[i].numeroPuesto})" />
    `;
    if (espacioEstacionamiento[i].estado == true) {
      estadoEsta = 'Ocupado';
      inicio = `Fecha Inicio ${espacioEstacionamiento[i].fechaentrada}`;
      botones = `
      <button id="button" onclick="calculoTiempo(${espacioEstacionamiento[i].numeroPuesto})" />Finalizar</button>
      `;
    }
    html =
      html +
      `
        <div class="caja">
        <p>Numero de puesto: ${espacioEstacionamiento[i].numeroPuesto}</p>
        <p>${inicio}</p>
        <p>Estado: ${estadoEsta}</p>
        ${botones}
      </div>
      
      `;
  }
  document.getElementById('resultadoEstacionamiento').innerHTML = html;
}

function obtenerFecha(e, id) {
  let fecha = moment(e.value);
  FechaFormato = fecha.format('DD/MM/YYYY h:mm:ss');
  console.log(FechaFormato);

  let indice = espacioEstacionamiento.findIndex((objeto, i, estacionamiento) => {
    return objeto.numeroPuesto == id;
  });
  const modificar = espacioEstacionamiento.splice(indice, 1, { numeroPuesto: indice, fechaentrada: FechaFormato, estado: true });
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Datos guardados',
    showConfirmButton: false,
    timer: 1500,
  });
  mostrarEstacionamiento();
}

function txHora() {
  tiempoXHora = document.getElementById('tiempoXhora').value == '' ? 0 : document.getElementById('tiempoXhora').value;

  if (tiempoXHora <= 0) {
    Swal.fire({
      title: 'Error',
      text: 'Faltaron datos por Agregar',
      icon: 'error',
      confirmButtonText: 'error',
    });

    document.getElementById('tiempoXhora').value = '';
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  console.log(tiempoXHora);
  return tiempoXHora;
}

function calculoTiempo(id) {
  if (txHora() <= 0) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'falta Ingresar El monto Por Xhora.',
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    let resultadoT = 0;
    let indice = espacioEstacionamiento.findIndex((objeto, i, estacionamiento) => {
      return objeto.numeroPuesto == id;
    });
    const encontrar2 = espacioEstacionamiento.find((item) => item.numeroPuesto == id);

    let fecha1 = moment(encontrar2.fechaentrada, 'DD/MM/YYYY h:mm:ss');
    let fecha2 = moment();
    let fecha3 = moment(fecha2, 'DD/MM/YYYY h:mm:ss');
    let tiempoMinutos = fecha1.diff(fecha3, 'minutes');

    console.log(tiempoMinutos);

    if (tiempoMinutos >= 0) {
      resultadoT = (tiempoMinutos / 60) * txHora();
    } else {
      resultadoT = -(tiempoMinutos / 60) * txHora();
    }

    Swal.fire({
      title: 'El Total a cobrar: ' + Math.round(resultadoT) + '.00 $',
      text: '',
      imageUrl: 'https://www.cosasdeautos.com.ar/wp-content/uploads/2020/12/concesionario-llaves.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      background: '#fff',
    });

    let indice1 = espacioEstacionamiento.findIndex((objeto, i, estacionamiento) => {
      return objeto.numeroPuesto == id;
    });
    const modificar = espacioEstacionamiento.splice(indice, 1, { numeroPuesto: indice1, fechaentrada: fecha3, estado: false });

    mostrarEstacionamiento();
  }
}
