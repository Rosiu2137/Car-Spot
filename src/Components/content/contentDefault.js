import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react"
import styles from './contentDefaul.module.css'
import HomeOffer from "../offert/homeOffer"
import getBackendOffer from '../backendofferts/backendofferts'
import LoadingFrontImg from '../../assets/svg/loadingFrontimg'
import ServerNotResponding from '../errors/serverNotResponding'
import axios from "axios"
import Offert from '../offert/Offert'
import LatestOffer from "../offert/latestOffer"
import IconNextPage from '../../assets/svg/Icon-nextPage'
function ContentDefault(props)
{
    const imgRef = useRef(null)
    const standPhotoRef = useRef(null)
    const [primedOffer,setPrimedOffer] = useState([])
    const [serverError,setServerError] = useState(false)
    const[offerLoading,setOfferLoading] = useState(true)
    const backgroundNextRef = useRef(null)
    const [dealers,setDealer] = useState('-')
    const [offersQuantity,setOffersQuantity] = useState('-')
    const [primedOfferLoading,setPrimedOfferLoading] = useState(true)
    const [offer,setOffer] = useState([])
    const [latestOffers,setLatestOffers] = useState([])
    
    const [model,setModel] = useState('')
    const [priceDown,setPriceDown] = useState('')
    const [priceUp,setPriceUp] = useState('')



    const getLatestOffer = async(offers)=>
    {
        const storage = JSON.parse(localStorage.getItem('latest'))
        if(storage)
        {
            try
            {
                const found = []
                for(let i =0;i<storage.length;i++)
                {
                    const toPush = offers.find(x=>x.id == storage[i])
                    if(!toPush)
                    {
                        storage.splice(i,1)
                        localStorage.setItem('latest',JSON.stringify(storage))
                        getLatestOffer()
                    }
                    found.push(toPush)
                }
               setLatestOffers(found)
            }
            catch(ex)
            {
                setLatestOffers([])
            }
        }
        else
        {
            setLatestOffers([])
        }
    }

    const getOffer = async()=>
    {
        try
        {
            const response = await getBackendOffer()
            const filtered = response.filter(x=>x.primed)
            const offer = []
            for(let i =0 ;i<6;i++)
            {
                const random = Math.floor(Math.random()*filtered.length)
                if(offer.includes(filtered[random]))
                {
                    i--
                }
                else
                {
                    offer.push(filtered[random])
                   

                }
            }
            setServerError(false)
            setPrimedOffer(offer)
            getLatestOffer(response)
            setOfferLoading(false)
        }
        catch(ex)
        {
            setLatestOffers([])
            setPrimedOffer([])
            setServerError(true)
            setOfferLoading(false)
        }
    }

    const setTopParamStandPhoto = ()=>
    {
        const navbarHeight = document.querySelector('#navbar').clientHeight
        standPhotoRef.current.style.top = `${navbarHeight}px`
    }


    const imgsAnimation = async()=>
    {
        const imgs = [...document.querySelectorAll(".brandImg")]
        imgs[0].style.translate = `0px`
        for(let i = 1;i<4;i++)
        {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    imgs[i].style.translate = `0px`
                    resolve()
                }, 200);
            })
            
        }
    }

    const otherSponsorsAnimation = async()=>
    {
        const imgs = [...document.querySelectorAll('.otherSponsors')]
        imgs[0].style.opacity = `1`
        imgs[0].style.scale = `1`
        for(let i=1;i<3;i++)
        {
            await new Promise((resolve,reject)=>{
                setTimeout(() => {
                    imgs[i].style.opacity = `1`
                    imgs[i].style.scale = `1`
                    resolve()
                }, 400);
            })
        }
    }

    const windowScroll = async(e)=>
    {
        const navbarHeight = document.querySelector('#navbar').clientHeight

        if(backgroundNextRef.current)
        {
        if(backgroundNextRef.current.getBoundingClientRect().y-navbarHeight-300 <= 0)
        {
            if(window.innerWidth > 950)
            {
                const imgs = [...document.querySelectorAll('.showingPhotos')]
                const descriptions = [...document.querySelectorAll('.descriptionPhotos')]
                imgs[0].style.opacity = `1`
                descriptions[0].style.opacity = `1`
                descriptions[0].style.scale = `1`
                for(let i =1;i<3;i++)
                {
                    await new Promise((resolve, reject) => {
                         setTimeout(() => {
                            imgs[i].style.opacity = '1'
                            descriptions[i].style.opacity = `1`
                            descriptions[i].style.scale = `1`
                            resolve()
                        }, 800);
                    })
                }
            }
            else
            {
                const imgs = [...document.querySelectorAll('.showingPhotos2')]
                const descriptions = [...document.querySelectorAll('.descriptionPhotos2')]
                imgs[0].style.opacity = `1`
                descriptions[0].style.opacity = `1`
                descriptions[0].style.scale = `1`
                if(backgroundNextRef.current.getBoundingClientRect().y-navbarHeight+(window.innerHeight * 0.1) <= 0)
                {
                    imgs[1].style.opacity = '1'
                    descriptions[1].style.opacity = `1`
                    descriptions[1].style.scale = `1`
                }
                if(backgroundNextRef.current.getBoundingClientRect().y-navbarHeight+(window.innerHeight * 0.5) <= 0)
                {
                    imgs[2].style.opacity = '1'
                    descriptions[2].style.opacity = `1`
                    descriptions[2].style.scale = `1`
                }
                
            }
           
        }
        
        }
    }

    const getDealers = async()=>
    {
 
        try
        {   
           const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
           const users = Object.values(response.data).length
           setDealer(`${users}`)
        }
        catch(ex)
        {
           setDealer(`-`)
        }
    }

    const getOffersQuantity = async()=>
    {
        try
        {
            const response  = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json')
            const quantity = Object.values(response.data).length
            setOffersQuantity(`${quantity}`)
        }
        catch(ex)
        {
            setOffersQuantity(`-`)
        }
    }

    const getPrimedOffers = async()=>
    {
        try
        {
            const response = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json')
            const filtered = Object.values(response.data).filter(x=>x.primed)
            const randomOffer = []
            for(let i =0;i<6;i++)
            {
                const random = Math.floor(Math.random()*filtered.length)
                if(randomOffer.includes(filtered[random]))
                {
                    i--
                    continue
                }
                else
                {
                    randomOffer.push(filtered[random])
                }
            }
            setPrimedOfferLoading(false)
            setOffer(randomOffer)
        }
        catch(ex)
        {
            setPrimedOfferLoading(false)
            setOffer([])
        }
    }



   useEffect(()=>{
    window.scrollTo(0,0)
      document.title = 'Strona Główna'
      window.addEventListener('resize',setTopParamStandPhoto)
      window.addEventListener('scroll',windowScroll)
      getDealers()
      getOffersQuantity()
      setTopParamStandPhoto()
      getOffer()
      getPrimedOffers()
      imgRef.current.classList.add(`home${Math.floor(Math.random()*9)}`)

            const interval = setInterval(() => {
                for(let i =0 ;i<9;i++)
                {

                    imgRef.current.classList.remove(`home${i}`)
                }
                const random = Math.floor(Math.random()*9)
                imgRef.current.classList.add(`home${random}`)
            }, 5000);
        
        return ()=>{
            clearInterval(interval)
            window.removeEventListener('resize',setTopParamStandPhoto)
            window.removeEventListener('scroll',windowScroll)
        }
   },[])
   
   const brandListRef = useRef(null)
   const brandInputRef = useRef(null)
    const arrowRef = useRef(null)

    const [brandValue,setBrandValue] = useState('')

    const listHandler = ()=>
    {
        if(brandListRef.current.style.display === "none")
        {
           

            brandListRef.current.style.display = 'block'
           
            brandListRef.current.style.opacity = '1'
        
            arrowRef.current.style.rotate = `-90deg`
            arrowRef.current.style.color = `black`
        }
        else
        {
            inputBlur()
        }
    }

    const inputBlur = ()=>
    {
        brandListRef.current.style.opacity = '0'
      
        brandListRef.current.style.display = "none"
            
       
        arrowRef.current.style.rotate = `90deg`
        arrowRef.current.style.color = `grey`
    }

    const listClick = (e)=>
    {
        if(e.target.innerHTML === "-")
        {
            setBrandValue('')
        }
        else
        {
            setBrandValue(e.target.innerHTML)

        }
        inputBlur()
    }

    const engineInput = useRef(null)
    const arrow2 = useRef(null)
    const engineList = useRef(null)
    const [engineValue,setEngineValue] = useState('')

    const showList =()=>
    {
        if(engineList.current.style.display === "none")
        {
            

                engineList.current.style.display = 'block'
         
            engineList.current.style.opacity = '1'
        
            arrow2.current.style.rotate = `-90deg`
            arrow2.current.style.color = `black`
        }
        else
        {
            blurEngineInput()
        }
    }

    const blurEngineInput = ()=>
    {
        engineList.current.style.opacity = '0'
        
        engineList.current.style.display = "none"
            
        
        arrow2.current.style.rotate = `90deg`
        arrow2.current.style.color = `grey`
    }

    const engineListClick = (e)=>
    {
        if(e.target.innerHTML === "-")
        {
            setEngineValue('')
        }
        else
        {
            setEngineValue(e.target.innerHTML)

        }
        blurEngineInput()
    }

    const search = ()=>
    {
        const obj = {
            brand:brandInputRef.current.value,
            model:model,
            priceDown:priceDown,
            priceUp:priceUp,
            engine:engineInput.current.value
        }
        props.change(obj)
    }

    const imageRef = useRef(null)
    const formRef = useRef(null)

    const checkWidth = ()=>
    {
        
        if(window.innerWidth < 951)
        {
            standPhotoRef.current.style.background = `url('https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2FLaFerrari-Aperta-6_1.jpg?alt=media&token=0ffb443b-964b-49ac-b28b-98ab47ad3e49')center`
            imageRef.current.style.marginTop = `${formRef.current.clientHeight*1.05}px`
        }
        else
        {
            standPhotoRef.current.style.background = `url('https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fferrari20000.png?alt=media&token=df3f1786-752a-475c-8187-aa2f8b1d8e5f')center`
            imageRef.current.style.marginTop = `0`
        }
    }

    useLayoutEffect(()=>{

        window.addEventListener('resize',checkWidth)
        checkWidth()

        return ()=>{
            window.removeEventListener('resize',checkWidth)
        }
    },[])
   return(

        <article className={styles.background}>

            <div className={styles.image} ref={imageRef}>

                <div className={styles.img} ref={imgRef}></div>

                <form className={styles.form} ref={formRef}>

                    <h1>Znajdź Swój Wymarzony Samochód</h1>

                    <div className={styles.brand}>
                        <input type="text" className={`${styles.input} ${styles.brandInput}`} placeholder="Marka" defaultValue={brandValue} onClick={listHandler} ref={brandInputRef}></input>
                        <div className={styles.arrow} onClick={()=>{listHandler();brandInputRef.current.focus()}} ref={arrowRef}><IconNextPage /></div>
                        <div className={styles.brandList} ref={brandListRef} style={{display:'none'}} onClick={listClick}>
                            <div>-</div>
                            <div>Alfa Romeo</div>
                            <div>Alpine</div>
                            <div>Aston Martin</div>
                            <div>Audi</div>
                            <div>BMW</div>
                            <div>Bentley</div>
                            <div>Cadillac</div>
                            <div>Chevrolet</div>
                            <div>Citroen</div>
                            <div>Cupra</div>
                            <div>Dacia</div>
                            <div>Dodge</div>
                            <div>Ferrari</div>
                            <div>Fiat</div>
                            <div>Ford</div>
                            <div>Honda</div>
                            <div>Hyundai</div>
                            <div>Jaguar</div>
                            <div>Jeep</div>
                            <div>Kia</div>
                            <div>Lamborghini</div>
                            <div>Land Rover</div>
                            <div>Lexus</div>
                            <div>Mazda</div>
                            <div>McLaren</div>
                            <div>Mercedes-Benz</div>
                            <div>Nissan</div>
                            <div>Opel</div>
                            <div>Peugeot</div>
                            <div>Porsche</div>
                            <div>Renault</div>
                            <div>Skoda</div>
                            <div>Suzuki</div>
                            <div>Tesla</div>
                            <div>Toyota</div>
                            <div>Volkswagen</div>
                            <div>Volvo</div>
                            
                        </div>
                    </div>
                    

                    <input type="text" placeholder="Model" value={model} onChange={e=>setModel(e.target.value)} className={`${styles.model} ${styles.input}`}></input>

                    <input type="number" placeholder="Cena od" value={priceDown} onChange={e=>setPriceDown(e.target.value)} className={`${styles.input} ${styles.price2Input}`}></input>
                  
                    <input type="number" placeholder="Cena do" value={priceUp} onChange={e=>setPriceUp(e.target.value)} className={`${styles.input} ${styles.priceInput}`}></input>

                    <div className={styles.verticalBreak}></div>

                    <div className={styles.engineInput}>
                        <input className={`${styles.input} ${styles.brandInput}`} placeholder="Silnik" defaultValue={engineValue} ref={engineInput} onClick={showList}></input>
                        <div className={styles.arrow} ref={arrow2} onClick={()=>{showList();engineInput.current.focus()}}><IconNextPage /></div>
                        <div className={styles.brandList} style={{display:'none'}} ref={engineList} onClick={engineListClick}>
                            
                            <div>-</div>
                            <div>Benzynowy</div>
                            <div>Diesel</div>
                            <div>Benzynowy + LPG</div>
                            <div>Elektryczny</div>
                            <div>Hybrydowy</div>
                            
                        </div>
                    </div>
                  
                    
                    <button onClick={(e)=>{e.preventDefault();search()}} className={styles.btn}>Pokaż Wyniki</button>
                </form>



            </div>
            {offerLoading?<div className={styles.loadingContainer}><LoadingFrontImg /><div>Ładowanie...</div></div>:
            serverError?<div className={styles.errorArea}><ServerNotResponding img message={"Nie można w tej chwili załadować ofert"}/></div>:
            <div className={styles.container} >
               
               {latestOffers[0]?<>
                <h1>Ostatnio Oglądane</h1>
                <div className={styles.latestDiv}>
                    {latestOffers.map((x,idx)=><LatestOffer key={idx} {...x} />)}
                </div>
                
      
                </>:null}


                <h1>Te oferty mogą cię zainteresować!</h1>

                {primedOffer.map((x,idx)=><div className={styles.responsiveCon} key={idx}><HomeOffer {...x} /></div>)}

                
            </div>}



            <div className={styles.standPhoto} ref={standPhotoRef}></div>

            <div className={styles.backgroundNext} ref={backgroundNextRef}>

                <div className={styles.container2}>

                    <div className={styles.photo}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fuser0000.png?alt=media&token=c3aa78ef-dc63-4129-b09a-7a4f73516a62" className="showingPhotos"></img>
                    </div>
                    <div className={styles.photo}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fcar0000.png?alt=media&token=e6b5518b-a2e4-4362-bd99-e220a5c30f97" className="showingPhotos"></img>
                    </div>
                    <div className={styles.photo}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fbrand0000.png?alt=media&token=2470ce69-cdfb-4645-9800-3f0bf0472655" className="showingPhotos"></img>
                    </div>
                    <div className={`${styles.desc} descriptionPhotos`}>
                        Zaufało nam już {dealers} sprzedawców!
                    </div>
                    <div className={`${styles.desc} descriptionPhotos`}>
                        W naszej ofercie znajdziesz aż {offersQuantity} ofert!
                    </div>
                    <div className={`${styles.desc} descriptionPhotos`}>
                        Wybieraj wśród 37 marek!
                    </div>

                    <div className={styles.photo2}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fuser0000.png?alt=media&token=c3aa78ef-dc63-4129-b09a-7a4f73516a62" className="showingPhotos2"></img>

                        
                    </div>

                    <div className={`${styles.desc2} descriptionPhotos2`}>
                        Zaufało nam już {dealers} sprzedawców!
                    </div>

                    <div className={styles.photo2}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fcar0000.png?alt=media&token=e6b5518b-a2e4-4362-bd99-e220a5c30f97" className="showingPhotos2"></img>
                    </div>

                    <div className={`${styles.desc2} descriptionPhotos2`}>
                        W naszej ofercie znajdziesz aż {offersQuantity} ofert!
                    </div>

                    <div className={styles.photo2}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/car-spot-ebd4f.appspot.com/o/homeImgs%2Fbrand0000.png?alt=media&token=2470ce69-cdfb-4645-9800-3f0bf0472655" className="showingPhotos2"></img>
                    </div>

                    <div className={`${styles.desc2} ${styles.descLast} descriptionPhotos2`}>
                        Wybieraj wśród 37 marek!
                    </div>

                    <div className={styles.primedOffers}>
                        {primedOfferLoading?<LoadingFrontImg />:<>
                        <h2>Wyróżnione Oferty</h2>
                        {offer.length > 0?offer.map((x,idx)=><Offert key={idx} {...x}/>):<ServerNotResponding img message="Nie można w tej chwili pobrać ofert" />}
                        </>}
                    </div>

                    <div className={styles.aboutUs}>
                        <h2>O Nas</h2>

                        <div>
                        <p>
                        <b>Car-Spot</b> to dynamiczny sklep internetowy, który zrodził się z pasji do motoryzacji i miłości do samochodów.Założony w 2024 roku, sklep ten szybko zdobył uznanie wśród entuzjastów motoryzacji, oferując szeroką gamę ogłoszeńsprzedaży samochodów 37 najpopularniejszych marek.</p>
                        <p>
                        W Car-Spot każdy miłośnik motoryzacji znajdzie coś dla siebie. Sklep specjalizuje się w prezentowaniu atrakcyjnych ofert sprzedaży samochodów, obejmujących szeroką gamę marek od renomowanych producentów. Bez względu na to, czy ktoś jest zainteresowany sportowymi autami, SUV-ami, czy ekologicznymi pojazdami, Car-Spot z pewnością spełni oczekiwania nawet najbardziej wymagających klientów.</p>
                        <p>
                        Dzięki intuicyjnemu interfejsowi sklepu, łatwo można przeglądać ogłoszenia, porównywać modele i dokonywać wyboru zgodnie z indywidualnymi preferencjami. Car-Spot stawia na przejrzystość, uczciwość i profesjonalizm, co sprawia, że zakupy samochodowe stają się przyjemnym doświadczeniem.</p>
                        <p>
                        Celem Car-Spot nie jest tylko sprzedaż samochodów, ale również szerzenie pasji do motoryzacji. Sklep ten stara się być miejscem, gdzie fani motoryzacji mogą znaleźć nie tylko wymarzony pojazd, ale także ciekawe informacje, testy, recenzje oraz aktualności ze świata samochodów. Dzięki temu Car-Spot nie tylko dostarcza klientom nowych doświadczeń zakupowych, ale również inspiruje ich do pogłębiania wiedzy o fascynującym świecie motoryzacji.</p>
                        <p>
                        Wchodząc na stronę Car-Spot, klienci nie tylko mają możliwość znalezienia idealnego samochodu, ale także uczestniczą w społeczności miłośników motoryzacji, dzieląc się swoimi pasjami i doświadczeniami. Car-Spot to nie tylko sklep, to miejsce, gdzie spotykają się prawdziwi entuzjaści motoryzacji.</p>
                        </div>
                    </div>
                   

                </div>

            </div>

            

        </article>
    )
}

export default React.memo(ContentDefault)