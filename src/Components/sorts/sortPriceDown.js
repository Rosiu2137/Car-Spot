function sortPriceDown(data)
{
    
    data.sort((a,b)=>+a.price - +b.price)
   
    return data
}

export default sortPriceDown