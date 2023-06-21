// Ingreso 

// 1. Ingreso de causas
//  	Ingresar datos: Id, fecha, actor, demandado, objeto, fuero, jurisdicción
// 2. Ver o eliminar causas
// 	Ver ordenado por (5) : Id, actor, fuero, jurisdicción, fecha
// 	Eliminar  por Id
// 3. Filtrar por (3) : Actor, fuero, jurisdicción
// 3. Calculadora
// 	Impuestos
// 	Liquidación final
// 4. Salir del sistema


class Causa{
    constructor (id, fecha, actor, demandado, objeto, fuero, jurisdiccion) {
    this.id = id,
    this.fecha = new Date(fecha),
    this.actor = actor.toLocaleLowerCase(),
    this.demand = demandado.toLocaleLowerCase(),
    this.obj = objeto.toLocaleLowerCase() ,
    this.fuero = fuero.toLocaleLowerCase(),
    this.jurisd = jurisdiccion.toLocaleLowerCase()
}

mostrar(){
    console.log(`El número de causa es ${this.id}, de fecha ${this.fecha.toLocaleDateString()}. 
    El actor es ${this.actor} y el demandado es ${this.demand}.
    El objeto del caso es ${this.obj}, y tramita en en juzgado ${this.fuero} de ${this.jurisd}`)
}
}



const archivero = []




//Causas cargadas de ejemplo
const causa1 = new Causa(1,new Date(2023,5,16),`Lautaro Torres Miranda`, `Angel Acosta`,`Daños y perjuicios`,`Civil`,`Caba`)
const causa2 = new Causa(2,new Date(2023,3,2),`Angel Acosta`, ``,`Robo Calificado`,`Penal`,`Nacion`)
const causa3 = new Causa(3,new Date(2005,0,25),`Santiago Rodriguez`, `Volkswagen S.A.`,`Incumplimiento de contrato`,`Civil`,`Rio Negro`)
const causa4 = new Causa(4,new Date(2017,11,8),`Valentina Perez`, ``,`Estafa`,`Penal`,`Buenos Aires`)
const causa5 = new Causa(5,new Date(2012,9,30),`Emiliano Gonzalez`, `Patito S.R.L.`,`Contrato de obra`,`Comercial`,`Caba`)
const causa6 = new Causa(6,new Date(1999,2,17),`Emiliano Gonzalez`, `Estado Nacional`,`Acto administrativo`,`Administrativo`,`Nacion`)
const causa7 = new Causa(7,new Date(2017,6,22),`Juan Martinez`, `Martina Lopez`,`Divorcio`,`Familia`,`Buenos Aires`)


archivero.push(causa1,causa2,causa3,causa4,causa5,causa6,causa7)
console.log(archivero)



function mostrarCausa(arr){
           console.log(`
            El número de causa es ${arr.id}, de fecha ${arr.fecha.toLocaleDateString()}. 
            El actor es ${arr.actor} y el demandado es ${arr.demand}.
            El objeto del caso es ${arr.obj}, y tramita en en juzgado ${arr.fuero} de ${arr.jurisd}
            `)
    }



function ingresoCausa (){
    let idActual = archivero.slice(-1)[0]
    const nuevaCausa =  new Causa(
        idActual.id + 1,
        //Hice esto porque me di cuenta que si lo dejaba con un archivero.lenght+1 y entraba para borrar una Causa y después escribir otra el id del nuevo ingreso se superponía con el del anterior
        new Date (prompt(`Ingrese año`), prompt(`Ingrese mes`)-1,prompt(`Ingrese día`)),
        prompt(`Ingrese el nombre y el apellido del actor`),
        prompt(`Ingrese el nombre y el apellido del demandado, en caso de ser un caso penal no ingresar dato`),
        prompt(`Ingrese el objeto del juicio. Ej. Daños y perjuicios, Robo, Divorcio, etc.`),
        prompt(`Ingrese el fuero del proceso. Ej. Civil, Penal, Familia, etc.`),
        prompt(`Ingrese la jurisdicción. Ej. Buenos Aires, Caba, Nación, u otra provincia`)
)
archivero.push(nuevaCausa)
}






function archiveroPorid(array){
    for(let c of array){c.mostrar()}
}

function archiveroPoractor(arr){
    const porActor = [].concat(arr)
    porActor.sort(function(a,b) {
        if (a.actor > b.actor) {
        return 1;
      }
      if (a.actor < b.actor) {
        return -1;
      }
      return 0;})
      porActor.forEach((c) => mostrarCausa(c))
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
      return 0;})
      porFuero.forEach((c) => mostrarCausa(c))
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
      return 0;})
      porJurisd.forEach((c) => mostrarCausa(c))
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
      return 0;})
    porFecha.forEach((c) => mostrarCausa(c))
}

function archiveroEliminar(arr){
    let idBuscado = prompt(`Ingrese el id de la causa a eliminar`)
    let causaBuscada = arr.find((x) => x.id === parseInt(idBuscado))
    console.log(causaBuscada)
    arr.splice(idBuscado-1,1)
    arr.forEach((x) => mostrarCausa(x))
}


function archiveroFiltrar(arr){
    let causaBuscada = prompt(`Ingrese el nombre del actor, fuero o jurisdicción de la causa a buscar`)
    const resultado = arr.filter((x) => 
        x.actor.includes(causaBuscada.toLocaleLowerCase()) || 
        x.fuero.includes(causaBuscada.toLocaleLowerCase()) || 
        x.jurisd.includes(causaBuscada.toLocaleLowerCase()))
    if (resultado.length == 0){
        alert(`La busqueda de ${causaBuscada} no arroja resultados`)
    }else{resultado.forEach((x) => mostrarCausa(x))}
}





function ordenCausas(){
    let salirMenu = false
    do{
    let tipoOrden = parseInt(prompt(`Usted tiene ${archivero.length} causas. Ingrese el número del tipo de orden en el que desea ver las causas
        1. por Id
        2. por Actor
        3. por Fuero
        4. por Jurisdicción
        5. por Fecha
        6. Si desea eliminar una causa
        0. Salir al menú`)
        )
        switch(tipoOrden){
            case 1:
                archiveroPorid(archivero)
            break
            case 2:
                archiveroPoractor(archivero)
            break
            case 3:
                archiveroPorfuero(archivero)
            break
            case 4:
                archiveroPorjurisd(archivero)
            break
            case 5:
                archiveroPorfecha(archivero)
            break
            case 6:
                archiveroEliminar(archivero)
            case 0:
                salirMenu = true
            break
            default:
                alert(`La opción ingresada no es una función valida del sistema`)
            break
        }
    }while(!salirMenu)
}





    
    function calcularImpuestos (){
        let montoTotal = 0
        let contador = 0
        let montoNuevo = 0
        do{
           montoNuevo = parseFloat(prompt(`Ingrese el monto bruto a calcular el IVA, para finalizar ingrese el valor 0`)) 
           montoTotal = montoTotal + montoNuevo
           contador = contador+1        
        }while(montoNuevo != 0){
            const calculoIva = {
                total: montoTotal,
                iva: montoTotal*0.21,
                suma: montoTotal + (montoTotal*0.21),
            }
            console.log(`La cantidad de montos ingresados es: ${contador - 1}`)
            console.log(`El total de los montos es $${calculoIva.total.toFixed(2)}, su IVA es de $${calculoIva.iva.toFixed(2)}, y el total final es de $${calculoIva.suma.toFixed(2)}`)
            alert(`La cantidad de montos ingresados es: ${contador - 1}
            El total de los montos es $${calculoIva.total.toFixed(2)}
            Su IVA es de $${calculoIva.iva.toFixed(2)}
                El total final es de $${calculoIva.suma.toFixed(2)}`
            )
        }
    }






    
function menu(){
    let salirMenu = false
    do{
    let proceso = parseInt(prompt(`Bienvenido. Ingrese el número de la opción que desea
        1. Ingresar causa
        2. Ver o eliminar causas
        3. Filtrar causas
        4. Calculadora de IVA
        0. Salir del sistema`))
        switch(proceso){
            case 1:
                ingresoCausa ()
            break
            case 2:
                ordenCausas()
            break
            case 3:
                archiveroFiltrar(archivero)
            break
            case 4:
                calcularImpuestos ()
            break
            case 0:
                alert(`Gracias por utilizar nuestra app. Saludos!`)
                salirMenu = true
            break
            default:
                alert(`La opción ingresada no es una función valida del sistema`)
            break
        }
    }while(!salirMenu)
}

menu()