import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import styles from './goaway.module.css'
import { Link, useHref, useNavigate, useParams } from "react-router-dom"

import IconNextPage from "../../assets/svg/Icon-nextPage"

function GoAway(props) 
{
   
    const divider = 10

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const goBackRef = useRef()
    const goForwardRef = useRef()

    const params = useParams()
    const navigate=useNavigate()

    const [maxPage,setMaxPage] = useState()
    const [actuallPage,setActuallPage] = useState(1)

    const setMPage = ()=>
    {
        
        setMaxPage(Math.ceil(Object.values(props.data).length / divider))
    }
    const getActuallyPage = ()=>
    {
        setActuallPage(Number(params.pageNumber))
    }

    const setClases = ()=>
    {
        if(Number(params.pageNumber) === 1)
        {
            goBackRef.current.classList.remove(`enabledbtn`)
            if(maxPage == 1)
            {
                goForwardRef.current.classList.remove(`enabledbtn`)
            }
            else
            {
                goForwardRef.current.classList.add(`enabledbtn`)

            }
            
            ref1.current.classList.remove(`enabled`)
            ref1.current.classList.add(`actuallyPage`)
            if(maxPage > 1)
            {
                ref2.current.classList.remove(`actuallyPage`)
                ref2.current.classList.add(`enabled`)

            }
            if(maxPage > 2)
            {
                ref3.current.classList.remove(`actuallyPage`)
                ref3.current.classList.add(`enabled`)

            }
        }
        else if(Number(params.pageNumber) == maxPage)
        {
            goForwardRef.current.classList.remove(`enabledbtn`)
            goBackRef.current.classList.add(`enabledbtn`)
            ref1.current.classList.remove(`actuallyPage`)
            ref1.current.classList.add(`enabled`)
            if(maxPage == 2)
            {
                ref2.current.classList.remove(`enabled`)
                ref2.current.classList.add(`actuallyPage`)

            }
            if(maxPage > 2)
            {
                ref2.current.classList.remove(`actuallyPage`)
                ref2.current.classList.add(`enabled`)
                ref3.current.classList.remove(`enabled`)
                ref3.current.classList.add(`actuallyPage`)

            }
        }
        else
        {
            goForwardRef.current.classList.add(`enabledbtn`)
            goBackRef.current.classList.add(`enabledbtn`)
            ref1.current.classList.remove(`actuallyPage`)
            ref1.current.classList.add(`enabled`)
            
            if(maxPage > 1)
            {
                ref2.current.classList.remove(`actuallyPage`)
                ref2.current.classList.add(`enabled`)
                ref2.current.classList.remove(`enabled`)
                ref2.current.classList.add(`actuallyPage`)

            }
            if(maxPage > 2)
            {
                ref3.current.classList.remove(`actuallyPage`)
                ref3.current.classList.add(`enabled`)

            }
        }
    }
    const pageOverflow = ()=>
    {
        if(params.pageNumber > maxPage)
        {
            navigate(`/search/${params.phrase}/1`)
        }
    }

    useEffect(()=>{
       
        window.scroll(0,0)
    },[params])

    useEffect(()=>{
        setMPage()
        getActuallyPage()
        setClases()
        pageOverflow()
    },[params,props.data])

    const element1click = (e)=>
    {
        if(actuallPage == 1 || actuallPage == 2)
        {
            navigate(`/search/${params.phrase}/1`)
        }
        else if(actuallPage == maxPage)
        {
            navigate(`/search/${params.phrase}/${actuallPage - 2}`)
        }
        else
        {
            navigate(`/search/${params.phrase}/${actuallPage- 1}`)
        }
        
    }
    const element2click = ()=>
    {
        if(actuallPage == 1 || actuallPage == 2)
        {
            navigate(`/search/${params.phrase}/2`)
        }
        else if(actuallPage == maxPage)
        {
            navigate(`/search/${params.phrase}/${actuallPage - 1}`)
        }
       

       
    }
    const element3click = ()=>
    {
        if(actuallPage == 1)
        {
            navigate(`/search/${params.phrase}/3`)

        }
        else if(actuallPage == maxPage)
        {

        }
        else
        {
            navigate(`/search/${params.phrase}/${actuallPage + 1}`)

        }
    }
    const lastpage = ()=>
    {
        navigate(`/search/${params.phrase}/${maxPage}`)
    }
    const pageBack = ()=>
    {
        if(Number(params.pageNumber) - 1 > 0)
        {

            navigate(`/search/${params.phrase}/${Number(params.pageNumber) - 1}`)
        }
    }
    const pageForward=()=>
    {
        if(Number(params.pageNumber) + 1 <= maxPage)
        {

            navigate(`/search/${params.phrase}/${Number(params.pageNumber) + 1}`)
        }
    }

    

    return(
        <div className={styles.container} >
           
           <div className={`${styles.itemNext} ${styles.rotated}`} onClick={pageBack} ref={goBackRef}><IconNextPage /></div>

            <div ref={ref1} className={`${styles.item}`}onClick={element1click}>{actuallPage == 1 || actuallPage ==2?"1":(actuallPage < maxPage?actuallPage - 1:actuallPage - 2)}</div>

            {maxPage > 1?
                <div ref={ref2} className={`${styles.item}`} onClick={element2click}>{actuallPage == 1 || actuallPage ==2?"2":(actuallPage < maxPage?actuallPage:actuallPage - 1)}</div>
            :null}

            {maxPage >2?
            <div ref={ref3} className={`${styles.item}`} onClick={element3click}>{actuallPage == 1?"3":(actuallPage < maxPage?actuallPage + 1:actuallPage)}</div>
            :null}

            {maxPage >3?
            <>
                {actuallPage+1 < maxPage?
                <div className={`${styles.item} ${styles.disabled}`} >
                ...
                </div>:null}
                {actuallPage + 1 < maxPage?
                <div className={`${styles.item} enabled`} onClick={lastpage}>
                    {maxPage}
                </div>:null}

            </>:null}
            

            <div className={styles.itemNext} onClick={pageForward} ref={goForwardRef}><IconNextPage /></div>
        </div>
    )
}

export default GoAway