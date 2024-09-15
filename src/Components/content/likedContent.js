import React, { useContext, useEffect, useState } from "react";
import styles from './liked.module.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getBackendOfferts from "../backendofferts/backendofferts";
import Offert from "../offert/Offert";
import ServerNotResponding from "../errors/serverNotResponding";
import LoginContext from "../Context/logincontext";
import LoadingFrontImg from "../../assets/svg/loadingFrontimg";

function LikedContent()
{
    const [offers,setOffers] = useState([])
    const [downloadError,setDownloadError] = useState(false)
    const [noneOffers,setNoneOffers] = useState('')
    const userId = useParams().userId
    const context = useContext(LoginContext)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    const getLikedOffers = async()=>
    {

        try
        {
            const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${userId}.json`)
          
            if(response.data == null)
            {
                setNoneOffers('Nie masz żadnych polubionych ofert')
            }
            const offersIds = Object.values(response.data)
           
           
            const backend = await getBackendOfferts()
            let offersLocal = []
            offersIds.forEach(x=>{
                
                offersLocal.push(...backend.filter(y=>y.id == x.liked))
            })
            setOffers(offersLocal)
            setLoading(false)
        }
        catch(ex)
        {


            setDownloadError(true)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getLikedOffers()
       
    },[])

    useEffect(()=>{
        if(!context.value)
        {
            navigate('/')
        }
    },[context.value])


    useEffect(()=>{
        window.scrollTo(0,0)
        document.title = 'Polubione Oferty'
      },[])


    return(
        <article className={styles.container}>
             <h1>Polubione Oferty</h1>
            {loading?<LoadingFrontImg />:noneOffers?<ServerNotResponding img={true} message={noneOffers} />:
            downloadError?<ServerNotResponding img={true} message={'UPS... serwer nie odpowiada...'} />:
                <>
                    {offers.map((x,idx)=><Offert key={idx} {...x} />)}
                </>
            }
        </article>
    )
}
export default LikedContent