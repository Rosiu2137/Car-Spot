const reducer = (state,action)=>
{   
    const newState={...state}

    switch(action.type)
    {
        case 'changeBrand':
            newState.brand = !state.brand
            break
        case 'changeEngine':
            newState.engine = !state.engine
            break
        case 'changeYear':
            newState.year = !state.year
            break
        case 'changeDistance':
            newState.distance = !state.distance
            break
        case 'changeCity':
            newState.city = !state.city
            break
                
    }

    return newState
}  
       

export default reducer