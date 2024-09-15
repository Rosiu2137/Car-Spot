import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import styles from './register.module.css'
import IconPasswordDisabled from "../../assets/svg/Icon-showPasswordDisabled"
import IconPasswordEnabled from "../../assets/svg/Icon-ShowPasswordEnabled"
import reducer from "./registerReducer";
import setPrice from '../../assets/helpers/addBlinkInPrices'
import { Link, useNavigate } from "react-router-dom";
import CheckBoxEmpty from '../../assets/svg/checkboxEmpty'
import CheckBoxFilled from '../../assets/svg/checkBoxFilled'
import LoadingIcon from '../../assets/svg/loadingFrontimg'
import axios from "axios";
import LoginContext from "../Context/logincontext";


function Register()
{
    const [showPass,setShowPass] = useState(false)
    const [showRepeatPass,setShowRepeatPass] = useState(false)
    const [lastHoveredElement,setLastHoveredElement] = useState('')
    const [infoText,setInfoText] = useState('')
    const[serverError,setServerError] = useState('')
   const [select,setSelect] = useState('Osoba Prywatna')
   const context = useContext(LoginContext)
    const [validateError,setValidateError] = useState({
        email:'',
        password:'',
        repeatPassword:'',
        phone:'',
        name:'',
        surname:'',
        city:'',
        data:'',
        rules:'',
    })
    
    const [permissions,setPermissions] = useState({
        data:false,
        rules:false,
        info:false,
    })

   
    
    const switchPermissions =(e)=>
    {
        const newState = {...permissions}
        switch(e)
        {
            case 'data':
                newState.data = !permissions.data
                break
            case 'rules':
                newState.rules = !permissions.rules
                break
            case 'info':
                newState.info = !permissions.info
                break
        }
        setPermissions(newState)
    }

    const [state,dispach] = useReducer(reducer,{
        email:'',
        password:'',
        repeatPassword:'',
        phone:'',
        name:'',
        surname:'',
        city:'',
    })

    const [loading,setLoading] = useState(false)

    const infoElementRef = useRef(null)
    const selectRef = useRef(null)

    const navigate = useNavigate()


    const configInfo = {
        name:'Twoje wprowadzone imię będzie wyświetlane przy twoim koncie. Pozwala to zidentyfikować potencjalnym kupującym ciebie jako sprzedawcę. Twoje imię również dodaje wiarygodność twoich ofert.',
        surname:'Twoje nazwisko, jest konieczne aby zidentyfikować przez kupujących ciebie jako sprzedawcę, dodaje ono wiarygodność twoim ofertą. Nazwisko będzie wyświetlane przy każdej z twoich ofert.',
        city:'Miasto twojej sprzedaży jest wymagane, aby użytkownicy serwisu mogli szukać ofert w swojej okolicy. Podane miasto jest tylko orientacyjne, nie musi wskazywać dokładnie na miejsce twojej sprzedaży, zaleca się jednak aby twoja prawdziwa sprzedaż była w zasięgu 30km od wprowadzonej przez ciebie nazwy miasta.',
        dealer:'Typ twojej dziłalnośći jest potrzebny aby umożliwić użytkownikom weryfikację sprzedawcy. Jeżeli masz firmę, prowadzisz komis samochodowy lub poprostu sprzedajesz kilka samochodów, powinnieneś wybrać opcję "Firma".',
    }


    const displayInfo =(e)=>
    {
        const hoveredId = e.target.id
        switch (hoveredId)
        {
            case 'name':
                setInfoText(configInfo.name)
                break;
            case 'surname':
                setInfoText(configInfo.surname)
                break
            case 'city':
                setInfoText(configInfo.city)
                break
            case 'dealer':
                setInfoText(configInfo.dealer)
                break
        }
        if(lastHoveredElement != hoveredId)
        {
            const pageX = e.pageX
            const pageY = e.pageY
            infoElementRef.current.style.top = `${pageY}px`
            infoElementRef.current.style.left = `${pageX}px`
            infoElementRef.current.style.display = `block`
            infoElementRef.current.style.opacity = `1`
            setLastHoveredElement(hoveredId)
        }
       
    }
    const offDisplayingInfo = ()=>
    {
       
        infoElementRef.current.style.opacity = `0`
        infoElementRef.current.style.display = `none`
        setLastHoveredElement('')
        setInfoText('')
    }

    const emailCheck = (email)=>
    {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return regex.test(email)

    }

    const passwordCheck =(password)=>
    {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        return regex.test(password)
    }

    const validateDataData = ()=>
    {
        const newError = {
            email:'',
            password:'',
            repeatPassword:'',
            phone:'',
            name:'',
            surname:'',
            city:'',
            data:'',
            rules:'',
        }
        const email = emailCheck(state.email)
        const password = passwordCheck(state.password)
        const repeatPassword = (state.password === state.repeatPassword) && (state.repeatPassword!='')
        const phone = state.phone.length === 9
        const name = state.name.length >=3 && state.name.length <21
        const surname = state.surname.length >=4 && state.surname.length <25
        const city = state.city.length >=2 && state.city.length < 31
        const data = permissions.data
        const rules = permissions.rules

        if(!email)
        {
            newError.email = 'Email jest nie poprawny'
        }
        if(!password)
        {
            newError.password = "Hasło jest za słabe"
        }
        if(!repeatPassword)
        {
            newError.repeatPassword = 'Hasła nie są identyczne'
        }
        if(!phone)
        {
            newError.phone = 'Nieprawidłowy numer telefonu'
        }
        if(!name)
        {
            if(state.name.length < 3)
            {
                newError.name = 'Za krótkie imię'
            }
            else if(state.name.length > 20)
            {
                newError.name = "Za długie imię"
            }
        }
        if(!surname)
        {
            if(state.surname.length < 3)
            {
                newError.surname = 'Za krótkie nazwisko'
            }
            else if(state.surname.length > 24)
            {
                newError.surname = "Za długie nazwisko"
            }
        }
        if(!city)
        {
            if(state.city.length <2)
            {
                newError.city = 'Za krótka nazwa miejscowośći'
            }
            else if(state.city.length > 30)
            {
                newError.city = 'Za długa nazwa miejscowośći'
            }
        }
        if(!data)
        {
            newError.data = 'To pole jest wymagane'
        }
        if(!rules)
        {
            newError.rules = 'To pole jest wymagane'
        }
        setValidateError(newError)

        return email && password && repeatPassword && phone && name && surname && city && data && rules
    }

    const registerUser = async()=>
    {
        try
        {
            const respose = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                email:state.email,
                password:state.password,
                returnSecureToken:true,
            })
            localStorage.setItem('idToken',JSON.stringify(respose.data.idToken))
            setServerError('')
            return true
        }
        catch(ex)
        {
            if(ex.response.data.error.message === "EMAIL_EXISTS")
            {
                setServerError('Konto o podanym adresie e-mail już istnieje')
                return false
            }
            else
            {
                setServerError('Wystąpił bład z serwerem. Spróbuj ponownie później')
                return false
            }
        }
    }

    const postUserInfo = async()=>
    {
        const date = new Date()
        const random = Math.floor(Math.random()*10000000000)
        localStorage.setItem('userId',JSON.stringify(`userId${random}`))
        const usersInfo = {
            email:state.email,
            phone:state.phone,
            name:state.name,
            surname:state.surname,
            city:state.city,
            dealer:select,
            registerDate:`${date.getUTCFullYear()}`,
            id:`userId${random}`,
        }

        try
        {
            const response = await axios.post('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json',usersInfo)
            setServerError('')
            return true
        }
        catch(ex)
        {
            setServerError('Wystąpił błąd serwera. Spróbuj ponownie później')
            return false
        }
    }

    const createAccount = async()=>
    {
        const data = validateDataData()
        if(data)
        {
            setLoading(true)
            const a = await registerUser()
            let b = true;
            if(a)
            {
                b = await postUserInfo()
            }
            if(!b)
            {
                const response  = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                    idToken:JSON.parse(localStorage.getItem('idToken'))
                })
            }
            if(a && b)
            {
                
                context.changeValue(true)
                navigate('/')
                
            }
            setLoading(false)
        }
    }

    useEffect(()=>{
        document.title = 'Rejestracja'
      },[])
     
        


    return(
        loading?<div className={styles.loadingContainer}><div className={styles.innerLoadingContainer}><LoadingIcon /><div className={styles.loadingDescription}>Tworzenie Konta...</div></div></div>:(  
       <div className={styles.container}>
             
                <h1>Tworzenie konta</h1>

                <div className={styles.formDiv}>

                    <div className={styles.leftDiv}>
                <label>
                    <h2>Wprowadź adres e-mail</h2>
                    <input type="text" className={styles.input} value={state.email} onChange={e=>dispach({type:'email',value:e.target.value})}></input>
                    <div className={styles.errorArea}>{validateError.email?validateError.email:null}</div>
                </label>

                <label>
                    <h2>Utwórz Hasło</h2>
                    <input type={showPass?'text':'password'} className={`${styles.input} ${styles.pass}`} value={state.password} onChange={e=>dispach({type:'password',value:e.target.value})}></input>
                    <div className={styles.eye} onClick={e=>setShowPass(!showPass)}>{showPass?<IconPasswordEnabled />:<IconPasswordDisabled />}</div>
                    <div className={styles.errorArea}>{validateError.password?validateError.password:null}</div>
                </label>

                <label>
                    <h2>Powtórz Hasło</h2>
                    <input type={showRepeatPass?'text':'password'} className={`${styles.input} ${styles.pass}`} value={state.repeatPassword} onChange={e=>dispach({type:'repeatPassword',value:e.target.value})}></input>
                    <div className={styles.eye} onClick={e=>setShowRepeatPass(!showRepeatPass)}>{showRepeatPass?<IconPasswordEnabled />:<IconPasswordDisabled />}</div>
                    <div className={styles.errorArea}>{validateError.repeatPassword?validateError.repeatPassword:null}</div>
                </label>

                <label>
                    <h2>Podaj swój numer telefonu</h2>
                    <input type="text" className={styles.input} value={state.phone} onChange={e=>dispach({type:'phone',value:e.target.value})}></input>
                    <div className={styles.errorArea}>{validateError.phone?validateError.phone:null}</div>
                </label>
                    </div>

                    <div className={styles.rightDiv}>

                <div className={styles.info} ref={infoElementRef}>{infoText}</div>
                

                <label>
                    <h2>Podaj swoje imię <div className={styles.infoContainer} id='name' onMouseOver={displayInfo} onMouseOut={offDisplayingInfo}></div></h2>
                    <input type="text" className={styles.input} value={state.name} onChange={e=>dispach({type:'name',value:e.target.value})}></input>
                    <div className={styles.errorArea}>{validateError.name?validateError.name:null}</div>
                </label>

                <label>
                    <h2>Podaj swoje Nazwisko <div className={styles.infoContainer} id='surname' onMouseOver={displayInfo} onMouseOut={offDisplayingInfo}></div></h2>
                    <input type="text" className={styles.input} value={state.surname} onChange={e=>dispach({type:'surname',value:e.target.value})}></input>
                    <div className={styles.errorArea}>{validateError.surname?validateError.surname:null}</div>
                </label>

                <label>
                    <h2>Wprowadź miasto sprzedaży <div className={styles.infoContainer} id='city' onMouseOver={displayInfo} onMouseOut={offDisplayingInfo}></div></h2>
                   
                    <input type="text" className={styles.input} value={state.city} onChange={e=>dispach({type:'city',value:e.target.value})}></input>
                    <div className={styles.errorArea}>{validateError.city?validateError.city:null}</div>
                </label>

                <div className={styles.selectContainer}>
                    <h2>Wybierz swój typ działalności <div className={styles.infoContainer} id='dealer' onMouseOver={displayInfo} onMouseOut={offDisplayingInfo}></div></h2>
                    <select className={styles.select} ref={selectRef} onClick={e=>setSelect(e.target.value)}>
                        <option>Osoba Prywatna</option>
                        <option>Firma</option>
                     
                    </select>
                </div>

                    </div>

                </div>

               

                <div className={styles.horizontalBreak}></div>

                <div className={styles.serverErrorArea}>
                    {serverError?serverError:null}
                </div>

                <div className={styles.bottomDiv}>

                    <div className={styles.rules}>
                    <div onClick={e=>switchPermissions('data')}>{permissions.data?<CheckBoxFilled />:<CheckBoxEmpty />} Zgadzam się na przetwarzanie moich danych osobowych</div>
                    <div className={styles.errorArea2}>{validateError.data?validateError.data:null}</div>
                    <div onClick={e=>switchPermissions('rules')}>{permissions.rules?<CheckBoxFilled />:<CheckBoxEmpty />} Przeczytałem i akceptuje<Link to='/statute'>regulamin serwisu</Link></div>
                    <div className={styles.errorArea2}>{validateError.rules?validateError.rules:null}</div>
                    <div onClick={e=>switchPermissions('info')}>{permissions.info?<CheckBoxFilled />:<CheckBoxEmpty />} Chce otrzywyać na maila wszystkie nowośći z portalu (opcjonalne) </div>
                    </div>

                    <div className={styles.create}>
                        <button onClick={createAccount}>Utwórz konto</button>
                    </div>

                </div>
       </div> )
   
    )
}

export default Register