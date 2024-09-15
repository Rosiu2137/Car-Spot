import axios from "axios"

async function getBackendOfferts()
{
    try
    {
        const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json`)
        return Object.values(response.data)

    }
    catch(ex)
    {
        return false
    }
    
}

export default getBackendOfferts