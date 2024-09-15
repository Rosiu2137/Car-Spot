import React, { useEffect, useRef, useState } from "react";
import styles from './content.module.css'
function TopMenu(props)
{
   

    const ref = useRef(null)

    const setValue=()=>
    {
       
        props.setValue(ref.current.value)
    }

    const setQuantityOffers = ()=>
    {
        if(props.quantity==1)
        {
            return 'ofertę'
        }
        else if(props.quantity == 2 || props.quantity == 3 || props.quantity == 4)
        {
            return 'oferty'
        }
        else
        {
            return 'ofert'
        }
    }

    return (
        <div className={styles.topMenu}>
            <div className={styles.leftLine}></div>
            <div className={styles.found}>
                Znaleziono {props.quantity} {setQuantityOffers()}
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.filters} onClick={props.setOpenFilters}>Filtry</div>
            <div className={styles.centerLine}></div>
            <div className={styles.sort}>
                
                <span>Sortuj według:</span>
                <select className={styles.select} onChange={setValue} ref={ref}>
                    <option selected={props.resetInputArea}>Największa Trafność</option>
                    <option selected={false}>Cena od najniższej</option>
                    <option selected={false}>Cena od najwyższej</option>
                </select>
                
            </div>
            <div className={styles.rightLine}></div>
        </div>
    )
}

export default React.memo(TopMenu)