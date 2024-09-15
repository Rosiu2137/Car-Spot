import deletePolishSymbols from "../../assets/helpers/deletePolishSymbols"
import filtersObject from "../Context/filtersObject"

const priceDownFilter = (data)=>
{
    if(+filtersObject.priceDown === 0 || filtersObject.priceDown === '')
    {
        return Object.values(data)
    }
   const newData = Object.values(data).filter(x=>+x.price >= +filtersObject.priceDown)
   return newData
}
const priceUpFilter = (data)=>
{
    if(+filtersObject.priceUp === 0 || filtersObject.priceUp === '')
    {
        return Object.values(data)
    }
    const newData = Object.values(data).filter(x=>+x.price <= +filtersObject.priceUp)
   return newData
}

const cityFilter = (data)=>
{
    if(filtersObject.city == '')
    {
        return Object.values(data)
    }
  
        const newData = Object.values(data).filter(x=>deletePolishSymbols(x.location.toLowerCase()).includes(deletePolishSymbols(filtersObject.city.toLowerCase())))
        return newData

   
}

const distanceDownFilter = (data)=>
{
    if(+filtersObject.distanceDown == 0 || filtersObject.distanceDown === '')
    {
        return Object.values(data)
    }
    const newData = Object.values(data).filter(x=>+x.distance >= +filtersObject.distanceDown)
    return newData
}

const distanceUpFilter = (data)=>
{
    if(+filtersObject.distanceUp == 0 || filtersObject.distanceUp === '')
    {
        return Object.values(data)
    }
    const newData = Object.values(data).filter(x=>+x.distance <= +filtersObject.distanceUp)
    return newData
}

const yearFilter = (data)=>
{
   
    const filtered = []

    const newData = Object.values(data)
    newData.forEach((x,idx)=>x.index = idx)
    
    

    if(filtersObject.year.includes('teens'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year >= 2010))
    }
    if(filtersObject.year.includes('thousands'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year >= 2000 && +x.year < 2010))
    }
    if(filtersObject.year.includes('nineteens'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year >= 1990 && +x.year < 2000))
    }
    if(filtersObject.year.includes('eighteens'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year >= 1980 && +x.year < 1990))
    }
    if(filtersObject.year.includes('seventeens'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year >= 1970 && +x.year < 1980))
    }
    if(filtersObject.year.includes('sixteens'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year >= 1960 && +x.year < 1970))
    }
    if(filtersObject.year.includes('others'))
    {
        filtered.push(...Object.values(data).filter(x=>+x.year < 1960))
    }
    
    filtered.sort((x,y)=> x.index-y.index)
    filtered.forEach(x=>delete x.index)
    return filtered
    
    
   
}

const engineFilter = (data)=>
{
   
   const filtered = []
   const newData = Object.values(data)
    newData.forEach((x,idx)=>x.index = idx)

    if(filtersObject.engine.includes('benzyna'))
    {
        filtered.push(...Object.values(data).filter(x=>x.engine.toLowerCase() == "benzynowy"))
    }
    if(filtersObject.engine.includes('benzynaLPG'))
    {
        filtered.push(...Object.values(data).filter(x=>x.engine.toLowerCase() == "benzynowy + lpg"))
    }
    if(filtersObject.engine.includes('diesel'))
    {
        filtered.push(...Object.values(data).filter(x=>x.engine.toLowerCase() == "diesel"))
    }
    if(filtersObject.engine.includes('electric'))
    {
        filtered.push(...Object.values(data).filter(x=>x.engine.toLowerCase() == "elektryczny"))
    }
    if(filtersObject.engine.includes('hybrid'))
    {
        filtered.push(...Object.values(data).filter(x=>x.engine.toLowerCase() == "hybrydowy"))
    }

    filtered.sort((x,y)=> x.index-y.index)
    filtered.forEach(x=>delete x.index)

    return filtered
}

const brandFilter =(data)=>
{
    const filtered = []
   const newData = Object.values(data)
    newData.forEach((x,idx)=>x.index = idx)

    if(filtersObject.brand.includes('alfaRomeo'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "alfa romeo"))
    }
    if(filtersObject.brand.includes('alpine'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "alpine"))
    }
    if(filtersObject.brand.includes('astonMartin'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "aston martin"))
    }
    if(filtersObject.brand.includes('audi'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "audi"))
    }
    if(filtersObject.brand.includes('BMW'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "bmw"))
    }
    if(filtersObject.brand.includes('bentley'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "bentley"))
    }
    if(filtersObject.brand.includes('cadillac'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "cadillac"))
    }
    if(filtersObject.brand.includes('chevrolet'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "chevrolet"))
    }
    if(filtersObject.brand.includes('citroen'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "citroen"))
    }
    if(filtersObject.brand.includes('cupra'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "cupra"))
    }
    if(filtersObject.brand.includes('dacia'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "dacia"))
    }
    if(filtersObject.brand.includes('dodge'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "dodge"))
    }
    if(filtersObject.brand.includes('ferrari'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "ferrari"))
    }
    if(filtersObject.brand.includes('fiat'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "fiat"))
    }
    if(filtersObject.brand.includes('ford'))
    {
        
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "ford"))
    }
    if(filtersObject.brand.includes('honda'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "honda"))
    }
    if(filtersObject.brand.includes('hyundai'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "hyundai"))
    }
    if(filtersObject.brand.includes('jaguar'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "jaguar"))
    }
    if(filtersObject.brand.includes('jeep'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "jeep"))
    }
    if(filtersObject.brand.includes('kia'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "kia"))
    }
    if(filtersObject.brand.includes('laborghini'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "laborghini"))
    }
    if(filtersObject.brand.includes('landRover'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "landrover"))
    }
    if(filtersObject.brand.includes('lexus'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "lexus"))
    }
    if(filtersObject.brand.includes('mazda'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "mazda"))
    }
    if(filtersObject.brand.includes('mclaren'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "mclaren"))
    }
    if(filtersObject.brand.includes('mercedesBenz'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "mercedes-benz"))
    }
    if(filtersObject.brand.includes('nissan'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "nissan"))
    }
    if(filtersObject.brand.includes('opel'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "opel"))
    }
    if(filtersObject.brand.includes('peugeot'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "peugeot"))
    }
    if(filtersObject.brand.includes('porsche'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "porsche"))
    }
    if(filtersObject.brand.includes('renault'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "renault"))
    }
    if(filtersObject.brand.includes('skoda'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "skoda"))
    }
    if(filtersObject.brand.includes('suzuki'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "suzuki"))
    }
    if(filtersObject.brand.includes('tesla'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "tesla"))
    }
    if(filtersObject.brand.includes('toyota'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "toyota"))
    }
    if(filtersObject.brand.includes('volkswagen'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "volkswagen"))
    }
    if(filtersObject.brand.includes('volvo'))
    {
        filtered.push(...Object.values(data).filter(x=>x.brand.toLowerCase() == "volvo"))
    }
    
    filtered.sort((x,y)=> x.index-y.index)
    filtered.forEach(x=>delete x.index)
    
    return filtered
}

function setFilteredOfferts(data)
{
    let localData = {...data}
    
    if(filtersObject.priceDown)
    {
      
        localData = {...priceDownFilter(localData)}
        
    }
    if(filtersObject.priceUp)
    {
       
        localData = {...priceUpFilter(localData)}
    }
    if(filtersObject.city)
    {
   
        localData ={...cityFilter(localData)}
    }
    if(filtersObject.distanceDown)
    {

        localData = {...distanceDownFilter(localData)}
    }
    if(filtersObject.distanceUp)
    {
   
        localData = {...distanceUpFilter(localData)}
    }
    if(filtersObject.year[0])
    {
   
        localData = {...yearFilter(localData)}
    }
    if(filtersObject.engine[0])
    {
     
        localData = {...engineFilter(localData)}
    }
    if(filtersObject.brand[0])
    {
     
        localData = {...brandFilter(localData)}
    }
   

   return localData
}

export default setFilteredOfferts