import React from "react"   

function filterContentDefaultOffers(data,filters)
{
   
    const filtersBrand = (d)=>
    {

        const brand = []
        for(let i = 0;i<d.length;i++)
        {
            
            if(d[i].brand.toLowerCase() == filters.brand.toLowerCase())
            {
                brand.push(d[i])
            }
        }
        return brand
    }
    
    const filtersModel =(d)=>
    {
        const model = []
        for(let i =0;i<d.length;i++)
        {
            if(d[i].model.toLowerCase() == filters.model.toLowerCase())
            {
                model.push(d[i])
            }
        }
        return model
    }
    
    const filtersPriceDown = (d)=>
    {
        const filtered = d.filter(x=>Number(x.price) >= Number(filters.priceDown))
        return filtered
    }

    const filtersPriceUP =(d)=>
    {
        const filtered = d.filter(x=>Number(x.price) <= Number(filters.priceUp))
        return filtered
    }

    const filtersEngine = (d)=>
    {
        const filtered = d.filter(x=>x.engine === filters.engine)
        return filtered
    }

    let dataLocal = [...data]

    if(filters.brand)
    {
        dataLocal = filtersBrand(dataLocal)
    }
    if(filters.model)
    {
        dataLocal = filtersModel(dataLocal)
    }
    if(filters.priceDown)
    {
        dataLocal = filtersPriceDown(dataLocal)
    }
    if(filters.priceUp)
    {
        dataLocal = filtersPriceUP(dataLocal)
    }
    if(filters.engine)
    {
        dataLocal = filtersEngine(dataLocal)
    }

    return dataLocal
}

export default filterContentDefaultOffers