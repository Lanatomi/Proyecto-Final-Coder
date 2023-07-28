const DateTime = luxon.DateTime;


class Causa{
    constructor (id, fecha, actor, demandado, objeto, fuero, jurisdiccion) {
    this.id = parseInt(id),
    this.fecha = DateTime.fromISO(fecha),
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


cargarArchivero = async () =>{
    const res = await fetch("data.json")
    const data = await res.json()

    for(let c of data){
        let causaData = new Causa(c.id,c.fecha,c.actor,c.demand,c.obj,c.fuero,c.jurisd)
        archivero.push(causaData)
    }
    localStorage.setItem("archivero", JSON.stringify(archivero))
}

let archivero = []



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
    
   cargarArchivero()
}

