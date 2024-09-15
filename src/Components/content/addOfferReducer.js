export default function reducer(state,action)
{
    const newState = {...state}
    switch(action.type)
    {
        case 'name':
            newState.name = action.value
            break
        case 'model':
            newState.model = action.value
            break
        case 'distance':
            newState.distance = action.value
            break
        case 'year':
            newState.year = action.value
            break
        case 'capacity':
            newState.capacity = action.value
            break
        case 'power':
            newState.power = action.value
            break
        case 'torque':
            newState.torque = action.value
            break
        case 'weight':
            newState.weight = action.value
            break
        case 'gears':
            newState.gears = action.value
            break
        case 'combustion':
            newState.combustion = action.value
            break
        case 'doors':
            newState.doors = action.value
            break
        case 'seats':
            newState.seats = action.value
            break
        case 'color':
            newState.color = action.value
            break
        case 'description':
            newState.description = action.value
            break
         case 'price':
            newState.price = action.value
            break
    }
    return newState
}