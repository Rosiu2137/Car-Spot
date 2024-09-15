import filtersObject from "../Context/filtersObject"

const reducer = (state,action)=>
{
    let newState = {...state}

    switch(action.type)
    {
        case 'teens':
            newState.teens = !newState.teens
            break
        case 'thousands':
            newState.thousands = !newState.thousands
            break
        case 'nineteens':
            newState.nineteens = !newState.nineteens
            break
        case 'eighteens':
            newState.eighteens = !newState.eighteens
            break
        case 'seventeens':
            newState.seventeens = !newState.seventeens
            break
        case 'sixteens':
            newState.sixteens = !newState.sixteens
            break;
        case 'others':
            newState.others = !newState.others
            break;
        case 'reset':
            newState = filtersObject.year
            break;
    }

    sessionStorage.setItem('year',JSON.stringify(newState))
    return newState
}

export default reducer