import styles from './notfound.module.css'
import IconServerError from '../../assets/svg/icon-serverError'
import { useEffect } from 'react'
function PageNotFound()
{
    useEffect(()=>{
        document.title = 'Nie Znaleziono'
      },[])
    
    return(
        <div className={styles.container}>
            <IconServerError />
            <p className={styles.para}>Ups... Nie znaleziono strony</p>
        </div>
    )
}

export default PageNotFound