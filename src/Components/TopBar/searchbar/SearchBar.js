import React, { useContext, useEffect, useRef, useState } from "react";
import styles from './searchbar.module.css'
import IconSearch from "../../../assets/svg/icon-search";
import IconCancel from "../../../assets/svg/icon-cancel";
import IconFullSearch from "../../../assets/svg/icon-FullSearch";
import responsiveSearchBarContext from "../../Context/ResponsiveSearchBarContext";
import searchingValueContext from "../../Context/searchingValuecontext";
function SearchBar()
{

    const searchContext = useContext(searchingValueContext)

    const inputRef = useRef(null)
   
   
    const context = useContext(responsiveSearchBarContext)

    const checkPressedKey=(e)=>
    {
       
        if(e.key === "Enter")
        {
            searchContext.search(inputRef.current.value)
        }
    }

    useEffect(()=>{
        inputRef.current.focus()
    },[searchContext.searchingValue])

    useEffect(()=>{
        
        const input = inputRef.current
        input.addEventListener("keydown",checkPressedKey)
    },[])
   

    

    return(
        <div className={styles.con}>
            <div className={styles.searchdiv}>
                <input type="text" className={styles.searchInput} ref={inputRef}  placeholder="Znajdź swoje wymarzone auto..." value={searchContext.searchingValue} onChange={e=>searchContext.changeSearchingValue(e.target.value)} ></input>
                <div onClick={searchContext.clearSearchingValue} className={styles.deleteIcon}><IconCancel /></div>

            </div>
            <div className={`${styles.responsiweSearch} ${context.value?styles.grey:styles.orange}`} onClick={context.changeValue}>
                <IconFullSearch />
            </div>
            <button className={styles.searchbtn} onClick={e=>searchContext.search(inputRef.current.value)}>Szukaj <IconSearch /></button>
        </div>
    )
}

export default React.memo(SearchBar)