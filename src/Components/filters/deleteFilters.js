import React from "react"
import styles from './filterSearch.module.css'



function DeleteFilters(props)
{
    const check = ()=>
    {
        props.deleteFilters()
        if(props.setOpenFilters)
        {
            props.setOpenFilters()

        }
    }

    return(
        <button className={styles.deleteBtn} onClick={check}>Wyczyść filtry</button>
    )
}

export default React.memo(DeleteFilters)