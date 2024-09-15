import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
import styles from './profile.module.css'
import img1 from '../../assets/img/avatar0000.png'
import toUpperCaseFirstLetter from "../../assets/helpers/toUpperCaseFirsLetter";
import IconCamera from "../../assets/svg/icon-camera";
import { json, useNavigate, useParams } from "react-router-dom";
import LoginContext from "../Context/logincontext";
import axios from "axios";
import setPrice from "../../assets/helpers/addBlinkInPrices";
import LoadingFrontImg from "../../assets/svg/loadingFrontimg";
import { initializeApp } from "firebase/app";
import {ref,uploadBytes,getStorage, getDownloadURL, deleteObject} from "firebase/storage"
import LoadingSmallIcon from "../../assets/svg/loadingSmallIcon";
import { Link } from "react-router-dom";
import IconHeart from "../../assets/svg/icon-heart";
import IconProducts from "../../assets/svg/icon-Products";
import IconPlus from "../../assets/svg/icon-plus";
import IconOK from "../../assets/svg/icon-OK";
import removeWhiteSymbolsFromPhone from "../../assets/helpers/removeWhiteSymbolsFromPhone";
import IconShutDown from "../../assets/svg/icon-shutDown";

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

function Profile()
{

    const [userInfo,setUserInfo] = useState({})
    const [pernametUserInfo,setPernamentUserInfo] = useState({})
    const [loading,setLoading] = useState(true)
    const [imageLoading,setImageLoading] = useState(true)
    const [image,setImage] = useState('') 
    const [sending,setSending] = useState(false)
    const [done,setDone] = useState(false)
    const [serverError,setServerError] = useState(false)
    const [serverImageError,setServerImageError] = useState(false)
    const [errors,setErrors] = useState({
        phone:'',
        name:'',
        surname:'',
        city:'',
    })
    const [deleteRoger,setDeleteRoger] = useState(false)
    const [deleting,setDeleting] = useState(false)
    const selectionRef = useRef(null)
    const param = useParams()
    const navigate = useNavigate()
    const login = useContext(LoginContext)
    const phoneRef = useRef(null)
    const inputRef = useRef(null)

    const getUserInfo=async()=>
    {
        try
        {   
            const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
            const obj = Object.values(response.data)
            const user = obj.filter(x=>x.id == param.userId)
            setUserInfo(...user)
            setPernamentUserInfo(...user)
            setLoading(false)
        }
        catch(ex)
        {

            setLoading(false)
        }
    }

    const getAvatar = async()=>
    {
        const storage = getStorage()
        const refFrontImage = ref(storage,`usersImg/${param.userId}/avatar.jpg`)
        try
        {
            const response = await getDownloadURL(refFrontImage)
          
            setImageLoading(false)
            setImage(response)
        }
        catch(ex)
        {
            const photourl = localStorage.getItem('photoURL')
            if(photourl)
            {
                try
                {
                    const response = axios.get(JSON.parse(localStorage.getItem('photoURL')))
                    setImage(JSON.parse(localStorage.getItem('photoURL')))
                }
                catch(ex)
                {
                    setImage(img1)
                }

              
            }
            else
            {
                setImage(img1)

            }
            setImageLoading(false)
        }
       
    }

    const validateDate = (state)=>
    {

        const newErrors = {...errors}

        if(state.phone.length != 9)
        {
            newErrors.phone = 'Nie prawidłowy numer telefonu'
        }
        else
        {
            newErrors.phone = ''
        }
        if(state.name.length < 3)
        {
            newErrors.name = 'Za krótkie imię'
        }
        else if(state.name.length > 20)
        {
            newErrors.name = "Za długie imię"
        }
        else
        {
            newErrors.name = ''
        }
        if(state.surname.length <3)
        {
            newErrors.surname = "Za krótkie nazwisko"
        }
        else if(state.surname.length > 24)
        {
            newErrors.surname = "Za długie nazwisko"
        }
        else
        {
            newErrors.surname = ''
        }
        if(state.city.length < 2)
        {
            newErrors.city = 'Za krótka nazwa miejscowośći'
        }
        else if(state.city.length > 30)
        {
            newErrors.city = 'Za długa nazwa miejsowości'
        }
        else
        {
            newErrors.city = ''
        }
        setErrors(newErrors)
        if(!newErrors.name && !newErrors.phone && !newErrors.surname && !newErrors.city)
        {
            return true
        }
        else
        {
            return false
        }
    }

    const sendData = async(data)=>
    {
        setSending(true)
        try 
        {
            setServerError(false)
            const response = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
            const obj = Object.entries(response.data)
            const id = obj.find(x=>{
                if(x[1].id == param.userId)
                {
                
                    return x
                }
                
            })
            const response2 = await axios.put(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users/${id[0]}.json`,{
                name:data.name,
                surname:data.surname,
                phone:data.phone,
                email:data.email,
                city:data.city,
                dealer:data.dealer,
                id:data.id,
                registerDate:data.registerDate,

            })


           setSending(false)
           setLoading(true)
           setImageLoading(true)
           setDone(false)
           getUserInfo()
           getAvatar()
            login.changeValue(false)

        }
        catch(ex)
        {

            setServerError(true)
            setSending(false)
           setDone(false)
        }
    }

    const applyChanges = ()=>
    {
        const newState = {...userInfo}
        newState.phone = removeWhiteSymbolsFromPhone(phoneRef.current.value)
        
        const response = validateDate(newState)
        if(response)
        {
            

            newState.dealer = selectionRef.current.value
            newState.id = param.userId

            setSending(true)
            sendData(newState)
        }
    }

    const changeState = (e,action)=>
    {
        const newState={...userInfo}
        switch(action)
        {
            case 'phone':
                newState.phone = e.target.value
                break
            case 'name':
                newState.name = e.target.value
                break
            case 'surname':
                newState.surname = e.target.value
                break
            case 'city':
                newState.city = e.target.value
        }
        setUserInfo(newState)
    }

    const changePhone = (e)=>
    {
        if(e.target.value.length < 10)
        {
            changeState(e,'phone')

        }
    }

    const blurPhone = (val)=>
    {

        if(val.length == 9)
        {
          
            const res = setPrice(val)
            const newState = {...userInfo}
            newState.phone = res
            setUserInfo(newState)

        }
    }

    const focusPhone = (e)=>
    {
 
        if(e.target.value.length == 11)
        {
            const str = removeWhiteSymbolsFromPhone(e.target.value)
            const newState = {...userInfo}
            newState.phone = str
            setUserInfo(newState)
        }
    }

    useEffect(()=>{
        if(!done)
        {
            if(phoneRef.current)
            {
                blurPhone(phoneRef.current.value)
                setDone(true)
            }

        }
        
    },[userInfo])

    const checkFile = async(e)=>
    {
        
        setServerImageError(false)
        setImageLoading(true)
        const img = inputRef.current.files[0]

        try
        {
            const storage = getStorage()
            const storageRef = ref(storage, `usersImg/${param.userId}/avatar.jpg`);
            const response = await uploadBytes(storageRef, img)
            setImageLoading(false)
            getAvatar()
        }
        catch(ex)
        {

            setImageLoading(false)
            setServerImageError(true)
            getAvatar()
        }
    }

    useEffect(()=>{
        if(!login.value)
        {
            navigate('/')
        }
    },)


    useEffect(()=>{
        window.scrollTo(0,0)
        getUserInfo()
        getAvatar()
    },[])


    const delAccount = async()=>
    {

        const token = JSON.parse(localStorage.getItem('idToken'))
        const uId = userInfo.id
        if(token && uId)
        {
            setDeleting(true)
            setServerError(false)
            try
            {
                
               
                const users = await axios.get("https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json")
                const usersData = Object.entries(users.data)
                const filter = usersData.filter(x=>x[1].id == userInfo.id)
                const toDel = filter[0][0]
  
                const response2 = await axios.delete(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users/${toDel}.json`)
                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                    idToken:token
                })

                const response3 = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json`)
   
                const filtered = Object.entries(response3.data).filter(x=>x[1].userId === uId)
                filtered.forEach(async(x)=>{
                        const del = await axios.delete(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts/${x[0]}.json`)
                })

                setDeleting(false)
                localStorage.removeItem('idToken')
                localStorage.removeItem('userId')
                localStorage.removeItem('photoURL')
                login.changeValue(false)
            }
            catch(ex)
            {

                setServerError(true)
                setDeleteRoger(false)
                setDeleteRoger(false)
            }
        }
       
    }

    const logout = ()=>
    {
        login.changeValue(false)
        localStorage.removeItem('idToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('photoURL')
        navigate('/')
    }

    const [mode,setMode] = useState(true)

    const resize = ()=>
    {
        if(window.innerWidth > 950)
        {
            setMode(true)
        }
        else
        {
            setMode(false)
        }
    }

    useEffect(()=>{
        resize()
        window.addEventListener('resize',resize)
        document.title = 'Profil'
        return ()=>
        {
            window.removeEventListener('resize',resize)
        }
      },[])

    return(
        <div className={styles.container}>

        {loading?<div className={styles.loading}><LoadingFrontImg /></div>:<>
            {deleteRoger?<div className={styles.deleteInfo}>
                <div>
                    <h2>Czy na pewno chcesz usunąć konto?</h2>
                    <div>
                        <button className={styles.yes} onClick={delAccount}>Tak</button>
                        <button className={styles.no} onClick={e=>setDeleteRoger(false)}>Anuluj</button>
                    </div>
                </div></div>:null}
            {deleting?<div className={styles.deletingCon}><div><LoadingFrontImg /> Usuwanie konta...</div></div>:null}
            {sending?<div className={styles.sendingCon}><div className={styles.sending}><LoadingFrontImg /><h2>Aktualizacja danych...</h2></div></div>:<>

            {!mode && <Link to={`/liked/${param.userId}`} className={styles.menuOption}><IconHeart /> Polubione</Link>}
                {!mode && <Link to={`/yourOffers/${param.userId}`} className={styles.menuOption}><IconProducts /> Twoje Oferty</Link>}
                {!mode && <Link to={`/addoffer/${param.userId}`} className={styles.menuOption}><IconPlus /> Nowa Oferta</Link>}

            <h1>Twój profil</h1>

            <div className={styles.info}>

                <div className={styles.leftDiv}>

                    <div className={styles.photoDes}>

                        <div className={styles.imgContainer}>
                            {imageLoading?<LoadingSmallIcon />:<img src={image}></img>}
                            <div className={styles.imgHover}><IconCamera /> Plik JPG</div>
                            <input type="file" className={styles.file} ref={inputRef} accept=".jpg" onChange={checkFile} title="Wybierz plik"></input>
                        </div>
        
                        <h2>{`${toUpperCaseFirstLetter(pernametUserInfo.name)} ${toUpperCaseFirstLetter(pernametUserInfo.surname)}`}</h2>

                    </div>

                    
                    <div className={styles.inputContainer}>
                        <div type="text" className={`${styles.input} ${styles.disabled}`}>{userInfo.email}</div>
                        <div className={styles.inputInfo}>Adres e-mail</div>
                    </div>
                   
                    <div className={styles.inputContainer}>
                        <input type="text" value={userInfo.phone} className={styles.input} onChange={e=>changePhone(e)} onBlur={e=>blurPhone(e.target.value)} onFocus={focusPhone} ref={phoneRef}></input>
                        <div className={styles.inputInfo}>Numer telefonu</div>
                        <div className={styles.errorArea}>{errors.phone}</div>
                    </div>

                </div>

                <div className={styles.rightDiv}>

                    <div className={styles.inputContainer}>
                        <input type="text" value={`${toUpperCaseFirstLetter(userInfo.name)}`} className={styles.input} onChange={e=>changeState(e,'name')}></input>
                        <div className={styles.inputInfo}>Imię</div>
                        <div className={styles.errorArea}>{errors.name}</div>
                    </div>

                    <div className={styles.inputContainer}>
                        <input type="text" value={`${toUpperCaseFirstLetter(userInfo.surname)}`} className={styles.input} onChange={e=>changeState(e,'surname')}></input>
                        <div className={styles.inputInfo}>Nazwisko</div>
                        <div className={styles.errorArea}>{errors.surname}</div>
                    </div>

                    <div className={styles.inputContainer}>
                        <input type="text" value={`${toUpperCaseFirstLetter(userInfo.city)}`} className={styles.input} onChange={e=>changeState(e,'city')}></input>
                        <div className={styles.inputInfo}>Miasto sprzedaży</div>
                        <div className={styles.errorArea}>{errors.city}</div>
                    </div>

                    <div className={styles.selectContainer}>
                        <div className={styles.h2}>Rodzaj działalności</div>
                        <select className={styles.select}  ref={selectionRef}>
                            <option>Osoba Prywatna</option>
                            <option selected={userInfo.dealer === 'Firma'}>Firma</option>
                        </select>

                    </div>

                </div>

            </div>
            <div className={styles.serverError}>{serverError?"Serwer nie odpowiada. Spróbuj ponownie później":null}</div>
            <div className={styles.serverError}>{serverImageError?"Nie można wysłać zdjęcia. Spróbuj ponownie później":null}</div>
            
            <div className={styles.menu}>
                {mode && <Link to={`/liked/${param.userId}`} className={styles.menuOption}><IconHeart /> Polubione</Link>}
                {mode && <Link to={`/yourOffers/${param.userId}`} className={styles.menuOption}><IconProducts /> Twoje Oferty</Link>}
                {mode && <Link to={`/addoffer/${param.userId}`} className={styles.menuOption}><IconPlus /> Nowa Oferta</Link>}
                <button className={styles.menuOption} onClick={applyChanges}><IconOK /> Zatwierdź zmiany</button>
            </div>
            
            <div className={styles.bottomBtn}>
                <div className={styles.deleteAccount}><button onClick={e=>setDeleteRoger(true)}>Usuń konto</button></div>
                <div className={`${styles.deleteAccount} ${styles.scale}`}><button onClick={logout}><IconShutDown />Wyloguj się</button></div>

            </div>
               

          

            </>}
            </>}
        </div>
    )
}

export default Profile