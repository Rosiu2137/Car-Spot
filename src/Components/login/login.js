import React, { useContext, useEffect, useRef, useState } from "react";
import styles from './login.module.css'
import IconShowPasswordEnabled from "../../assets/svg/Icon-ShowPasswordEnabled";
import IconShowPasswordDisabled from "../../assets/svg/Icon-showPasswordDisabled";
import IconGoogle from "../../assets/svg/Icon-Google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIcon from '../../assets/svg/loadingFrontimg'
import LoginContext from "../Context/logincontext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import CompleteUserInfo from "./completeusersInfo";
function Login()
{
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const context = useContext(LoginContext)
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const[complete,setComplete]=useState(false)
    const[googleUser,setGoogleUser] = useState()
    const [token,setToken] = useState('')
    const [userIMG,setUserIMG] = useState('')
    const navigate = useNavigate()
  

    const setPlaceholder = (e)=>
    {

        if(window.innerWidth >950)
        {
            const placeholder = e.target.closest('div').lastElementChild
            placeholder.style.left = `2.5rem`
            placeholder.style.top = `0rem`
            placeholder.style.color = `black`
        }
        else
        {
            const placeholder = e.target.closest('div').lastElementChild
            placeholder.style.left = `4rem`
            placeholder.style.top = `-1rem`
            placeholder.style.color = `black`
        }
        
    }
    const unsetPlaceholder = (e)=>
    {
        
        if(e.target.id == "email")
        {
            if(emailValue == '')
            {
                if(window.innerWidth >950)
                {
                    const placeholder = e.target.closest('div').lastElementChild
                    placeholder.style.left = `1rem`
                    placeholder.style.top = `2.5rem`
                    placeholder.style.color = `grey`
                }
                else
                {
                    const placeholder = e.target.closest('div').lastElementChild
                    placeholder.style.left = `1.5rem`
                    placeholder.style.top = `3.8rem`
                    placeholder.style.color = `grey`
                }
               
            }
        }
        else
        {
            if(passwordValue == '')
            {
                if(window.innerWidth > 950)
                {
                    const placeholder = e.target.closest('div').lastElementChild
                    placeholder.style.left = `1rem`
                    placeholder.style.top = `2.5rem`
                    placeholder.style.color = `grey`
                }
                else
                {
                    const placeholder = e.target.closest('div').lastElementChild
                    placeholder.style.left = `1.5rem`
                    placeholder.style.top = `3.8rem`
                    placeholder.style.color = `grey`
                }
          
            }
        }
        
    }
    const focusInput = (e)=>
    {
        if(e.target.innerHTML === "Adres e-mail")
        {
            emailRef.current.focus()
        }
        else
        {
            passwordRef.current.focus()
        }
    }

    const logFunc = async()=>
    {
        try
        {   
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                email:emailValue,
                password:passwordValue,
                returnSecureToken:true,
            })
            localStorage.setItem('idToken',JSON.stringify(response.data.idToken))

            const response2 = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            const arr = Object.values(response2.data)
            const user = arr.find(x=>x.email == response.data.email)
            localStorage.setItem('userId',JSON.stringify(user.id))
            context.changeValue(true)
            navigate('/')
        }
        catch(ex)
        {
            
            
            if(ex.response.data.error.message === "INVALID_LOGIN_CREDENTIALS" || ex.response.data.error.message === "INVALID_EMAIL")
            {
                setError("Nieprawidłowe dane logowania")
                setLoading(false)
            }
            else if(ex.response.data.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER'))
            {
                setError('Zbyt dużo nieudanych prób logowania. Spróbuj później')
                setLoading(false)
            }
            else
            {
                setError("Wystąpił błąd serwera. Spróbuj ponownie później")
                setLoading(false)
            }
        }

        
    }

    const login = ()=>
    {
       
        if(emailValue === '' || passwordValue === '')
        {
            if(emailValue === '')
            {
                setError('Wpisz adres e-mail')
            }
            if(passwordValue === '')
            {
                setError('Wpisz hasło')
            }
            if(emailValue === '' && passwordValue === '')
            {
                setError('Wpisz adres e-mail i hasło')
            }
        }
        else
        {
            setError('')
            setLoading(true)
            logFunc()
        }
    }

    const googleLogin=async()=>
    {
        setError('')
        
        try
        {
            setLoading(true)
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const response = await signInWithPopup(auth, provider)
       
            const uId = response.user.uid
            const response2 = await axios.get(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
            const users = Object.values(response2.data)
            const found = users.find(x=>x.id === `userId${uId}`)
            if(found)
            {
                
                setLoading(false)
                context.changeValue(true)
                localStorage.setItem('idToken',JSON.stringify(response._tokenResponse.idToken))
                localStorage.setItem('userId',JSON.stringify(`userId${uId}`))
                localStorage.setItem('photoURL',JSON.stringify(response.user.photoURL))
                navigate('/')
            }
            else
            {
                setGoogleUser(response.user)
                setToken(response._tokenResponse.idToken)
                setUserIMG(response.user.photoURL)
                setLoading(false)
                setComplete(true)

            }

        }
        catch(ex)
        {
            setLoading(false)
            setError("Nie można się w tej chwili zalogować")
        }

    }

    useEffect(()=>{
        document.title = 'Logowanie'
      },[])
   
   useEffect(()=>
   {
        if(context.value)
        {
            navigate('/')
        }
   },[context.value])

    return(
        complete?<CompleteUserInfo data={googleUser} token={token} userImg={userIMG}/>:
        <div className={styles.container} onKeyDown={e=>e.key === "Enter"?login():null}>
            {loading?<div className={styles.loadingContainer}><div className={styles.loadingInnerContainer}><LoadingIcon /><div className={styles.loadingDescription}>Logowanie...</div></div></div>:null}
            <div className={styles.loginContainer}>
                <h1>Logowanie</h1>
              
                <form>
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input} id="email" ref={emailRef} onFocus={e=>setPlaceholder(e)} onBlur={e=>unsetPlaceholder(e)} value={emailValue} onChange={e=>setEmailValue(e.target.value)}></input>
                    <div className={styles.placeholder} onClick={e=>focusInput(e)} id="id">Adres e-mail</div>
                </div>

                <div className={styles.inputContainer}>
                    <input type={showPassword?"text":"password"} id={styles.password} ref={passwordRef} className={styles.input} onFocus={e=>setPlaceholder(e)} onBlur={e=>unsetPlaceholder(e)} value={passwordValue} onChange={e=>setPasswordValue(e.target.value)}></input>
                    <div className={styles.eyeContainer} onClick={e=>setShowPassword(!showPassword)}>{showPassword?<IconShowPasswordEnabled />:<IconShowPasswordDisabled />}</div>
                    <div className={styles.placeholder} onClick={e=>focusInput(e)} id="id">Hasło</div>
                </div>
                </form>
                    <div className={styles.forgotPassword} onClick={e=>navigate('/forgotPassword')}>Nie pamiętasz hasła?</div>

                {error?<div className={styles.errorArea}>{error}</div>:null}

                <button className={styles.log} onClick={login}>Zaloguj się!</button>

                <div className={styles.lineBreak}></div>

                <button className={`${styles.bottomBtn} ${styles.googleBtn}`} onClick={googleLogin}><IconGoogle /> Zaloguj się przez Google</button>

                <Link to='/register' className={styles.bottomBtn}>Zarejestruj się</Link>
            </div>
        </div>
    )
}

export default React.memo(Login)