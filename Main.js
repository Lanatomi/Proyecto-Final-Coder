
//Pantalla principal donde se debe ingresar nombre de usuario y contraseña

const guardarUsuario = "Usuario";
const guardarPassword = "Contraseña";

// Función para guardar los valores en el sessionStorage
function guardarSesion() {
    sessionStorage.setItem('username', guardarUsuario);
    sessionStorage.setItem('password', guardarPassword);
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (username === guardarUsuario && password === guardarPassword) {
        guardarSesion(); 

        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    const storedUser = sessionStorage.getItem('username');
    const storedPass = sessionStorage.getItem('password');

    if (storedUser === guardarUsuario && storedPass === guardarPassword) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        document.getElementById('loginContainer').style.display = 'block';
    }
});


//Función que calcula con Luxon cuantos días hay hasta el próximo martes o viernes

let fecha = document.getElementById("fecha")

function calcularDiferenciaHastaProximoDia(targetWeekday) {
    const fechaActual = DateTime.now();
    let proximoDia = fechaActual;
    while (proximoDia.weekday !== targetWeekday) {
        proximoDia = proximoDia.plus({ days: 1 });
    }
    const diferenciaDias = proximoDia.diff(fechaActual, 'days').days;
    return diferenciaDias;
}

//Formato en que se verá en pantalla la fecha

setInterval(()=>{
   let newFormat = {
    weekday: 'long', 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit' 
}
   const fechaMostrar =  DateTime.now().toLocaleString(newFormat)

   const diasHastaProximoMartes = calcularDiferenciaHastaProximoDia(2)
   const diasHastaProximoViernes = calcularDiferenciaHastaProximoDia(5)

   fecha.innerHTML = `<p>${fechaMostrar}</p>
   <p> Días hasta próximo día de Nota Martes: ${diasHastaProximoMartes}</p>
   <p> Días hasta próximo día de nota Viernes: ${diasHastaProximoViernes}</p>`

},1000)



//DARKMODE: 
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let eliminarModeBtn = document.getElementById("eliminarMode")

//leer/consultar localStorage
//si capturamos una clave que no existe, nos devuelve null
let modoOscuro = localStorage.getItem("modoOscuro")
console.log(modoOscuro)

if(modoOscuro == "true"){
   document.body.classList.add("darkMode")
}

botonDarkMode.addEventListener("click", ()=>{
   console.log("Funciona botón oscuro")
   //agregar clase de modo oscuro
   document.body.classList.add("darkMode")
   //storage
   localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click", ()=>{
   console.log("Funciona botón claro")
   //evento elimina class darkMode y deja el nav por defecto
   document.body.classList.remove("darkMode")
   localStorage.setItem("modoOscuro", false)
})
eliminarModeBtn.addEventListener("click", ()=>{
   console.log("Funciona eliminar")
   //eliminar preferencia modo oscuro
   localStorage.removeItem("modoOscuro")
   //eliminar TODO storage:
   localStorage.clear()
})



//Acá comienza lo de DOM

function ingresoCausa (array){
        let idActual = array.slice(-1)[0]
        let fechaActual = document.getElementById("fechaInput")
        let actorActual = document.getElementById("actorInput")
        let demandActual = document.getElementById("demandadoInput")
        let objActual = document.getElementById("objetoInput")
        let fueroActual = document.getElementById("Fueros")
        let jurisdActual = document.getElementById("Jurisd")
    const nuevaCausa =  new Causa(idActual.id + 1, DateTime.fromISO(fechaActual.value), actorActual.value, demandActual.value, objActual.value, fueroActual.value, jurisdActual.value)
      
array.push(nuevaCausa)
localStorage.setItem("archivero", JSON.stringify(array))
}


let tabla = document.getElementById("container")



//Crea una fila para cada elemento del array
function mostrarfila(array){
    tabla.innerHTML = `
    <th>ID</th>
    <th>Fecha</th>
    <th>Actor</th>
    <th>Demandado</th>
    <th>Objeto</th>
    <th>Fuero</th>
    <th>Jurisdicción</th>`
    for(const d of array){
        let fila = document.createElement("tr");
        
        fila.innerHTML = 
        `<tr class="table-row">
        <td>${d.id}</td>
        <td>${d.fecha.toLocaleString(DateTime.DATE_SHORT)}</td>
        <td>${d.actor}</td>
        <td>${d.demand}</td>
        <td>${d.obj}</td>
        <td>${d.fuero}</td>
        <td>${d.jurisd}</td>
        </tr>`;
        tabla.appendChild(fila)
    }
}

//FUNCIONES PARA ORDENAR

function archiveroPoractor(arr){
    const porActor = [].concat(arr)
    porActor.sort(function(a,b) {
        if (a.actor > b.actor) {
        return 1;
      }
      if (a.actor < b.actor) {
        return -1;
      }
      return 0;
        }
    )
    mostrarfila(porActor)
}

function archiveroPorfuero(arr){
    const porFuero = [].concat(arr)
    porFuero.sort(function(a,b) {
        if (a.fuero > b.fuero) {
        return 1;
      }
      if (a.fuero < b.fuero) {
        return -1;
      }
      return 0;
        }
    )
    mostrarfila(porFuero)
}

function archiveroPorjurisd(arr){
    const porJurisd = [].concat(arr)
    porJurisd.sort(function(a,b) {
        if (a.jurisd > b.jurisd) {
        return 1;
      }
      if (a.jurisd < b.jurisd) {
        return -1;
      }
      return 0;
        }
    )
    mostrarfila(porJurisd)
}

function archiveroPorfecha(arr){
    const porFecha = [].concat(arr)
    porFecha.sort(function(a,b) {
        if (new Date(a.fecha).getTime() > new Date(b.fecha).getTime()) {
        return 1;
      }
      if (new Date(a.fecha).getTime() < new Date(b.fecha).getTime()) {
        return -1;
      }
      return 0;
        }
    )
    mostrarfila(porFecha)
}


//Función para agregar una nueva fila y poder sumar un nuevo dato al array/tabla


function agregarfila(){
    let fila = document.createElement("tr");
    let boton = document.createElement("button")
    fila.innerHTML = 
    `
    <tr class="table-row">
    <td><input type="hidden" id="idInput" placeholder="El ID se ingresa automaticamente"></td>
    <td><input type="date" id="fechaInput" placeholder="Ingrese fecha"></td>
    <td><input type="text" id="actorInput" placeholder="Ingrese actor"></td>
    <td><input type="text" id="demandadoInput" placeholder="Ingrese demandado"></td>
    <td><input type="text" id="objetoInput" placeholder="Ingrese objeto"></td>
    <td>
    <select id="Fueros" class="form-select form-select-sm" aria-label=".form-select-sm example" name="Seleccione fuero">
    <option selected>Seleccione fuero:</option>
    <option value="Civil">Civil</option>
    <option value="Familia">Familia</option>
    <option value="Comercial">Comercial</option>
    <option value="Administrativo">Administrativo</option>
    <option value="Penal">Penal</option>
    <option value="Otros">Otros</option>
    </select>
    </td>
    <td>
    <select id="Jurisd" class="form-select form-select-sm" aria-label=".form-select-sm example" name="Seleccione jurisdicción">
    <option selected>Seleccione fuero:</option>
    <option value="Caba/Nación">Caba/Nación</option>
    <option value="BsAs">BsAs</option>
    <option value="Federal">Federal</option>
    <option value="Córdoba">Córdoba</option>
    <option value="Santa Fe">Santa Fe</option>
    <option value="Otros">Otros</option>
    </select>
    </td>
    </tr>        
    `
    boton.innerHTML =`<button id="btnAgregar"class="btn btn-success">Agregar</button>`
    tabla.append(fila)
    tabla.append(boton)
    console.log("Llegó")
    boton.addEventListener("click", () => {ingresoCausa(archivero)
        mostrarfila(archivero) 
    }   
    )
}

function eliminarFila (array){
    let botonEliminar = document.getElementById("btnEliminar")
    
    botonEliminar.addEventListener("click", () => {
        let idBuscado = document.getElementById("eliminarId").value
        console.log(idBuscado)
            if(idBuscado == ""||isNaN(idBuscado)){}
            else{
                let causaBuscada = array.find((x) => x.id === parseInt(idBuscado))
                console.log(causaBuscada)
                archivero.splice((idBuscado)-1,1)
                tabla.deleteRow(idBuscado-1)
                tabla.innerHTML = `
                <th>ID</th>
                <th>Fecha</th>
                <th>Actor</th>
                <th>Demandado</th>
                <th>Objeto</th>
                <th>Fuero</th>
                <th>Jurisdicción</th>`
                mostrarfila(array)
                localStorage.setItem("archivero", JSON.stringify(array))
               }
            }
        )
    }

function ordenarFila(array){
    let tipoOrden = document.getElementById("Orden")
    botonOrden = document.addEventListener("change", () => {
    /* console.log(tipoOrden.value) */

        switch(tipoOrden.value){
            case "actorOrden":
                archiveroPoractor(array)
            break
            case "fueroOrden":
                archiveroPorfuero(array)
            break
            case "jurisdOrden":
                archiveroPorjurisd(array)
            break
            case "fechaOrden":
                archiveroPorfecha(array)
            break
            case "defectoOrden":
                mostrarfila(array)
            break
            default:
                ""
            break
            }
        }
    )
}

function archiveroFiltrar(arr){
    let botonFiltrar = document.getElementById("btnFiltrar")
    
    botonFiltrar.addEventListener("click", () => {

    let causaBuscada = document.getElementById("Filtro")
    console.log(causaBuscada.value)
    const resultado = arr.filter((x) => 
        x.actor.toLocaleLowerCase().includes(causaBuscada.value.toLocaleLowerCase()) || 
        x.fuero.toLocaleLowerCase().includes(causaBuscada.value.toLocaleLowerCase()) || 
        x.jurisd.toLocaleLowerCase().includes(causaBuscada.value.toLocaleLowerCase()))
    if (resultado.length == 0){
        alert(`La busqueda de ${causaBuscada.value} no arroja resultados`)
    }else{mostrarfila(resultado)}
        }
    )    
}



//FUNCIONES ACTIVAS


mostrarfila(archivero)

let botonAgregar = document.getElementById("btnFila")
botonAgregar.addEventListener("click",agregarfila)

eliminarFila(archivero)

ordenarFila(archivero)

archiveroFiltrar(archivero)