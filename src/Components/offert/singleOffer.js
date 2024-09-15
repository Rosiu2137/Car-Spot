import React, { useContext, useEffect, useRef, useState } from "react"
import { useParams,Link} from "react-router-dom"
import getBackendOfferts from "../backendofferts/backendofferts"
import styles from './singleOffer.module.css'
import LoadingFrontImg from '../../assets/svg/loadingFrontimg'
import IconCalender from "../../assets/svg/icon-calender"
import IconGearBox from "../../assets/svg/icon-gearBox"
import IconFuel from "../../assets/svg/icon-fuel"
import IconHighway from "../../assets/svg/icon-highway"
import IconPerson from "../../assets/svg/icon-person"
import IconLoaction from "../../assets/svg/icon-location"
import IconPhone from '../../assets/svg/icon-phone'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import IconServerError from "../../assets/svg/icon-serverError"
import Loupe from "../../assets/svg/icon-loupe"
import LoadingSmallIcon from "../../assets/svg/loadingSmallIcon"
import IconNextPage from "../../assets/svg/Icon-nextPage"
import IconCancel from "../../assets/svg/icon-cancel"
import errorImg from '../../assets/img/browser0000.png'
import setPrice from "../../assets/helpers/addBlinkInPrices"
import IconPhoneMax from '../../assets/svg/icon-phoneMax'
import IconMail from "../../assets/svg/Icon-Mail"
import IconHeart from "../../assets/svg/icon-heart"
import IconHeart2 from "../../assets/svg/icon-heart2"
import IconHeartRed from "../../assets/svg/icon-heartRed"
import LoginContext from "../Context/logincontext"
import axios from "axios"
import toUpperCaseFirstLetter from "../../assets/helpers/toUpperCaseFirsLetter"
import ServerNotResponding from "../errors/serverNotResponding"

function SingleOffer()
{
    const offerId = useParams().id
    const [offer,setOffer] = useState(null)
    const [pageLoading,setPageLoading] = useState(true)
    const [imageLoading,setImageLoading] = useState(true)
    const [frontImg,setFrontImg] = useState('')
    const [frontImageError,setFrontImageError] = useState(false)
    const [imgs,setImgs] = useState([])
    const[imagesLoading,setImagesLoading] = useState(true)
    const [frontDisplayImage,setFrontDisplayImage] = useState('')
    const [displayMaxPhoto,setDisplayMaxPhoto] = useState(false)
    const [displayed,setDisplayed] = useState(false)
    const [imgZoom,setImgZoom] = useState(1)
    const [errors,setErrors] = useState([])
    const [suggestedOffers,setSuggestedOffers] = useState({})
    const [liked,setLiked] = useState(false)
    const [message,setMessage] = useState(false)
    const [user,setUser] = useState({
        name:'-',
        surname:'-',
        city:'-',
        dealer:'-',
        email:'-',
        id:'-',
        phone:'-',
        registerDate:'-'
    })
    const[mainError,setMainError] = useState(false)
    const [userOffers,setUserOffers] = useState(0)

    const messageRef = useRef(null)
    const backPage = useRef(null)
    const forwardPage = useRef(null)
    const maxImgRef = useRef(null)
    const maxBackRef = useRef(null)
    const maxForwardRef = useRef(null)
    const login = useContext(LoginContext)
    const [showBar,setShowBar] = useState(false)

    let moveX = 0 
    let moveY = 0

    

    const storage = getStorage();

    const BackendOffers = async()=>
    {
        setMainError(false)
        try
        {
            const backed = await getBackendOfferts()
            const offer = (backed.find(x=>{
                 return x.id === offerId
             }))
             setOffer(offer)
             getFrontImages(offer.id)
             setMainError(false)
           
        }
        catch(ex)
        {
            setMainError(true)
        }
        
    }


    const getAllImages = async(id)=>
    {
        const images = []
        images.push(!frontImageError?frontImg:errorImg)                
        for(let i =1;i<=+offer.photos-1;i++)
        {
            try
            {
                const imgURL = await getDownloadURL(ref(storage,`OffertImage/${id}/${i}.jpg`))
                images.push(imgURL)
            }
            catch(ex)
            {
                images.push(errorImg)
            }
        }
        setImgs(images)
        setImagesLoading(false)
    }

    const getFrontImages = async(id)=>
    {
        try
        {
            const imgURL = await getDownloadURL(ref(storage,`OffertImage/${id}/frontImage.jpg`))
            setFrontImg(imgURL)
            setImageLoading(false)
            setFrontImageError(false)
            setFrontDisplayImage(imgURL)
        }
        catch(ex)
        {
            
            setImageLoading(false)
            setFrontImageError(true)
        }
        setPageLoading(false)
    }

    const setFrontImageAfterClick = (e)=>
    {
        if(maxImgRef.current)
        {
            maxImgRef.current.style.transform = `scale(1)` 
            setImgZoom(1)
            maxImgRef.current.style.translate = `0px 0px`
           
        }

        backPage.current.classList.remove('pagesDisabled')
        forwardPage.current.classList.remove('pagesDisabled')
        if(maxBackRef.current && maxForwardRef.current)
        {
            maxBackRef.current.classList.remove('pagesDisabled')
            maxForwardRef.current.classList.remove('pagesDisabled')
        }
       const elements = document.querySelectorAll('#imgs')
       elements.forEach(x=>x.classList.remove('en'))
       e.target.closest('div').classList.add('en')
        setFrontDisplayImage(e.target.src)
        const idx = e.target.src
        const element = e.target.id
        if(+element === 0)
        {
            backPage.current.classList.add('pagesDisabled')
            if(maxBackRef.current)
            {
                maxBackRef.current.classList.add('pagesDisabled')
            }
        }
    
        if(+element == +offer.photos-1)
        {

            
            setErrors([+offer.photos])
            forwardPage.current.classList.add('pagesDisabled')
            if(maxForwardRef.current)
            {
                maxForwardRef.current.classList.add('pagesDisabled')
            }
            
           
        }
    }

    const changeImage = (method,target)=>
    {
        if(!target.classList.contains('pagesDisabled'))
        {
            
            backPage.current.classList.remove('pagesDisabled')
            forwardPage.current.classList.remove('pagesDisabled')
            if(maxBackRef.current && maxForwardRef.current)
            {
                maxBackRef.current.classList.remove('pagesDisabled')
                maxForwardRef.current.classList.remove('pagesDisabled')
               setImgZoom(1)
                moveX = 0
                moveY = 0
                maxImgRef.current.style.transform = `scale(1)`
                maxImgRef.current.style.translate = "0px 0px"

            }
            const displaying = frontDisplayImage
            const arr = [...imgs]
            
            let idx = arr.findIndex(x=>x==displaying)
          
            
            method == 'back'?idx--:idx++
           
            if(arr[idx] == errorImg)
            {
               
                setErrors([idx])
            }
            else
            {
               
                setErrors([])
            }
  
            if(errors[0])
            {
               
                if(method == 'back')
                {
                 
                    idx=errors[0]-1
                  
                }
                else
                {
                 
                    idx=errors[0]+1
                }
               
                   
                
                
            }
          
      
            setFrontDisplayImage(arr[idx])
            
            if(idx == 0)
            {
               
                backPage.current.classList.add('pagesDisabled')
                if(maxBackRef.current)
                {
                    maxBackRef.current.classList.add('pagesDisabled')
                }
            }
            if(idx== imgs.lastIndexOf(imgs.at(-1)))
            {
                
                    
                    forwardPage.current.classList.add('pagesDisabled')
                    if(maxForwardRef.current)
                    {
                        maxForwardRef.current.classList.add('pagesDisabled')
                    }
                
                
            }
        }
        
    }

    const maxPhoto = ()=>
    {
        setDisplayMaxPhoto(true)
        setDisplayed(true)
    }

    const mousemoveEvent = (e)=>
    {
        
        if(!(maxImgRef.current.style.transform == "scale(1)") && maxImgRef.current.style.transform)
        {
      
            moveX += (e.movementX)
            moveY += (e.movementY)
            maxImgRef.current.style.translate = `${moveX}px ${moveY}px`
        }
        else
        {
            
            moveX = 0
            moveY = 0
            maxImgRef.current.style.translate = "0px 0px"
            
        }
        
        
       
    }
    
    const wheelEvent = (e)=>{
    
    window.scroll(0,0)
    if(e.deltaY <0)
    {
       
        if(imgZoom <5)
        {
            const zoom = imgZoom + 1
            maxImgRef.current.style.transform = `scale(${zoom})`
            setImgZoom(zoom)
            
        }
        
       
    }
    else
    {
       
        if(imgZoom >=2)
        {
            const zoom = imgZoom - 1
            maxImgRef.current.style.transform = `scale(${zoom})`
            setImgZoom(zoom)
        }
        if(imgZoom == 2)
        {
            moveX = 0
            moveY = 0
            maxImgRef.current.style.translate = "0px 0px"
        }
        
       
    }
    }

    const checkEnabled = ()=>
   {

        const arr = [...document.querySelectorAll("#imgs")]
        if(arr.length >0)
        {
          
            arr.forEach(x=>x.classList.remove('en'))
            const link = frontDisplayImage
    
            const found = arr.find(x=>x.firstElementChild.src == link)
            if(found)                                                       
            {
                found.classList.add('en')

            }
        }
       
   }

   const getAllBackendOffers = async()=>
   {
        const localOffers = await getBackendOfferts()
        const filtered = localOffers.filter(x=>x.primed == true)

        if(filtered.length > 5)
        {
            const drawn = []
            const off = []
            for(let i =0;i<5;i++)
            {
                const a = Math.floor(Math.random()*100)
                if(a>=filtered.length)
                {
                    i--
                    continue
                }
                else
                {
                    if(drawn.includes(a))
                    {
                        i--
                        continue
                    }
                    else if(filtered[a].id == offer.id)
                    {
                        i--
                        continue
                    }
                    else
                    {
                        drawn.push(a)
                        
                        off.push(filtered[a])
                        try
                        {
                            const imgURL = await getDownloadURL(ref(storage,`OffertImage/${filtered[a].id}/frontImage.jpg`))
                            
                            
                            filtered[a].img = imgURL
                        }
                        catch(ex)
                        {
                           
                            filtered[a].img = errorImg
                        }
                    }
    
                }
                
    
    
                
            }
            setSuggestedOffers(off)
        }
        else
        {
            setSuggestedOffers({})

        }
    }

   useEffect(()=>{
        checkEnabled()
   },[frontDisplayImage])

   useEffect(()=>{
    if(frontImageError)
    {
        setFrontDisplayImage(errorImg)
    }
   },[frontImageError])

    useEffect(()=>{
        if(imgs.length >1)
        {
            forwardPage.current.classList.remove('pagesDisabled')
        }
        const a = document.querySelectorAll('#imgs')[0]
        if(a)
        {
            a.classList.add('en')
        }
        
    },[imgs])

    useEffect(()=>{
        if(displayed)
        {
            checkEnabled()
        }
    },[displayMaxPhoto])

    useEffect(()=>{
        if(displayMaxPhoto)
        {   
            if(imgs.length >1)
            {
                if(imgs.indexOf(frontDisplayImage) == 0)
                {
                    maxBackRef.current.classList.add('pagesDisabled')
                    maxForwardRef.current.classList.remove('pagesDisabled')
                }
                else if((imgs.find(x=>x==frontDisplayImage)) == (imgs.at(-1)))
                {
                    
                    maxForwardRef.current.classList.add('pagesDisabled')
                    maxBackRef.current.classList.remove('pagesDisabled')
                }
                else
                {
                    maxForwardRef.current.classList.remove('pagesDisabled')
                    maxBackRef.current.classList.remove('pagesDisabled')
                }
            }
            
            
        }
    },[displayMaxPhoto])

    useEffect(()=>{
       BackendOffers()
       
       window.scroll(0,0)
    },[offerId])

    useEffect(()=>{
        if(offer)
        {
            getAllBackendOffers()
        }
    },[offer])

    useEffect(()=>{
        if(offer && (frontImg || frontImageError))
        {
            getAllImages(offer.id)
        }
    },[offer,frontImg,frontImageError])
    
    const getLikedOffer = async()=>
    {    
        
         const uId = JSON.parse(localStorage.getItem('userId'))
         try{
             const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}.json`)
                
             const obj = Object.values(response.data)
           
             obj.forEach(x=>{
                 if(x.liked == offer.id)
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

    const like = async()=>{
        const uId = JSON.parse(localStorage.getItem('userId'))
        if(uId)
        {
            try
            {
                const response = await axios.post(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}.json`,{
                    liked:offer.id
                })
               setLiked(true)
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

    const dislike = async()=>{
        const uId = JSON.parse(localStorage.getItem('userId'))
        if(uId)
        {
           try
           {
                const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}.json`)
                const obj = Object.entries(response.data)
                const found = obj.find(x=>x[1].liked == offer.id)[0]
                const res = await axios.delete(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/liked/${uId}/${found}.json`)
                setLiked(false)
            }
           catch(ex)
           {
                setLiked(true)
           }
        }
    }

    const changeHeart = ()=>
    {
        if(!liked)
        {
            like()
        }
        else
        {
            dislike()
        }

        
    }

    useEffect(()=>{
        if(offer)
        {
            getLikedOffer()

        }
    },[offer])

    useEffect(()=>{
        if(!login.value)
        {
            setLiked(false)
        }
        else
        {
            if(offer)
            {
                getLikedOffer()

            }
        }
    },[login.value])

    useEffect(()=>{
        if(message)
        {
            setTimeout(() => {
                if(messageRef.current)
                {
                    messageRef.current.style.opacity = 0

                }
            }, 2500);
            setTimeout(() => {
                setMessage(false)
            }, 3000);
        }
       },[message])

    const findUserOffers = async(info)=>
    {
        try
        {
            const backed = await getBackendOfferts()
            const userOffers = backed.filter(x=>x.userId == info.id)
            setUserOffers(userOffers.length)
        }
        catch(ex)
        {
            setUserOffers(0)
        }
    }

    const getUserInfo = async()=>
    {
         
        try
        {
            const response =await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            const users = Object.values(response.data)
            const user = users.find(x=>x.id == offer.userId)
            if(user)
            {
                setUser(user)
                findUserOffers(user)
            }
            else
            {
                setMainError(true)
            }
        }
        catch(ex)
        {
            setMainError(true)
        }
    }

    useEffect(()=>{
       
        if(offer)
        {
            getUserInfo()

        }
    },[offer])

    useEffect(()=>{
        const name = offer?offer.name:"Błąd"
        document.title = `Oferta - ${toUpperCaseFirstLetter(name)}`
      },[offer])

      const barRef = useRef(null)
    
    useEffect(()=>{

        const latestOffers = JSON.parse(localStorage.getItem('latest'))

        if(latestOffers)
        {
            if(!latestOffers.includes(offerId))
            {
                latestOffers.unshift(offerId)
                latestOffers.splice(5,1)
                localStorage.setItem('latest',JSON.stringify(latestOffers))
            }
            else
            {
                latestOffers.splice(latestOffers.indexOf(offerId),1)
                latestOffers.unshift(offerId)
                localStorage.setItem('latest',JSON.stringify(latestOffers))
            }
            
            
        }
        else
        {
            localStorage.setItem('latest',JSON.stringify([offerId]))
        }
    },[offerId])

    useEffect(()=>{
      
      window.addEventListener('scroll',(e)=>{
        const navbar = document.querySelector("#navbar")
        const showPoint = document.querySelector('#imgArea')
        const point = showPoint?showPoint.offsetTop + showPoint.clientHeight:null
        if(point &&barRef.current)
        {
            if(window.scrollY > point)
            {
                barRef.current.style.height = `${navbar.clientHeight}px`
                barRef.current.style.translate = `0px 100%`
                barRef.current.style.opacity = 1
            }
            else
            {
                barRef.current.style.height = `${navbar.clientHeight}px`
                barRef.current.style.translate = `0px 0%`
                barRef.current.style.opacity = 0
            }
        }
        
      })
    },[])

    const descriptionRef = useRef(null)

     const hoverImg = useRef(null)


     const mouseOverOnPhoto = ()=>
     {
        if(hoverImg.current)
        {
            if(window.innerWidth > 950)
            {
                hoverImg.current.style.opacity = `1`

            }
        }
     }

     const onMouseOutPhoto = ()=>
     {
        if(hoverImg.current)
        {
            hoverImg.current.style.opacity = `0`
        }
     }

    return(
        mainError?<div className={styles.mainError}><ServerNotResponding img message={"UPS... Serwer nie odpowiada. Spróbuj ponownie później"} /></div>:
        <article className={styles.container}>
           
            {displayMaxPhoto?<div className={styles.maxPhoto}><div className={styles.goBack} onClick={e=>setDisplayMaxPhoto(false)}><IconCancel /></div><div className={styles.fullImgContainer} >
                <div className={`${styles.backImg} pagesDisabled`} ref={maxBackRef} onClick={e=>changeImage('back',e.target.closest('div')) }><IconNextPage /></div>
                <img src={frontDisplayImage} ref={maxImgRef} onWheel={wheelEvent} onMouseMove={mousemoveEvent}></img>
            <div className={`${styles.frontImg} pagesDisabled`} ref={maxForwardRef} onClick={e=>changeImage('forward',e.target.closest('div'))}><IconNextPage /></div>
            </div>
            <div className={styles.bottomMenu2}>
                {imgs.map((x,idx)=><div className={styles.BottomMenuItem2} key={idx} id="imgs">
                    {x?<img id={idx} src={x} onClick={setFrontImageAfterClick}></img>:<IconServerError />}
                </div>)}
            </div>
            </div>:null}

            {pageLoading?<LoadingFrontImg />:
            <>
             <div className={styles.fixedBar} ref={barRef}><span>{toUpperCaseFirstLetter(offer.name)}</span><span>{setPrice(offer.price)} zł</span></div>
                <div className={styles.imgArea} id="imgArea">
                    <div className={styles.innerImgArea}>
                        {imageLoading?<LoadingFrontImg />:<div className={styles.innerImg} onMouseOver={mouseOverOnPhoto} onMouseOut={onMouseOutPhoto} onClick={window.innerWidth > 950 ? maxPhoto:null}><img src={frontDisplayImage} />{frontImageError?null:<div ref={hoverImg} className={styles.hoverImgEffect}><Loupe /></div>}</div>}
                    </div>

                    <div className={styles.bottomMenu}>
                        {imagesLoading?null:<div className={`${styles.nextPage} ${styles.rotated} pagesDisabled`} ref={backPage} onClick={e=>changeImage('back',e.target.closest('div')) }><IconNextPage /></div>}
                        <div className={styles.imagesContainer}>
                        {imagesLoading?<LoadingSmallIcon />:imgs.map((x,idx)=><div className={styles.BottomMenuItem} key={idx} id="imgs">
                            <img id={idx} src={x?x:errorImg}  onClick={setFrontImageAfterClick}></img>
                        </div>)}
                        </div>
                        {imagesLoading?null:<div className={`${styles.nextPage} pagesDisabled`} ref={forwardPage} onClick={e=>changeImage('forward',e.target.closest('div'))}><IconNextPage /></div>}
                    </div>
                    
                </div>

                <div className={styles.lineBreak}></div>

                <div className={styles.shortDescription}>
                    <h1>{offer?toUpperCaseFirstLetter(offer.name):''}</h1>
  
                    <div className={styles.heart} onClick={changeHeart}>{liked?<IconHeartRed />:<IconHeart/>}</div>
                    {message?<div className={styles.message} ref={messageRef}>Ta opcja jest dostępna tylko dla zalogowanych użytkowników</div>:null}
                    <div>
                        
                        <div className={styles.item}><IconHighway /> Przebieg: <span>{offer?`${setPrice(offer.distance)} km`:''}</span></div>
                        <div className={styles.item}><IconFuel /> Napęd: <span>{offer?`${offer.engine}`:''}</span></div>
                        <div className={styles.item}><IconGearBox />Skrzynia biegów: <span>{offer?`${offer.gearbox}`:''}</span></div>
                        <div className={styles.item}><IconCalender /> Rok produkcji: <span>{offer?`${offer.year}`:''}</span></div>
                        <div className={styles.item}><IconPerson /> Sprzedawca: <span>{user?`${user.dealer}`:''}</span></div>
                        <div className={styles.item}><IconLoaction /> Miejscowość: <span>{user?`${toUpperCaseFirstLetter(user.city)}`:''}</span></div>

                        <div className={`${styles.price} ${styles.phoneNumber}`}><span><IconPhone />{setPrice(user.phone)}</span></div>
                        <div className={styles.price}>{offer?`${setPrice(offer.price)} zł`:''}</div> 
                    </div>

                </div>

                <div className={styles.horizontalBreak}></div>

                <div className={styles.longDescription}>

                    <h1>Opis</h1>

                    <div className={styles.description} ref={descriptionRef}>
                    {offer.description}
                    

                    </div>

                    <h1>Pełna specyfikacja</h1>

                    <div className={styles.grid}>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Marka:</div>
                            <div className={styles.gridValue}>{offer.brand}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Model:</div>
                            <div className={styles.gridValue}>{toUpperCaseFirstLetter(offer.model)}</div> 
                        </div>

                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Rok Produkcji:</div>
                            <div className={styles.gridValue}>{offer.year}</div>
                        </div>
                        
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Przebieg:</div>
                            <div className={styles.gridValue}>{`${setPrice(offer.distance)} km`}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Silnik:</div>
                            <div className={styles.gridValue}>{offer.engine}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Pojemność silnika:</div>
                            <div className={styles.gridValue}>{`${offer.capacity} cm`}<sup>3</sup></div> 
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Moc:</div>
                            <div className={styles.gridValue}>{`${offer.power} KM`}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Moment Obrotowy:</div>
                            <div className={styles.gridValue}>{`${offer.torque} Nm`}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Skrzynia Biegów:</div>
                            <div className={styles.gridValue}>{offer.gearbox}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Liczba Biegów:</div>
                            <div className={styles.gridValue}>{offer.gears}</div> 
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Spalanie:</div>
                            <div className={styles.gridValue}>{`${offer.combustion} L/100km`}</div> 
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Liczba drzwi:</div>
                            <div className={styles.gridValue}>{offer.doors}</div> 
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Liczba miejsc:</div>
                            <div className={styles.gridValue}>{offer.seats}</div> 
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Masa własna:</div>
                            <div className={styles.gridValue}>{`${offer.weight} kg`}</div>
                        </div>
                        <div className={styles.gridOption}>
                            <div className={styles.gridName}>Kolor:</div>
                            <div className={styles.gridValue}>{toUpperCaseFirstLetter(offer.color)}</div> 
                        </div>
                    </div>

                    

                    <div className={styles.secondPrice}>
                        <div className={styles.innerPrice}>{`${setPrice(offer.price)} zł`}</div>
                       
                    </div>

                    <div className={styles.horizontalBreak}></div>

                    <h1>Informacje o sprzedającym</h1>

                   
                    <div className={styles.info}>
                        <div className={`${styles.infoColumn} ${styles.col1}`}>
                            <h1>Dane osobowe</h1>
                            <div className={styles.infoItem}><IconPerson /> {`${toUpperCaseFirstLetter(user.name)} ${toUpperCaseFirstLetter(user.surname)}`}</div>
                            <div className={styles.infoItem}><IconPerson /> {toUpperCaseFirstLetter(user.dealer)}</div>
                            <div className={styles.infoItem}><IconCalender/> Zarejestrowany od {user.registerDate} roku</div>
                            <div className={styles.infoItem}><IconLoaction /> {toUpperCaseFirstLetter(user.city)}</div>
                        </div>
                        <div className={`${styles.infoColumn} ${styles.col2}`}>
                            <h1>Kontakt</h1>
                            <div className={`${styles.infoItem} ${styles.specialColumn}`}><IconPhone /> {setPrice(user.phone)}</div>
                            <div className={`${styles.infoItem} ${styles.specialColumn}`}><IconMail /> {user.email}</div>

                        </div>
                    </div>
                     {userOffers?   
                    <Link to={`/userOffers/${user.id}`} className={styles.userOffers}>{`Zobacz wszystkie ofery Sprzedawcy [${userOffers}]`}</Link>:null}

                    <div className={styles.horizontalBreak}></div>
                    

                    {suggestedOffers[0]?<>
                    <h1>Polecane Oferty</h1>
                    <div className={styles.suggestedOffers}>
                        {suggestedOffers.map((x,idx)=><Link to={`/offers/${x.id}`} key={idx} className={styles.suggestedOffersItem}>
                            <img src={x.img}></img>
                            <h1>{x.name}</h1>
                            <div className={styles.suggestedOffersPrice}>{`${setPrice(x.price)} zł`}</div>
                        </Link>)}
                    </div></>
                    :null}

                </div>
            </>}

        </article>
    )
}

//jezeli sie nie zaladuje oferta i info o uzytowniku to wywal blad kluczowy ktory uniemozliwia podglad czegokolwiek

export default SingleOffer