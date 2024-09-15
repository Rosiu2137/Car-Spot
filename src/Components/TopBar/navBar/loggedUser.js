import { useEffect, useState, useRef, useContext, useLayoutEffect } from "react"
import axios from "axios"
import styles from'./navBar.module.css'
import img1 from '../../../assets/img/avatar0000.png'
import toUpperCaseFirstLetter from "../../../assets/helpers/toUpperCaseFirsLetter"
import IconPerson from '../../../assets/svg/icon-person'
import IconHeart from '../../../assets/svg/icon-heart2'
import IconPlus from "../../../assets/svg/icon-plus"
import IconShutDown from "../../../assets/svg/icon-shutDown"
import IconProducts from "../../../assets/svg/icon-Products"
import { Link, useHref } from "react-router-dom"
import LoginContext from "../../Context/logincontext"
import { initializeApp } from "firebase/app";
import {ref,uploadBytes,getStorage, getDownloadURL} from "firebase/storage"
import React from "react"
import LoadingSmallIcon from "../../../assets/svg/loadingSmallIcon"
import LoadingNavBarIcon from "../../../assets/svg/loadingNavBarIcon"
const firebaseConfig = {
    apiKey: "AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M",
    authDomain: "car-spot-ebd4f.firebaseapp.com",
    databaseURL: "https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "car-spot-ebd4f",
    storageBucket: "car-spot-ebd4f.appspot.com",
    messagingSenderId: "713538680181",
    appId: "1:713538680181:web:e9a8e13258cf7e697c4f3c"
  };
  const app = initializeApp(firebaseConfig);
function LoggedUser(props)
{
    const [user,setUser] = useState(null)
    const [image,setImage] = useState()
    const [loading,setLoading] = useState(true)
    const context = useContext(LoginContext)
    const [displayMenu,setDisplayMenu] = useState(window.innerWidth > 950)

    const getUserData = async()=>
    {
       
        if(props.userData)
        {
            try{
                const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
                const arr = Object.values(response.data)
                const user = arr.find(x=>x.email == props.userData)
                setUser(user)
      
            }
            catch(ex)
            {
               
                setUser('')
                logout()
               
            }
        }
        
    }

    const getAvatar = async()=>
    {
       
        const storage = getStorage()
        const refFrontImage = ref(storage,`usersImg/${user.id}/avatar.jpg`)
        try
        {
            const response = await getDownloadURL(refFrontImage)
            setImage(response)
       
        }
        catch(ex)
        {
            const photourl = localStorage.getItem('photoURL')
            if(photourl)
            {
                try 
                { 
                    const response = await axios.get(JSON.parse(localStorage.getItem("photoURL")))
                    setImage(JSON.parse(localStorage.getItem('photoURL')))
                } 
                catch 
                {
                    setImage(img1) 
                } 
          
            }
            else
            {
                setImage(img1)
              
            }
        }
       
        
    }

    useEffect(()=>{

        if(user && image)
        {
  
            setLoading(false)
        }
    },[image,user])

    useEffect(()=>{
        if(user)
        {
            getAvatar()
        }
    },[user])

  

    useEffect(()=>{
        getUserData()
    },[props.userData])
    
    const logout = ()=>
    {
        context.changeValue(false)
        localStorage.removeItem('idToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('photoURL')
    }

    const nonDisplayHoverMenu = ()=>
    {
        if(window.innerWidth <= 950)
        {
           setDisplayMenu(false)
        }
        else
        {
           setDisplayMenu(true)
        }

    }

    window.addEventListener('resize',()=>{
       nonDisplayHoverMenu()
    })


    return(
        loading?<LoadingNavBarIcon />:
        <div className={styles.logged}>
           
            <Link to={`/profile/${user.id}`} className={styles.imgContainer}><img src={image}></img></Link>

            {displayMenu?<>
            <div className={styles.arrow}></div>

            <div className={styles.list}>
               
                    <img src={image}></img>
               
           
                    <h2>{user.name?`${toUpperCaseFirstLetter(user.name)} ${toUpperCaseFirstLetter(user.surname)}`:`Błąd`}</h2>
                    
             
                <div className={styles.line}></div>

                <Link to={`/profile/${user.id}`} className={styles.listOption}><IconPerson /> Profil</Link>
                <Link to={`/liked/${user.id}`} className={styles.listOption}><IconHeart /> Polubione</Link>
                <Link to={`/addoffer/${user.id}`} className={styles.listOption}><IconPlus /> Nowa Oferta</Link>
                <Link to={`/yourOffers/${user.id}`} className={styles.listOption}><IconProducts /> Twoje Oferty</Link>

                <div className={styles.line}></div>

                <button className={styles.listBtn} onClick={logout}><IconShutDown /> Wyloguj</button>
            </div>
            </>:null}
        </div>
    )
}

export default React.memo(LoggedUser)