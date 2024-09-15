import React, { useEffect, useReducer } from "react"
import styles from "./filterSearch.module.css"
import reducer from "./yearFiltersReducer"
import CheckBoxEmpty from "../../assets/svg/checkboxEmpty"
import CheckBoxFilled from "../../assets/svg/checkBoxFilled"
import filtersObject from "../Context/filtersObject"
function YearFilters(props)
{
    
    const setInitialState = ()=>
    {
        const year = JSON.parse(sessionStorage.getItem('year'))
        if(year)
        {
            return year
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

        filtersObject.year = [...newArr]
    },[state])

    useEffect(()=>{
        if(props.resetFilters)
        {
            dispach({type:'reset'})
        }
    },[props.resetFilters])

    return(
        <div className={styles.menuContainer}>
            <div className={styles.option} onClick={e=>dispach({type:'teens'})}>{state.teens?<CheckBoxFilled />:<CheckBoxEmpty />} 2010 - teraz</div>
            <div className={styles.option} onClick={e=>dispach({type:'thousands'})}>{state.thousands?<CheckBoxFilled />:<CheckBoxEmpty />} 2000 - 2009</div>
            <div className={styles.option} onClick={e=>dispach({type:'nineteens'})}>{state.nineteens?<CheckBoxFilled />:<CheckBoxEmpty />} 1990 - 1999</div>
            <div className={styles.option} onClick={e=>dispach({type:'eighteens'})}>{state.eighteens?<CheckBoxFilled />:<CheckBoxEmpty />} 1980 - 1989</div>
            <div className={styles.option} onClick={e=>dispach({type:'seventeens'})}>{state.seventeens?<CheckBoxFilled />:<CheckBoxEmpty />} 1970 - 1979</div>
            <div className={styles.option} onClick={e=>dispach({type:'sixteens'})}>{state.sixteens?<CheckBoxFilled />:<CheckBoxEmpty />} 1960 - 1969</div>
            <div className={styles.option} onClick={e=>dispach({type:'others'})}>{state.others?<CheckBoxFilled />:<CheckBoxEmpty />} Starsze</div>
            <div className={styles.optionsLineBreak}></div>
        </div>
    )
}

export default React.memo(YearFilters)