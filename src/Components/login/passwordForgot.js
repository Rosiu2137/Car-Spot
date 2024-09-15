import { useState } from 'react'
import styles from './passwordForget.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PasswordForgot()
{
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('')
    const [info,setInfo] = useState(false)
    const navigate = useNavigate()

    const emailCheck = (email)=>
    {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return regex.test(email)

    }

    const validateEmail = async()=>
    {
        if(emailCheck(email))
        {
            setEmailError('')
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                requestType:"PASSWORD_RESET",
                email:email,
            })
            setInfo(true)
        }
        else
        {
            setEmailError('Nie prawidłowy adres email')
        }
    }

    return(
        <div className={styles.container}>
            {info?<div className={styles.info}>Wysłano wiadomość z resetowaniem hasła na twoją skrzynkę pocztową<button onClick={e=>navigate('/')}>Wróć na stronę główną</button></div>:
            <div>

                <h1>Resetowanie Hasła</h1>
                <input type='email' placeholder='Wpisz swój adres email...' value={email} onChange={e=>setEmail(e.target.value)}></input>
                <div className={styles.emailError}>{emailError}</div>
                <button onClick={validateEmail}>Resetuj hasło</button>
            </div>}
        </div>
    )
}
export default PasswordForgot