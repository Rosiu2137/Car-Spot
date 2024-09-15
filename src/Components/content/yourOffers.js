import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toUpperCaseFirstLetter from "../../assets/helpers/toUpperCaseFirsLetter";
import Offert from "../offert/Offert";
import LoadingFrontImg from "../../assets/svg/loadingFrontimg";
import styles from './userOffers.module.css'
import ServerNotResponding from "../errors/serverNotResponding";
import LoginContext from "../Context/logincontext";
import IconDelete from "../../assets/svg/icon-delete";
import CheckBoxFilled from "../../assets/svg/checkBoxFilled";
import CheckBoxEmpty from "../../assets/svg/checkboxEmpty";
import { getStorage, ref, deleteObject } from "firebase/storage";
function YourContent()
{
    const param = useParams().userId
    const [userOffers,setUserOffers] = useState([])
    const [loading,setLoading] = useState(true)
    const[error,setError] = useState(false)
    const[message,setMessage] = useState('')
    const[displayConfirm,setDisplayConfirm] = useState(false)
    const [toDelete,setToDelete] = useState(null)
    const [deleting,setDeleting] = useState(false)
    const login = useContext(LoginContext)
    const navigate = useNavigate()


    const getUserOffers = async()=>
    {
        setError(false)
        try
        {
            const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json`)
            const arr = Object.values(response.data)
            const found = arr.filter(x=>x.userId === param)
            if(found.length == 0)
            {
                setLoading(false)
                setMessage('Nie masz jeszcze żadnych ofert')
            }
            else
            {
                setMessage('')
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
    },[])

    useEffect(()=>{
        if(!login.value)
        {
            navigate('/')
        }
    },[login])

    const promo = async(y)=>
    {
        setLoading(true)
        try
        {

            const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json')
            const data = Object.entries(response.data)
            const find = data.find(x=>x[1].id == y.id)
            find[1].primed = !find[1].primed
            const put = await axios.put(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts/${find[0]}.json`,find[1])
  
            getUserOffers()
        }
        catch(ex)
        {
            setError(true)

        }
    }

    const deleteImgs = async(off)=>
    {
        const storage = getStorage();
        const desertRef = ref(storage, `OffertImage/${off.id}/frontImage.jpg`);
        try
        {
            await deleteObject(desertRef)
        }
        catch(ex)
        {
           
        }
        for(let i =1;i<off.photos;i++)
        {
            
            const desertRef2 = ref(storage, `OffertImage/${off.id}/${i}.jpg`);
            try
            {
                await deleteObject(desertRef2)
            }
            catch(ex)
            {
               
            }
        }

        setDeleting(false)
    }

    const deleteOffers = async()=>
    {
        setDisplayConfirm(false)
        setDeleting(true)
        try
        {   
            const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json')
            const toDel = Object.entries(response.data).find(x=>x[1].id === toDelete)
            const deleting = await axios.delete(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts/${toDel[0]}.json`)
            deleteImgs(toDel[1])
            
            getUserOffers()
        }
        catch(ex)
        {
        
            setDeleting(false)
            setError(true)
        }
    }

    
    useEffect(()=>{
        window.scrollTo(0,0)
        document.title = 'Twoje Oferty'
      },[])

    return(
        deleting?<div className={styles.deleting}><div><LoadingFrontImg/><h2>Usuwanie Oferty...</h2></div></div>:
        <div className={styles.container}>
            {error?<div className={styles.loading}><ServerNotResponding img message={'UPS... Serwer nie odpowiada. Spróbuj ponownie później'} /></div>:<>
            {loading?<div className={styles.loading}><LoadingFrontImg/></div>:
            message?<div className={styles.loading}><ServerNotResponding img message={message}/></div>:
            <>
            <h1>Twoje Oferty</h1>
            {displayConfirm?<div className={styles.roger}><div className={styles.confirm} ><h1>Czy napewno chcesz usunąć tą ofertę?</h1><button className={styles.yes} onClick={deleteOffers}>Tak</button><button className={styles.cancel} onClick={()=>{setToDelete(null);setDisplayConfirm(false)}}>Anuluj</button></div></div>:null}
            {userOffers.map((x,idx)=><article key={idx} className={styles.offerContainer}><Offert {...x} /><div className={styles.delete} onClick={()=>{setToDelete(x.id);setDisplayConfirm(true)}}><IconDelete/></div><div className={styles.promotion} onClick={e=>promo(x)}>{x.primed?<CheckBoxFilled />:<CheckBoxEmpty />}Promuj Ofertę</div></article>)}
            </>}</>}
        </div>
    )
}

export default YourContent