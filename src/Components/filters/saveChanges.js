import React, { useContext, useEffect, useRef, useState } from "react"
import styles from './filterSearch.module.css'
import ApplyFiltersContext from "../Context/aplyFiltersContext"

function SaveChanges(props)
{
    const context = useContext(ApplyFiltersContext)
    
    
    const send = ()=>
    {
        window.scroll(0,0)
        context.applyFilters()
        if(props.setOpenFilters)
        {
            props.setOpenFilters()
        }
    }

    return(
        <button className={`${styles.saveBtn} ${styles.btnEnabled}`} onClick={send}>Zastosuj filtry</button>
    )
}

export default SaveChanges