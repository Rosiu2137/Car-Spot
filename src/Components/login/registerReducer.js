
const reducer =(state,action)=>
{
    const newState = {...state}
    switch(action.type)
    {
        case 'email':
            newState.email = action.value
            break
        case 'password':
            newState.password = action.value
            break
        case 'repeatPassword':
            newState.repeatPassword = action.value
            break
        case 'phone':
            if(action.value.length <= 9)
            {
                if(action.value == '')
                {
                    newState.phone = action.value
                }
                if(Number(action.value))
                {
                    newState.phone = action.value
                }
            }
            break
        case 'name':
            newState.name = action.value
            break
        case 'surname':
            newState.surname = action.value
            break
        case 'city':
            newState.city = action.value
            break
    }
    return newState
}
export default reducer