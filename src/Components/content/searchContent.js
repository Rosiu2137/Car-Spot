import React from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import styles from './content.module.css'
import { useEffect, useState } from 'react'
import getBackendOfferts from '../backendofferts/backendofferts'
import LoadingFrontImg from '../../assets/svg/loadingFrontimg'
import ServerNotResponding from '../errors/serverNotResponding'
import Offert from '../offert/Offert'
import OffertNotFound from '../errors/offertsNotFound'
import sortPrimed from '../sorts/sortPrimed'
import GoAway from '../goAway/goAway'
import FilterSearch from '../filters/filtersSearch'
import ApplyFiltersContext from '../Context/aplyFiltersContext'
import setFilteredOfferts from '../filters/setFilteredOfferts'
import deletePolishSymbols from '../../assets/helpers/deletePolishSymbols'
import TopMenu from './TopMenu'
import sortPriceDown from '../sorts/sortPriceDown'
import sortPriceUp from '../sorts/sortPriceUp'
import IconOffertNotFound from '../../assets/svg/icon-OffertNotFound'
import filtersObject from '../Context/filtersObject'
import sortRandom from '../sorts/sortRandom'
import filterContentDefaultOffers from './filterContentDefaultOffers'
function SearchContent(props)
{

    const searchingParam = useParams().phrase
    const pageParam = Number(useParams().pageNumber)
    const[loading,setLoading] = useState(true)
    const[err,setErr] = useState(null)
    const [rerendering,setRerendering] = useState(false)
    const[data,setData]=useState(0)
    const [searchingData,setSearchingData] = useState(0)
    const [filteredFullData,setFilteredFullData] = useState(0)
    const[filteredData,setFilteredData] = useState(null)
    const[sortInputValue,setSortInputValue] = useState('Największa Trafność')
    const[offersNotFound,setOffersNotFound] = useState(false)
    const [openFilters,setOpenFilters] = useState(false)
    const [width,setWidth] = useState(true)
    const [resetFilters,SetResetFilters] = useState(false)
    const [resetInputArea,setResetInputArea] = useState(false)
    const navigate = useNavigate()

    const setSortedDate = ()=>
    {
        if(sortInputValue == 'Cena od najniższej')
        {
            setFilteredFullData(sortPriceDown(filteredFullData))
            setDisplayElement(filteredFullData)
        }
        else if(sortInputValue == 'Cena od najwyższej')
        {
            setFilteredFullData(sortPriceUp(filteredFullData))
            setDisplayElement(filteredFullData)
        }
        else if(sortInputValue == 'Największa Trafność')
        {
            setFilteredFullData(sortPrimed(filteredFullData))
            setDisplayElement(filteredFullData)
        }
    }
    
    const getBackendOff = async()=>
    {
        const data = await getBackendOfferts()
        if(data)
        {   
            sortRandom(data)
            setData(sortPrimed(data))
        }
        else
        { 
            setErr('Ups... Server nie odpowiada! Spróbuj ponownie')
        }
    }

    const setStart=()=>
    {
        if(pageParam == 1)
        {
            return 0
        }
        else
        {
            return pageParam *10 - 10
        }
    }
    const setEnd = (start)=>
    {
        if(start == 1)
        {
            return 10
        }
        else
        {
            return start + 9
        }
    }

    const setDisplayElement = (newFilteredOffertsData)=>
    {
        const start=setStart()
        const end=setEnd(start)
        const newOffertsData = []
        for(let i = start;i<=end;i++)
        {
            if(newFilteredOffertsData[i])
            {
                newOffertsData.push(newFilteredOffertsData[i])
            }
        }
        setFilteredFullData(newFilteredOffertsData)
        setFilteredData(newOffertsData)
    }

    const setSearchingOfferts =()=>
    { 
        const newFilteredOffertsData = []
        for(let i = 0;i<data.length;i++)
        {
           if(deletePolishSymbols((data[i].name).toLowerCase()).includes(deletePolishSymbols(searchingParam.toLowerCase())))
            {
                newFilteredOffertsData.push(data[i])
            }
        }

       if(newFilteredOffertsData.length == 0)
       {
            setFilteredData(null)
       }
       else
       {
           setSearchingData(newFilteredOffertsData)
           setDisplayElement(newFilteredOffertsData)   
       }
       setLoading(false)
       setRerendering(true)
    }

    const filtrate = ()=>
    {
        const data2 = {...searchingData} 
        const dataFiltered = setFilteredOfferts(data2)
        setDisplayElement(Object.values(dataFiltered))
    }

    useEffect(()=>{
        setDisplayElement(filteredFullData)
    },[pageParam])

    useEffect(()=>
    {
        if(rerendering)
        {
            setSearchingOfferts()
        }
    },[searchingParam])

    useEffect(()=>{
       getBackendOff()
    },[])

    const setContentDefaultSearchingOffers =()=>
    {
        const newFilteredOffertsData = filterContentDefaultOffers(data,props.searchingData)
        
        if(newFilteredOffertsData.length == 0)
        {
            setFilteredData(null)
        }
        else
        {
            setSearchingData(newFilteredOffertsData)
            setDisplayElement(newFilteredOffertsData)   
        }
       setLoading(false)
       setRerendering(true)
    }

    useEffect(()=>{
        if(data)
        {
            if(props.searchingData)
            {
                setContentDefaultSearchingOffers()
            }
            else
            {
                setSearchingOfferts() 

            }
        }
    },[data])
 
    useEffect(()=>{
        if(filteredFullData)
        {
            filteredFullData.forEach((x,idx) => {
                x.index = idx
            });
            setSortedDate()
        }
    },[filteredFullData])

    useEffect(()=>{
        if(filteredData)
         {
             setSortedDate()
         }
     },[sortInputValue])

     useEffect(()=>{
        if(filteredFullData.length == 0)
        {
            setOffersNotFound(true)
        }
        else
        {
            setOffersNotFound(false)
        }
        const maxPage = Math.ceil(filteredFullData.length /10)
        if(pageParam > maxPage)
        {
            navigate(`/search/${searchingParam}/1`)
            if(maxPage != 0)
            {
                filtrate() 

            }

            
        }
     },[filteredFullData])

     const setActuallyFilters = ()=>
     {
        setOpenFilters(!openFilters)
     }

     

     function getWindowWidth()
     {
      
        if(window.innerWidth>950)
        {
            setWidth(true)
        }
        else
        {
            setWidth(false)
        }
     }

     

     useEffect(()=>{
        getWindowWidth()
        window.addEventListener('resize',getWindowWidth)
        return ()=>
        {
            sessionStorage.removeItem('brand')
            sessionStorage.removeItem('engine')
            sessionStorage.removeItem('year')
        }
    },[])

  

    const deleteFilters = ()=>
    {
        
        window.scroll(0,0)
        filtersObject.priceDown = 0
        filtersObject.priceUp = 0
        filtersObject.city = ''
        filtersObject.distanceDown = 0
        filtersObject.distanceUp = 0
        filtersObject.engine = {}
        filtersObject.brand = {}
        filtersObject.year = {}
        sessionStorage.removeItem('brand')
        sessionStorage.removeItem('engine')
        sessionStorage.removeItem('year')
        filtrate()
        SetResetFilters(true)
    }
    useEffect(()=>{
        SetResetFilters(false)
    },[resetFilters])

    useEffect(()=>{
        window.scroll(0,0)
        filtersObject.priceDown = 0
        filtersObject.priceUp = 0
        filtersObject.city = ''
        filtersObject.distanceDown = 0
        filtersObject.distanceUp = 0
        filtersObject.engine = {}
        filtersObject.brand = {}
        filtersObject.year = {}
        sessionStorage.removeItem('brand')
        sessionStorage.removeItem('engine')
        sessionStorage.removeItem('year')
        SetResetFilters(true)
        setSortInputValue('Największa Trafność')
        setResetInputArea(true)
        setFilteredFullData(0)
        setSearchingOfferts()
    },[searchingParam])

    useEffect(()=>{
        setResetInputArea(false)
    },[resetInputArea])


    useEffect(()=>{
        document.title = 'Szukaj Oferty'
      },[])

    return(
        <article className={styles.hugeContent}>
            {width?
            <div className={styles.normalFilters}>
            <ApplyFiltersContext.Provider value={{applyFilters:filtrate}} >
                <FilterSearch deleteFilters={deleteFilters} resetFilters={resetFilters}/>
            </ApplyFiltersContext.Provider>
            </div>:null}
           
            <div className={styles.contentSearch}>
                  {openFilters?<>{!width?
                <div className={styles.filtersResponsive}>
                <ApplyFiltersContext.Provider value={{applyFilters:filtrate}}>
                    <FilterSearch setOpenFilters={setActuallyFilters} deleteFilters={deleteFilters} resetFilters={resetFilters}/>
                </ApplyFiltersContext.Provider>
                </div>:null}
                 </>:null}
                <TopMenu quantity={filteredData?Object.values(filteredFullData).length:0} setValue={setSortInputValue} setOpenFilters={setActuallyFilters} resetInputArea={resetInputArea}/>
                {offersNotFound?<div className={styles.filteredOffersNotFound}><IconOffertNotFound /><span>Nie znaleziono żadnych ofert</span></div>:<>
                
                {loading?<LoadingFrontImg />:(!err?(filteredData?filteredData.map((x,idx)=><Offert key={idx} {...x} />):<OffertNotFound />):<ServerNotResponding img={true} message={err} />)}
                {filteredData?<GoAway data={filteredFullData} />:null}</>}
            </div>

        </article>
    )
}
export default React.memo(SearchContent)
