import React,{useEffect, useState} from "react";
import styles from './filterSearch.module.css'
import filtersObject from "../Context/filtersObject";
function PriceFilter(props)
{
    const [state,setState] = useState({priceDown:+filtersObject.priceDown,priceUp:+filtersObject.priceUp})

    const updateState=(action,value)=>
    {
        const newState = {...state}
        switch(action)
        {
            case 'down':
                
                newState.priceDown = value
                break;
            case 'up':
                
                newState.priceUp = value
                break;
        }

        setState(newState)
    }

    useEffect(()=>{
        filtersObject.priceDown = state.priceDown
        filtersObject.priceUp = state.priceUp
    },[state])

    useEffect(()=>{
        if(props.resetFilters)
        {
            setState({priceDown:+filtersObject.priceDown,priceUp:+filtersObject.priceUp})
        }
    },[props.resetFilters])

    return(
        <div className={styles.price}>
        <div className={styles.priceHeader}>
            <div className={styles.line}></div>
            <div className={styles.priceHeaderContent}>Cena</div>
            <div className={styles.line}></div>
        </div>
        <input type="number" className={styles.input} value={+state.priceDown?state.priceDown:''} onChange={e=>updateState('down',e.target.value)} placeholder="Od" ></input>
        <div className={styles.minus}>-</div>
        <input type="number" className={styles.input} value={+state.priceUp?state.priceUp:''} onChange={e=>updateState('up',e.target.value)} placeholder="Do" ></input>
        <div className={styles.horizontalBreak}></div>
    </div>
    )
}

export default React.memo(PriceFilter)