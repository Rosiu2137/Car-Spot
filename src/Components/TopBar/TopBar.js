import React from "react"
import { useEffect, useState } from "react"
import styles from "./TopBar.module.css"
import { useHref } from "react-router-dom"
function TopBar()
{
    const [pageX,setpageX] = useState(0)
    const [pageY,setpageY] = useState(0)
    const [display,setDisplay] = useState(true)
    const url = useHref()

    useEffect(()=>{
        setDisplay(url === '/')
       
    },[url])

    const mousemove = (e)=>
    {
        setpageX(e.pageX)
        setpageY(e.pageY)
    }

    useEffect(()=>{
        const body = document.querySelector("body")
        body.addEventListener("mousemove",mousemove)
    },[])

    return(
        <>
        {display?
        <header className={styles.con}>
            <div className={styles.topBar} style={{translate:`${pageX/100}px ${pageY/100}px`}}></div>
        </header>:null}
        </>
    )
}

export  default React.memo(TopBar)