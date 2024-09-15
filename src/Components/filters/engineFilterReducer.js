import filtersObject from "../Context/filtersObject"

const reducer = (state,action)=>
{
    let newState= {...state}

    switch(action.type)
    {
        case 'benzyna':
            newState.benzyna = !newState.benzyna
            break
        case 'benzynaLPG':
            newState.benzynaLPG = !newState.benzynaLPG
            break
        case 'diesel':
            newState.diesel = !newState.diesel
            break
        case 'electric':
            newState.electric = !newState.electric
            break
        case 'hybrid':
            newState.hybrid = !newState.hybrid
            break
        case 'reset':
        newState = filtersObject.engine
        break
    }

    sessionStorage.setItem('engine',JSON.stringify(newState))
    return newState
}

export default reducer