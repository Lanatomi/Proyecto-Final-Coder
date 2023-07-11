
class Causa{
    constructor (id, fecha, actor, demandado, objeto, fuero, jurisdiccion) {
    this.id = parseInt(id),
    this.fecha = new Date(fecha),
    this.actor = actor,
    this.demand = demandado,
    this.obj = objeto ,
    this.fuero = fuero,
    this.jurisd = jurisdiccion
}

mostrar(){
    console.log(`El número de causa es ${this.id}, de fecha ${this.fecha.toLocaleDateString()}. 
    El actor es ${this.actor} y el demandado es ${this.demand}.
    El objeto del caso es ${this.obj}, y tramita en en juzgado ${this.fuero} de ${this.jurisd}`)
}
}

let archivero = []

//Causas cargadas de ejemplo
const causa1 = new Causa(1,new Date(2023,5,16),`Lautaro Torres Miranda`, `Angel Acosta`,`Daños y perjuicios`,`Civil`,`Caba`)
const causa2 = new Causa(2,new Date(2023,3,2),`Angel Acosta`, ``,`Robo Calificado`,`Penal`,`Nacion`)
const causa3 = new Causa(3,new Date(2005,0,25),`Santiago Rodriguez`, `Volkswagen S.A.`,`Incumplimiento de contrato`,`Civil`,`Rio Negro`)
const causa4 = new Causa(4,new Date(2017,11,8),`Valentina Perez`, ``,`Estafa`,`Penal`,`Buenos Aires`)
const causa5 = new Causa(5,new Date(2012,9,30),`Emiliano Gonzalez`, `Patito S.R.L.`,`Contrato de obra`,`Comercial`,`Caba`)
const causa6 = new Causa(6,new Date(1999,2,17),`Emiliano Gonzalez`, `Estado Nacional`,`Acto administrativo`,`Administrativo`,`Nacion`)
const causa7 = new Causa(7,new Date(2017,6,22),`Juan Martinez`, `Martina Lopez`,`Divorcio`,`Familia`,`Buenos Aires`)

if(localStorage.getItem("archivero")){
    console.log("Archivero ya está en storage")
    console.log(JSON.parse(localStorage.getItem("archivero")))
    //cuando no es la primera vez, me traigo lo de storage
    const archiveroData = JSON.parse(localStorage.getItem("archivero"));
  archivero = archiveroData.map((data) => 
    {
    const causa = new Causa(data.id, data.fecha, data.actor, data.demand, data.obj, data.fuero, data.jurisd);
    Object.setPrototypeOf(causa, Causa.prototype);
    return causa;}
    )
    console.log(archivero)
}else{
    console.log(`ENTRA POR PRIMERA VEZ`)
    
    archivero.push(causa1,causa2,causa3,causa4,causa5,causa6,causa7)
    localStorage.setItem("archivero", JSON.stringify(archivero))
}

console.log(archivero)
