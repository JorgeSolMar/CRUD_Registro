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
    
    listaRegistrosUI.innerHTML += `<tr>
    <th scope="row">${element.nomyap}</th>
    <td>${element.correo}</td>
    <td>${element.telefono}</td>
    <td>
        <button onclick='editarDB(${index})' type="button" class="btn btn-success">Editar</button>
        <button onclick='eliminarDB(${index})' type="button" class="btn btn-danger">Eliminar</button>
    </td>
  </tr>`
    });
}

let eliminarDB = (position) => {
    arrayRegistros.splice(position,1);
    
    GuardarDB();
}

let editarDB = (position) => {

    listaRegistrosUI.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(e.target.innerHTML);

        if(e.target.innerHTML === 'Editar'){
        
            let textonombre = e.path[2].childNodes[1].innerHTML;
            let textocorreo = e.path[2].childNodes[3].innerHTML;
            let textotelefono = e.path[2].childNodes[5].innerHTML;

            document.getElementById('nomyap').value = textonombre;
            document.getElementById('correo').value = textocorreo;
            document.getElementById('telefono').value = textotelefono;

        }    
    
    
    
    MostrarDB();
});

}




// map((elemento, position) =>{
//     return elemento + 1;
//     });



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

