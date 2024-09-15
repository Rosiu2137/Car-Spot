

function removeWhiteSymbolsFromPhone(val)
{
    const arr = val.split('')
    for(let i = 0; i<arr.length;i++)
    {
       if(arr[i] == " ")
       {
            const idx = arr.indexOf(arr[i])
            arr.splice(idx,1)
            i--
       }
    }
    const str = arr.join('')
    return str

}

export default removeWhiteSymbolsFromPhone