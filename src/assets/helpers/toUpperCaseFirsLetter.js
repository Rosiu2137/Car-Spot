
function toUpperCaseFirstLetter(str)
{   
    if(str == '')
    {
        return str
    }
    const arr = str.split('')
    arr[0] = arr[0].toUpperCase()
    const returned = arr.join('')
    return returned
}

export default toUpperCaseFirstLetter