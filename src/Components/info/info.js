import { useState } from 'react'
import styles from './info.module.css'
import LoadingFrontImg from '../../assets/svg/loadingFrontimg'
import axios from 'axios'

function Info(props)
{
    const [input,setInput] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const check = async()=>
    {
        setError('')
        setLoading(true)
        try
        {   
            const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/password.json')
            if(response.data == input)
            {
                sessionStorage.setItem('confidential',JSON.stringify(true))
                props.change(false)
                setLoading(false)
            }
            else
            {
                setError('Nieprawidłowe hasło')
                setLoading(false)
            }
        }
        catch(ex)
        {
            setError('Błąd. Serwer nie odpowiada')
            setLoading(false)
        }
    }

    return(

        <div className={styles.background}>

            <div className={styles.container}>
                {loading?<LoadingFrontImg />:<>
                <h1>Strona ta jest tylko poglądowa. Przedstawione na niej informacje są nieprawdziwe!</h1>
                <h2>Aby uzyskać dostęp do strony podaj hasło</h2>
                <input className={styles.input} type='text' value={input} onChange={e=>setInput(e.target.value)}></input>
                <div className={styles.errorArea}>{error}</div>
                <button className={styles.btn} onClick={check}>Potwierdź</button>
                </>}
            </div>

        </div>

    )
}

export default Info