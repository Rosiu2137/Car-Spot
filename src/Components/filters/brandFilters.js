import { useEffect, useReducer, useRef, useState } from 'react'
import styles from './filterSearch.module.css'
import React from 'react'
import reducer from './brandReducer'
import CheckBoxEmpty from '../../assets/svg/checkboxEmpty'
import CheckBoxFilled from '../../assets/svg/checkBoxFilled'
import filtersObject from '../Context/filtersObject'

function BrandFilters(props)
{

    const setInitialState = ()=>
    {
        const brand = JSON.parse(sessionStorage.getItem('brand'))
        if(brand)
        {
            return brand
        }
        else
        {
            return {}
        }
    }

   const [state,dispach] = useReducer(reducer,setInitialState())

    useEffect(()=>{
       
        const newArr = []
        const arr = Object.entries(state)
        arr.forEach(x=>{
            if(x[1])
            {
                newArr.push(x[0])
            }
        })

        filtersObject.brand = [...newArr]
    },[state])


    useEffect(()=>{
        if(props.resetFilters)
        {
            dispach({type:'reset'})
        }
    },[props.resetFilters])


    return(
        <div className={styles.menuContainer}>
            <div className={styles.brandMenuContainer}>
            <div className={styles.option} onClick={e=>dispach({type:'alfaRomeo'})}>{state.alfaRomeo?<CheckBoxFilled />:<CheckBoxEmpty />} Alfa Romeo</div>
            <div className={styles.option} onClick={e=>dispach({type:'alpine'})}>{state.alpine?<CheckBoxFilled />:<CheckBoxEmpty />} Alpine</div>
            <div className={styles.option} onClick={e=>dispach({type:'astonMartin'})}>{state.astonMartin?<CheckBoxFilled />:<CheckBoxEmpty />} Aston Martin</div>
            <div className={styles.option} onClick={e=>dispach({type:'audi'})}>{state.audi?<CheckBoxFilled />:<CheckBoxEmpty />} Audi</div>
            <div className={styles.option} onClick={e=>dispach({type:'BMW'})}>{state.BMW?<CheckBoxFilled />:<CheckBoxEmpty />} BMW</div>
            <div className={styles.option} onClick={e=>dispach({type:'bentley'})}>{state.bentley?<CheckBoxFilled />:<CheckBoxEmpty />} Bentley</div>
            <div className={styles.option} onClick={e=>dispach({type:'cadillac'})}>{state.cadillac?<CheckBoxFilled />:<CheckBoxEmpty />} Cadillac</div>
            <div className={styles.option} onClick={e=>dispach({type:'chevrolet'})}>{state.chevrolet?<CheckBoxFilled />:<CheckBoxEmpty />} Chevrolet</div>
            <div className={styles.option} onClick={e=>dispach({type:'citroen'})}>{state.citroen?<CheckBoxFilled />:<CheckBoxEmpty />} Citroen</div>
            <div className={styles.option} onClick={e=>dispach({type:'cupra'})}>{state.cupra?<CheckBoxFilled />:<CheckBoxEmpty />} Cupra</div>
            <div className={styles.option} onClick={e=>dispach({type:'dacia'})}>{state.dacia?<CheckBoxFilled />:<CheckBoxEmpty />} Dacia</div>
            <div className={styles.option} onClick={e=>dispach({type:'dodge'})}>{state.dodge?<CheckBoxFilled />:<CheckBoxEmpty />} Dodge</div>
            <div className={styles.option} onClick={e=>dispach({type:'ferrari'})}>{state.ferrari?<CheckBoxFilled />:<CheckBoxEmpty />} Ferrari</div>
            <div className={styles.option} onClick={e=>dispach({type:'fiat'})}>{state.fiat?<CheckBoxFilled />:<CheckBoxEmpty />} Fiat</div>
            <div className={styles.option} onClick={e=>dispach({type:'ford'})}>{state.ford?<CheckBoxFilled />:<CheckBoxEmpty />} Ford</div>
            <div className={styles.option} onClick={e=>dispach({type:'honda'})}>{state.honda?<CheckBoxFilled />:<CheckBoxEmpty />} Honda</div>
            <div className={styles.option} onClick={e=>dispach({type:'hyundai'})}>{state.hyundai?<CheckBoxFilled />:<CheckBoxEmpty />} Hyundai</div>
            <div className={styles.option} onClick={e=>dispach({type:'jaguar'})}>{state.jaguar?<CheckBoxFilled />:<CheckBoxEmpty />} Jaguar</div>
            <div className={styles.option} onClick={e=>dispach({type:'jeep'})}>{state.jeep?<CheckBoxFilled />:<CheckBoxEmpty />} Jeep</div>
            <div className={styles.option} onClick={e=>dispach({type:'kia'})}>{state.kia?<CheckBoxFilled />:<CheckBoxEmpty />} Kia</div>
            <div className={styles.option} onClick={e=>dispach({type:'laborghini'})}>{state.laborghini?<CheckBoxFilled />:<CheckBoxEmpty />} Laborghini</div>
            <div className={styles.option} onClick={e=>dispach({type:'landRover'})}>{state.landRover?<CheckBoxFilled />:<CheckBoxEmpty />} Land Rover</div>
            <div className={styles.option} onClick={e=>dispach({type:'lexus'})}>{state.lexus?<CheckBoxFilled />:<CheckBoxEmpty />} Lexus</div>
            <div className={styles.option} onClick={e=>dispach({type:'mazda'})}>{state.mazda?<CheckBoxFilled />:<CheckBoxEmpty />} Mazda</div>
            <div className={styles.option} onClick={e=>dispach({type:'mclaren'})}>{state.mclaren?<CheckBoxFilled />:<CheckBoxEmpty />} McLaren</div>
            <div className={styles.option} onClick={e=>dispach({type:'mercedesBenz'})}>{state.mercedesBenz?<CheckBoxFilled />:<CheckBoxEmpty />} Mercedes-Benz</div>
            <div className={styles.option} onClick={e=>dispach({type:'nissan'})}>{state.nissan?<CheckBoxFilled />:<CheckBoxEmpty />} Nissan</div>
            <div className={styles.option} onClick={e=>dispach({type:'opel'})}>{state.opel?<CheckBoxFilled />:<CheckBoxEmpty />} Opel</div>
            <div className={styles.option} onClick={e=>dispach({type:'peugeot'})}>{state.peugeot?<CheckBoxFilled />:<CheckBoxEmpty />} Peugeot</div>
            <div className={styles.option} onClick={e=>dispach({type:'porsche'})}>{state.porsche?<CheckBoxFilled />:<CheckBoxEmpty />} Porsche</div>
            <div className={styles.option} onClick={e=>dispach({type:'renault'})}>{state.renault?<CheckBoxFilled />:<CheckBoxEmpty />} Renault</div>
            <div className={styles.option} onClick={e=>dispach({type:'skoda'})}>{state.skoda?<CheckBoxFilled />:<CheckBoxEmpty />} Skoda</div>
            <div className={styles.option} onClick={e=>dispach({type:'suzuki'})}>{state.suzuki?<CheckBoxFilled />:<CheckBoxEmpty />} Suzuki</div>
            <div className={styles.option} onClick={e=>dispach({type:'tesla'})}>{state.tesla?<CheckBoxFilled />:<CheckBoxEmpty />} Tesla</div>
            <div className={styles.option} onClick={e=>dispach({type:'toyota'})}>{state.toyota?<CheckBoxFilled />:<CheckBoxEmpty />} Toyota</div>
            <div className={styles.option} onClick={e=>dispach({type:'volkswagen'})}>{state.volkswagen?<CheckBoxFilled />:<CheckBoxEmpty />} Volkswagen</div>
            <div className={styles.option} onClick={e=>dispach({type:'volvo'})}>{state.volvo?<CheckBoxFilled />:<CheckBoxEmpty />} Volvo</div>
            
        </div>

            <div className={styles.optionsLineBreak2}></div>
        </div>
    )
}

export default React.memo(BrandFilters)