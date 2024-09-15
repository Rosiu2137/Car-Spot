import filtersObject from "../Context/filtersObject"

const reducer =(state,action)=>
{
    let newState = {...state}
    switch(action.type)
    {
        case 'alfaRomeo':
            newState.alfaRomeo = !newState.alfaRomeo
            break
        case 'alpine':
            newState.alpine = !newState.alpine
            break
        case 'astonMartin':
            newState.astonMartin = !newState.astonMartin
            break
         case 'audi':
            newState.audi = !newState.audi
            break
        case 'BMW':
            newState.BMW = !newState.BMW
            break
        case 'bentley':
            newState.bentley = !newState.bentley
            break
        case 'cadillac':
            newState.cadillac = !newState.cadillac
            break
        case 'chevrolet':
            newState.chevrolet = !newState.chevrolet
            break
        case 'citroen':
            newState.citroen = !newState.citroen
            break
        case 'cupra':
            newState.cupra = !newState.cupra
            break
        case 'dacia':
            newState.dacia = !newState.dacia
            break
        case 'dodge':
            newState.dodge = !newState.dodge
            break
        case 'ferrari':
            newState.ferrari = !newState.ferrari
            break
        case 'fiat':
            newState.fiat = !newState.fiat
            break
        case 'ford':
            newState.ford = !newState.ford
            break
        case 'honda':
            newState.honda = !newState.honda
            break
        case 'hyundai':
            newState.hyundai = !newState.hyundai
            break
        case 'jaguar':
            newState.jaguar = !newState.jaguar
            break
        case 'jeep':
            newState.jeep = !newState.jeep
            break
        case 'kia':
            newState.kia = !newState.kia
            break
        case 'laborghini':
            newState.laborghini = !newState.laborghini
            break
        case 'landRover':
            newState.landRover = !newState.landRover
            break
        case 'lexus':
            newState.lexus = !newState.lexus
            break
        case 'mazda':
            newState.mazda = !newState.mazda
            break
        case 'mclaren':
            newState.mclaren = !newState.mclaren
            break
        case 'mercedesBenz':
            newState.mercedesBenz = !newState.mercedesBenz
            break
        case 'nissan':
            newState.nissan = !newState.nissan
            break
        case 'opel':
            newState.opel = !newState.opel
            break
        case 'peugeot':
            newState.peugeot = !newState.peugeot
            break
        case 'porsche':
            newState.porsche = !newState.porsche
            break
        case 'renault':
            newState.renault = !newState.renault
            break
        case 'skoda':
            newState.skoda = !newState.skoda
            break
        case 'suzuki':
            newState.suzuki = !newState.suzuki
            break
        case 'tesla':
            newState.tesla = !newState.tesla
            break
        case 'toyota':
            newState.toyota = !newState.toyota
            break
        case 'volkswagen':
            newState.volkswagen = !newState.volkswagen
           break
        case 'volvo':
            newState.volvo = !newState.volvo
            break
        case 'reset':
            newState = filtersObject.brand
            break
    }
    sessionStorage.setItem('brand',JSON.stringify(newState))
    return newState
    
}

export default reducer