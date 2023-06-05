let juicios = parseInt(prompt(`Ingrese la cantidad de juicios que desea realizar`))

if(juicios >= 7||juicios <= 0|| isNaN(juicios)){
       
    alert(`Contacte a nuestras oficinas para un mejor asesoramiento`)
}else{

do{
    alert(`Usted desea realizar ${juicios} juicios`)     
let juicioTipo = prompt(`Ingrese el tipo de juicio que desea realizar: 
    - Para Civil ingrese: Civil
    - Para Familia ingrese: Familia
    - Para Penal ingrese: Penal
    - Para Comercial ingrese: Comercial
    - Para calcular el impuesto correspondiente a un prooducto ingrese: Tributos
    - En caso de otra tipo de proceso contacte directamene a nuestras oficinas`)

let juicioCivil

function mostrarJuicio (juicioTipo){
    console.log(`Tipo de juicio: ${juicioTipo}`)
    juicios = juicios - 1
}

function calcularImpuestos (){
    let montoTotal = 0
    let contador = 0
    let montoNuevo = 0
    do{
       montoNuevo = parseFloat(prompt(`Ingrese el monto bruto a calcular el IVA, para finalizar ingrese 0`)) 
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
        juicios = juicios - 1
    }
}

switch(juicioTipo.toLowerCase()){
    case "civil":
            let juicioCivil = prompt(`Su juicio ${juicioTipo} es por:
             - Daños 
             - Contractual`)
             function mostrarCivil (juicioCivil){
                console.log(`Tipo de juicio: ${juicioTipo}, ${juicioCivil}`)
                juicios = juicios - 1
             }
        switch(juicioCivil.toLowerCase()){
            case "daños":
                alert(`Usted debera comentar el hecho ocurrido en nuestras oficinas`)
                mostrarCivil(juicioCivil)
            break
            case "contractual":
                alert(`Usted debera enviar una copia del contrato a nuestra dirección de mail ...`)
                mostrarCivil(juicioCivil)
            break
            default:
                alert(`Opción incorrecta`)
                juicios = juicios - 1
            break
        }
    break
    case "penal":
        alert(`Usted debera comentar el hecho ${juicioTipo} en nuestras oficinas`)
        mostrarJuicio(juicioTipo)
    break
    case "comercial":
        alert(`Usted debera acercarse a nuestras oficinas con la documentación en cuestión`)
        mostrarJuicio(juicioTipo)
    break
    case "familia":
        alert(`Usted debera acercarse a nuestras oficinas con las partidas correspondientes`)
        mostrarJuicio(juicioTipo)
    break
    case "tributos":
        calcularImpuestos()
    break
    default:
        alert(`Opción incorrecta`)
        juicios = juicios - 1
    break
}
}while(juicios > 0)
}

