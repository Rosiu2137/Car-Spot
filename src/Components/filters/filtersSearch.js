import { useEffect, useReducer, useState } from "react"
import styles from "./filterSearch.module.css"
import IconNextPage from "../../assets/svg/Icon-nextPage"
import BrandFilters from "./brandFilters"
import reducer from './filtersSearchReducer'
 import React from "react"
import EngineFilter from "./engineFilter"
import YearFilters from "./yearFilters"
import DistanceFilter from "./distanceFilter"
import CityFilter from "./cityFilter"
import PriceFilter from "./priceFilter"
import SaveChanges from "./saveChanges"
import DeleteFilters from "./deleteFilters"
function FilterSearch(props)
{
   

    const [displayItems,dispach] = useReducer(reducer,{})


    

    return(
        <aside className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div onClick={props.setOpenFilters}><IconNextPage /></div>
                    <h1>Filtruj</h1>

                </div>

               <PriceFilter resetFilters={props.resetFilters}/>

                <div className={styles.optionsLineBreak}></div>
                <div className={styles.item} onClick={e=>dispach({type:'changeBrand'})}>
                    <div className={`${styles.svgContainer} ${displayItems.brand?styles.rotated:null}`} ><IconNextPage /></div> Marka
                </div>
                <div className={styles.optionsLineBreak}></div>
                {displayItems.brand?<BrandFilters resetFilters={props.resetFilters}/>:null}

                <div className={styles.item} onClick={e=>dispach({type:'changeEngine'})}>
                    <div className={`${styles.svgContainer} ${displayItems.engine?styles.rotated:null}`} ><IconNextPage /></div> Silnik
                </div>
                <div className={styles.optionsLineBreak}></div>
                {displayItems.engine?<EngineFilter resetFilters={props.resetFilters}/>:null}

                <div className={styles.item} onClick={e=>dispach({type:'changeYear'})}>
                    <div className={`${styles.svgContainer} ${displayItems.year?styles.rotated:null}`} ><IconNextPage /></div> Lata Produkcji
                </div>
                <div className={styles.optionsLineBreak}></div>
                {displayItems.year?<YearFilters resetFilters={props.resetFilters}/>:null}

                <div className={styles.item} onClick={e=>dispach({type:'changeDistance'})}>
                    <div className={`${styles.svgContainer} ${displayItems.distance?styles.rotated:null}`} ><IconNextPage /></div> Przebieg
                </div>
                <div className={styles.optionsLineBreak}></div>
                {displayItems.distance?<DistanceFilter resetFilters={props.resetFilters}/>:null}

               
                <div className={styles.item} onClick={e=>dispach({type:'changeCity'})}>
                    <div className={`${styles.svgContainer} ${displayItems.city?styles.rotated:null}`} ><IconNextPage /></div> Miasto
                </div>
                <div className={styles.optionsLineBreak}></div>
                {displayItems.city?<CityFilter resetFilters={props.resetFilters}/>:null}
                
                <SaveChanges setOpenFilters={props.setOpenFilters}/>
               
                <DeleteFilters deleteFilters={props.deleteFilters} setOpenFilters={props.setOpenFilters?props.setOpenFilters:null}/>

            </div>


            <div className={styles.lineBreak}></div>


        </aside>
    )
}

export default React.memo(FilterSearch)