const setPrice = (price) =>
{
    try
    {
        const newPrice = price.split('').reverse()
        const trustPrice = []
        const il = Math.ceil(+newPrice.length/3)
        for(let i=0;i<il;i++)
        {
            for(let j =i*3;j<i*3+3;j++)
            {
                trustPrice.push(newPrice[j])
            }
            trustPrice.push(' ')
        }
        
        const returnedPrice = []
        trustPrice.reverse()
        for(let i =0;i<trustPrice.length;i++)
        {
            if(trustPrice[i] || trustPrice[i]==' ')
            {
                returnedPrice.push(trustPrice[i])
            }
        }
   
        const string = returnedPrice.join('')
        const newString = string.trim()
        return newString
    }
    catch(ex)
    {
        return price
    }
     
   


     
}

export default setPrice