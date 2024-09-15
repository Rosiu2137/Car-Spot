function sortRandom(data)
{

    data.sort((a,b)=>{
        const random = Math.floor(Math.random()*100)

       
        if(random % 2 === 0)
        {
            return -1
        }
        else
        {
      
            return 1
        }
    })

    return data
}

export default sortRandom