const deletePolishSymbols = (str)=>
{
    const newStr = str.replace('ą','a').replace('ę','e').replace('ń','n').replace('ó','o').replace('ż','z').replace('ź','z').replace('ł','l').replace('ś','s').replace('ć','c')
    return newStr
}

export default deletePolishSymbols