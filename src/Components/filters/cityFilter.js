import React, { useEffect, useState } from "react";
import styles from './filterSearch.module.css' 
import FiltersContext from "../Context/filtersObject";
import filtersObject from "../Context/filtersObject";


function CityFilter(props)
{
    

    const [inputValue,setInputValue] = useState(filtersObject.city)

    
   
    useEffect(()=>{
        FiltersContext.city = inputValue
    },[inputValue])   
       
    useEffect(()=>{
        if(props.resetFilters)
        {
            setInputValue(filtersObject.city)
        }
    },[props.resetFilters])
        
    

    return(
       
        <div className={styles.menuContainer}>
            <input type="text" className={styles.cityInput} placeholder="Podaj miasto..." value={inputValue} onChange={e=>setInputValue(e.target.value)}></input>
            <div className={styles.optionsLineBreak}></div>
        </div>
     
    )
}

export default React.memo(CityFilter)