import React, { useEffect, useReducer } from "react"
import styles from "./filterSearch.module.css"
import reducer from "./engineFilterReducer"
import CheckBoxEmpty from "../../assets/svg/checkboxEmpty"
import CheckBoxFilled from "../../assets/svg/checkBoxFilled"
import filtersObject from "../Context/filtersObject"
function EngineFilter(props)
{
    
    const setInitialState = () =>
    {   
        const engine = JSON.parse(sessionStorage.getItem('engine'))
        if(engine)
        {
            return engine
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

        filtersObject.engine = [...newArr]
    },[state])



    useEffect(()=>{
        if(props.resetFilters)
        {
            dispach({type:'reset'})
        }
    },[props.resetFilters])


    return(
        <div className={styles.menuContainer}>
            <div className={styles.option} onClick={e=>dispach({type:'benzyna'})}>{state.benzyna?<CheckBoxFilled />:<CheckBoxEmpty />} Benzynowy</div>
            <div className={styles.option} onClick={e=>dispach({type:'benzynaLPG'})}>{state.benzynaLPG?<CheckBoxFilled />:<CheckBoxEmpty />} Benzynowy + LPG</div>
            <div className={styles.option} onClick={e=>dispach({type:'diesel'})}>{state.diesel?<CheckBoxFilled />:<CheckBoxEmpty />} Diesel</div>
            <div className={styles.option} onClick={e=>dispach({type:'electric'})}>{state.electric?<CheckBoxFilled />:<CheckBoxEmpty />} Elektryczny</div>
            <div className={styles.option} onClick={e=>dispach({type:'hybrid'})}>{state.hybrid?<CheckBoxFilled />:<CheckBoxEmpty />} Hybrydowy</div>
            <div className={styles.optionsLineBreak}></div>
        </div>
    )
}

export default React.memo(EngineFilter)