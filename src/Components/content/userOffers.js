import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './userOffers.module.css'
import toUpperCaseFirstLetter from "../../assets/helpers/toUpperCaseFirsLetter";
import Offert from "../offert/Offert";
import LoadingFrontImg from "../../assets/svg/loadingFrontimg";
import sortPrimed from "../sorts/sortPrimed";
import ServerNotResponding from "../errors/serverNotResponding";

function UserOffers()
{
    const param = useParams().userId
    const [userOffers,setUserOffers] = useState([])
    const [loading,setLoading] = useState(true)
    const[error,setError] = useState(false)
    const[user,setUser]=useState({})

    const getUserOffers = async()=>
    {
        setError(false)
        try
        {
            const response1 = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            const user = Object.values(response1.data).find(x=>x.id === param)
            if(!user)
            {
                throw new Error()
            }
            setUser(user)
            const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json`)
            const arr = Object.values(response.data)
            const found = arr.filter(x=>x.userId === param)
            sortPrimed(found)
            
            if(found.length == 0)
            {
                setLoading(false)
                setError(true)
            }
            else
            {
                
                setUserOffers(found)
                setLoading(false)
            }
        }
        catch(ex)
        {

            setError(true)
        }
    }

    useEffect(()=>{
        getUserOffers()
        window.scrollTo(0,0)
    },[])

    useEffect(()=>{
        const a = user.name?`${toUpperCaseFirstLetter(user.name)} ${toUpperCaseFirstLetter(user.surname)}`:'błąd'
        document.title = `Oferty użytkownika - ${a}`
    },[user])
    
    return(
        <article className={styles.container}>
            {error?<div className={styles.loading}><ServerNotResponding img message={'UPS... Serwer nie odpowiada. Spróbuj ponownie później'} /></div>:<>
            {loading?<div className={styles.loading}><LoadingFrontImg/></div>:<>
            <h1>Oferty Użytkownika <br></br>{toUpperCaseFirstLetter(user.name)} {toUpperCaseFirstLetter(user.surname)}</h1>

            {userOffers.map((x,idx)=><Offert {...x} key={idx}/>)}
            </>}</>}
        </article>
    )
}

export default UserOffers