//Variables globales
let formularioUI = document.getElementById('formulario');
let listaRegistrosUI = document.getElementById('listaRegistros');
let arrayRegistros = [];



//Funciones
let CrearItem = (nomyap, correo, telefono) => {
    let item = {
        nomyap: nomyap,
        correo: correo,
        telefono: telefono
    }

arrayRegistros.push(item);
return item;
}

let GuardarDB = () => {
    localStorage.setItem('suscriptores', JSON.stringify(arrayRegistros));
    MostrarDB();
}

let MostrarDB = () => {
    listaRegistrosUI.innerHTML = '';
    arrayRegistros = JSON.parse(localStorage.getItem('suscriptores')) ? JSON.parse(localStorage.getItem('suscriptores')) : [];
    

    arrayRegistros.forEach((element, index) => {
    console.log(index)
    listaRegistrosUI.innerHTML += `<tr>
    <th scope="row">${element.nomyap}</th>
    <td>${element.correo}</td>
    <td>${element.telefono}</td>
    <td>
        <button type="button" class="btn btn-success">Editar</button>
        <button onclick='eliminarDB(${index})' type="button" class="btn btn-danger">Eliminar</button>
    </td>
  </tr>`
    });
}

let eliminarDB = (position) => {
    arrayRegistros.splice(position,1);
    
    GuardarDB();
}




//Eventos
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
   
    let nomyapUI = document.querySelector('#nomyap').value;
    let correoUI = document.querySelector('#correo').value;
    let telefonoUI = document.querySelector('#telefono').value;

    if(nomyapUI === '' || correoUI === '' || telefonoUI === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    CrearItem(nomyapUI, correoUI, telefonoUI)
    GuardarDB();

    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', MostrarDB);