import { useContext, useEffect, useReducer, useRef, useState } from "react"
import styles from './completeUserInfo.module.css'
import IconNextPage from "../../assets/svg/Icon-nextPage"
import CheckBoxEmpty from "../../assets/svg/checkboxEmpty"
import { Link, useNavigate } from "react-router-dom"
import CheckBoxFilled from "../../assets/svg/checkBoxFilled"
import LoadingFrontImg from "../../assets/svg/loadingFrontimg"
import axios from "axios"
import LoginContext from "../Context/logincontext"
import {ref,uploadBytes,getStorage, getDownloadURL} from "firebase/storage"

function reducer(state,action)
{
    const newState = {...state}
    switch(action.type)
    {
        case 'phone':
            if(action.value.length <=9)
            {
                newState.phone = action.value
            }
            break
        case 'name':
            newState.name = action.value
            break
        case 'surname':
            newState.surname = action.value
            break
        case 'city':
            newState.city = action.value
            break
    }
    return newState
}

function CompleteUserInfo(props)
{

    const [values,dispach] = useReducer(reducer,{
        phone:'',
        name:'',
        surname:'',
        city:'',
    })
    const [rules,setRules] = useState({
        data:false,
        rules:false,
        info:false,
    })
    const [errors,setErrors] = useState({
        name:'',
        phone:'',
        surname:'',
        city:'',
        data:'',
        rules:'',
    })
    const [loading,setLoading] = useState(false)

    const selectRef = useRef(null)
    const [mainError,setMainError] = useState('')
    const context = useContext(LoginContext)

    const navigate = useNavigate()

    const validate = async()=>
    {
        

        const newErrors = {...errors}
        if(values.phone.length != 9)
        {
            newErrors.phone = 'Nie prawidłowy numer telefonu'
       
        }
        else
        {
            newErrors.phone = ''
        
        }
        if(values.name.length<3)
        {
            newErrors.name = 'Za krótkie imię'
            
        }
        else if(values.name.length > 20)
        {
            newErrors.name = 'Za długie imię'
          
        }
        else
        {
            newErrors.name = ''
          
        }
        if(values.surname.length < 3)
        {
            newErrors.surname = 'Za krótkie nazwisko'
           
        }
        else if(values.surname.length > 24)
        {
            newErrors.surname = 'Za długie nazwisko'
            
        }
        else
        {
            newErrors.surname = ''
          
        }
        if(values.city.length < 2)
        {
            newErrors.city = 'Za krótka nazwa miejscowości'
           
        }
        else if(values.city.length > 30)
        {
            newErrors.city = "Za długa nazwa miejscowości"
         
        }
        else
        {
            newErrors.city = ''
        
        }
        if(rules.data)
        {
            newErrors.data = ''
       
        }
        else
        {
            newErrors.data = 'Ta opcja jest wymagana'
          
        }
        if(rules.rules)
        {
           
            newErrors.rules = ''
        }
        else
        {
            newErrors.rules = 'Ta opcja jest wymagana'
        }
        setErrors(newErrors)
        const err = Object.values(newErrors)
        let passed = true
        for(let i = 0;i<err.length;i++)
        {
            if(err[i])
            {
                passed = false
                break
            }
        }
        if(passed)
        {
           
            setLoading(true)
            const date = new Date()
            const userData = {...values}
            userData.email = props.data.email
            userData.registerDate = `${date.getFullYear()}`
            userData.dealer = selectRef.current.value
            userData.id = `userId${props.data.uid}`
         
            const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            const emailBeen = Object.values(response.data).findIndex(x=>x.email == props.data.email)
            if(emailBeen != -1)
            {
                setLoading(false)
                setMainError('Ten adres email jest już zarejestrowany w naszym serwisie')
            }
            else
            {
                setMainError('')
                try
                {
                    const post = await axios.post(`https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json`,userData)
                    
                    context.changeValue(true)
                    localStorage.setItem('idToken',JSON.stringify(props.token))
                    localStorage.setItem('userId',JSON.stringify(userData.id))
                    localStorage.setItem('photoURL',JSON.stringify(props.userImg))
                    navigate('/')
                    setLoading(false)
                    
                }
                catch(ex)
                {
                
                    setLoading(false)
                    setMainError('Nie można w tej chwili utworzyć konta')
                }
            }
        }
        
    }


    return(
        <div className={styles.container}>
            {loading?<div className={styles.creating}><div><LoadingFrontImg /><div>Tworzenie Konta...</div></div></div>:<>
            <h1>Dokończ tworzenie konta</h1>

            <div className={styles.inputCon}>
                <h2>Adres E-Mail</h2>
                <input type="text" className={styles.mail} value={props.data.email} disabled ></input>
            </div>

            <div className={styles.inputCon}>
                <h2>Podaj swój numer telefonu</h2>
                <input type="number" value={values.phone} onChange={e=>dispach({type:'phone',value:e.target.value})}></input>
                {errors.phone?<div className={styles.errorArea}>{errors.phone}</div>:null}
            </div>

            <div className={styles.inputCon}>
                <h2>Podaj swoje imię</h2>
                <input type="text" value={values.name} onChange={e=>dispach({type:'name',value:e.target.value})}></input>
                {errors.name?<div className={styles.errorArea}>{errors.name}</div>:null}
            </div>

            <div className={styles.inputCon}>
                <h2>Podaj swoje nazwisko</h2>
                <input type="text" value={values.surname} onChange={e=>dispach({type:'surname',value:e.target.value})}></input>
                {errors.surname?<div className={styles.errorArea}>{errors.surname}</div>:null}
            </div>

            <div className={styles.inputCon}>
                <h2>Podaj miasto sprzedaży</h2>
                <input type="text" value={values.city} onChange={e=>dispach({type:'city',value:e.target.value})}></input>
                {errors.city?<div className={styles.errorArea}>{errors.city}</div>:null}
            </div>
            <div className={styles.selectCon}>
                <h2>Wybierz swój typ działalności</h2>
                <select ref={selectRef}>
                    <option>Osoba Prywatna</option>
                    <option>Firma</option>
                </select>
                <div className={styles.arrow}><IconNextPage /></div>
            </div>
            
            <div className={styles.rulesCon} onClick={()=>{const newState = {...rules};newState.data = !rules.data;setRules(newState)}}>
                {rules.data?<CheckBoxFilled />:<CheckBoxEmpty />} Zgadzam się na przetwarzanie moich danych osobowych
            </div>
            {errors.data?<div className={`${styles.errorArea} ${styles.errorArea2}`}>{errors.data}</div>:null}
            <div className={styles.rulesCon} onClick={()=>{const newState = {...rules};newState.rules = !rules.rules;setRules(newState)}}>
                {rules.rules?<CheckBoxFilled />:<CheckBoxEmpty />} Przeczytałem i akceptuje <Link to="/statute">regulamin serwisu</Link>
            </div>
            {errors.rules?<div className={`${styles.errorArea} ${styles.errorArea2}`}>{errors.rules}</div>:null}
            <div className={styles.rulesCon} onClick={()=>{const newState = {...rules};newState.info = !rules.info;setRules(newState)}}>
                {rules.info?<CheckBoxFilled />:<CheckBoxEmpty />} Chce otrzymywać na maila wszystkie nowośći z portalu (opcjonalne)
            </div>
            {mainError?<div className={styles.mainError}>{mainError}</div>:null}
            <button className={styles.submit} onClick={validate}>Utwórz Konto</button>
            </>}
        </div>
    )
}
export default CompleteUserInfo