import styles from './responsivesearchbar.module.css'
import IconFullSearch from '../../assets/svg/icon-FullSearch'
import searchingValueContext from '../Context/searchingValuecontext'
import { useContext, useEffect, useRef } from 'react'
function ResponsiveSearchBar()
{
    const searchContext = useContext(searchingValueContext)

    const inputRef = useRef(null)

    const checkPressedKey = (e)=>
    {
        if(e.key === "Enter")
        {
            searchContext.search(inputRef.current.value)
        }
    }

    useEffect(()=>{
        const input = inputRef.current
        input.addEventListener("keydown",checkPressedKey)
    },[])

    return(
        <div className={styles.container}>
            <input className={styles.input} placeholder='Znajdź swoje wymarzone auto...' value={searchContext.searchingValue} onChange={e=>searchContext.changeSearchingValue(e.target.value)} ref={inputRef}></input>
            <button className={styles.btn} onClick={e=>searchContext.search(inputRef.current.value)}>Szukaj <div className={styles.searchicon}><IconFullSearch /></div></button>
        </div>
    )
}

export default ResponsiveSearchBar