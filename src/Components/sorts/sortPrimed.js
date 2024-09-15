

function sortPrimed(arr)
{
    arr.sort((a,b)=>a.index - b.index)
    
    arr.sort((a,b)=>{
        if(a.primed == true && b.primed == false)
        {
            return -1
        }
        else
        {
            return 0
        }
    })
    return arr
}

export default sortPrimed