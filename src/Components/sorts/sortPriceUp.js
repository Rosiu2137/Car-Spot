function sortPriceUp(data)
{
  
    data.sort((a,b)=>+b.price - +a.price)
    
    return data
}

export default sortPriceUp