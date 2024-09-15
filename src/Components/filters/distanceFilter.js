import { useEffect, useState } from 'react'
import styles from './filterSearch.module.css'
import React from 'react'
import filtersObject from '../Context/filtersObject'
function DistanceFilter(props)
{
    const [distanceDown,setDistanceDown] = useState(+filtersObject.distanceDown)
    const [distanceUp,setDistanceUp] = useState(+filtersObject.distanceUp)

    useEffect(()=>{
        filtersObject.distanceDown = distanceDown
    },[distanceDown])

    useEffect(()=>{
        filtersObject.distanceUp = distanceUp
    },[distanceUp])

    useEffect(()=>{
        if(props.resetFilters)
        {
            setDistanceDown(+filtersObject.distanceDown)
            setDistanceUp(+filtersObject.distanceUp)
        }
    },[props.resetFilters])

    return(
        <div className={`${styles.price} ${styles.price2}`}>
        <input type="number" className={styles.input} value={+distanceDown?distanceDown:''} onChange={e=>setDistanceDown(e.target.value)} placeholder="Od" ></input>
        <div className={styles.minus}>-</div>
        <input type="number" className={styles.input} value={+distanceUp?distanceUp:''} onChange={e=>setDistanceUp(e.target.value)} placeholder="Do" ></input>
        <div className={styles.optionsLineBreak}></div>
    </div>
    )
}

export default React.memo(DistanceFilter)