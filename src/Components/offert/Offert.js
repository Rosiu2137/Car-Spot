import React, { useContext, useEffect, useRef, useState } from "react"
import styles from './Offert.module.css'
import IconCalender from "../../assets/svg/icon-calender"
import IconFuel from "../../assets/svg/icon-fuel"
import IconGearBox from "../../assets/svg/icon-gearBox"
import IconHighway from "../../assets/svg/icon-highway"
import IconHeart from "../../assets/svg/icon-heart"
import IconLoaction from "../../assets/svg/icon-location"
import IconPerson from "../../assets/svg/icon-person"
import {ref,uploadBytes,getStorage, getDownloadURL} from "firebase/storage"
import { initializeApp } from "firebase/app";
import LoadingFrontImg from "../../assets/svg/loadingFrontimg"
import ServerNotResponding from "../errors/serverNotResponding"
import { Link, useHref } from "react-router-dom"
import setPrice from "../../assets/helpers/addBlinkInPrices"
import IconHeartRed from "../../assets/svg/icon-heartRed"
import axios from "axios"
import LoginContext from "../Context/logincontext"
import toUpperCaseFirstLetter from "../../assets/helpers/toUpperCaseFirsLetter"

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

function Offert(props)
{
    const storage = getStorage()

    const refFrontImage = ref(storage,`OffertImage/${props.id}/frontImage.jpg`)
    const context = useContext(LoginContext)
    const [loadingImg, setloadingImg] = useState(true) 
    const [imgurl,setimgurl] = useState(null)
    const [loadingerror,setloadingerror] = useState(false)
    const [liked,setLiked] = useState(false)
    const [message,setMessage] = useState(false)
    const[displayLiked,setDisplayLiked] = useState(true)
    const [displayPrimed,setDisplayPrimed] = useState(true)
    const url = useHref()

    const messageRef= useRef(null)
    const downloadImage = async()=>
    {
        try{

            const response = await getDownloadURL(refFrontImage)
            setimgurl(response)
            
           
        }
        catch(ex)
        {
            
            setloadingerror(true)
        }
        setloadingImg(false)
    }
    useEffect(()=>{
        downloadImage()
    },[])

    const like = async()=>
    {
        const uId = JSON.parse(localStorage.getItem('userId'))
        if(context.value)
        {
            try
            {
                const response = await axios.post(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}.json`,{
                    liked:props.id
                })
               
            }
            catch(ex)
            {
               
                setLiked(false)
            }
        }
        else
        {
            setMessage(true)
            setLiked(false)
        }
    }

    const dislike = async()=>
    {
        const uId = JSON.parse(localStorage.getItem('userId'))
        if(uId)
        {
           try{
                const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}.json`)
                const obj = Object.entries(response.data)
                const found = obj.find(x=>x[1].liked == props.id)[0]
                const res = await axios.delete(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}/${found}.json`)
                
           }
           catch(ex)
           {
                setLiked(true)
           }
        }
    }

   const addToFavoriteHandler =(e)=>
   {
        e.preventDefault()
        if(liked)
        {
            setLiked(false)
            dislike()
        }
        else
        {
            setLiked(true)
            like()
        }
    }

   const getLikedOffer = async()=>
   {    
        const uId = JSON.parse(localStorage.getItem('userId'))
        try{
            const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}.json`)
           
            const obj = Object.values(response.data)
            obj.forEach(x=>{
                if(x.liked == props.id)
                {
                    setLiked(true)
                }
            })
            
        }
        catch(ex)
        {

            setLiked(false)
        }
     
   }

   useEffect(()=>{
    if(message)
    {
        setTimeout(() => {
            messageRef.current.style.opacity = 0
        }, 2500);
        setTimeout(() => {

            setMessage(false)
        }, 3000);
    }
   },[message])

    useEffect(()=>{
        if(!context.value)
        {
            setLiked(false)
        }
        else
        {
            getLikedOffer()
        }
        
   },[context.value])

   const [location,setLocation] = useState('-')
   const [person,setPerson] = useState('-')

   const getUserInfo = async()=>
   {
        const userId = props.userId
        try
        {
            const response =await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            const users = Object.values(response.data)
            const user = users.find(x=>x.id == props.userId)

            setLocation(user.city)
            setPerson(user.dealer)
        }
        catch(ex)
        {
            setLocation("-")
            setPerson("-")

        }
   }

   const [responsive,setResponsive] = useState(false)

   const resize = ()=>{
        if(window.innerWidth > 950)
        {
            setResponsive(false)
        }
        else
        {
            setResponsive(true)
        }
   }

   useEffect(()=>{
        resize()
        window.addEventListener('resize',resize)
       getUserInfo()
        if(url.includes(`yourOffers`))
        {
            setDisplayLiked(false)
            setDisplayPrimed(false)
        }
        return()=>
        {
            window.removeEventListener('resize',resize)
        }
   },[])

    return(
        <Link to={`/offers/${props.id}`} className={styles.singleOffert}>
            <div className={styles.imageCon}>
                {loadingImg?(<LoadingFrontImg />):(!loadingerror?<img src={imgurl} />:<ServerNotResponding img={true} />)}
                {responsive && displayLiked?<div className={styles.addToFavourite} onClick={addToFavoriteHandler}>{liked?<IconHeartRed />:<IconHeart />}</div>:null}
                {responsive && message?<div className={styles.logInfo} ref={messageRef}>Ta opcja dostępna jest tylko dla zalogowanych użytkowników</div>:null}
            </div>
            <div className={styles.linebreak}></div>
            <div className={styles.content}>
            
                <h1 className={styles.title}>
                    {toUpperCaseFirstLetter(props.name)}

                    {responsive && displayPrimed?props.primed?<div className={styles.primedCon}><div className={styles.primed}>Wyróżnione</div></div>:null:null}
                {!responsive && displayLiked?<div className={styles.addToFavourite} onClick={addToFavoriteHandler}>{liked?<IconHeartRed />:<IconHeart />}</div>:null}
                {!responsive && message?<div className={styles.logInfo} ref={messageRef}>Ta opcja dostępna jest tylko dla zalogowanych użytkowników</div>:null}
                </h1>
                
                <div className={styles.shortInfo}>
                    <div className={styles.shortinfoitems}>
                        <div className={styles.shortinfoitem}>
                            <IconHighway />
                           {`${setPrice(props.distance)} km`}
                        </div>
                        <div className={styles.shortinfoitem}>
                            <IconFuel />
                            {props.engine}
                        </div>
                        <div className={styles.shortinfoitem}>
                            <IconGearBox />
                            {props.gearbox}
                        </div>
                        <div className={styles.shortinfoitem}>
                            <IconCalender />
                            {props.year}
                        </div>
                    </div>
                        {!responsive && displayPrimed?props.primed?<div className={styles.primed}>Wyróżnione</div>:null:null}
                </div>
                <div className={styles.bottomdiv}>
                    <div className={styles.leftdiv}>
                        <div className={styles.location}><IconLoaction /> {toUpperCaseFirstLetter(location)}</div>
                        <div className={styles.seller}><IconPerson /> {person}</div>
                    </div>
                    <div className={styles.rightdiv}>
                        {setPrice(props.price)} PLN
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default React.memo(Offert)