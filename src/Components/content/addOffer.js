import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import styles from './addOffer.module.css'
import IconPlus from "../../assets/svg/icon-plus";
import IconPlus2 from "../../assets/svg/icon-plus2";
import CheckBoxEmpty from "../../assets/svg/checkboxEmpty";
import CheckBoxFilled from "../../assets/svg/checkBoxFilled";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import IconDelete from "../../assets/svg/icon-delete";
import LoadingFrontImg from "../../assets/svg/loadingFrontimg";
import ServerNotResponding from "../errors/serverNotResponding";
import reducer from "./addOfferReducer";
import reducerError from "./reducerErrors";
import LoginContext from "../Context/logincontext";
import { useNavigate } from "react-router-dom";
import IconNextPage from '../../assets/svg/Icon-nextPage'
function AddOffer()
{
    const [rules,setRules]= useState({
        promo:false,
        rules:false,
        data:false,
        rodo:false,
    })
    const [inputValues,dispach] = useReducer(reducer,{
        name:'',
        model:'',
        distance:'',
        year:'',
        capacity:'',
        power:'',
        torque:'',
        weight:'',
        gears:'',
        combustion:'',
        doors:'',
        seats:'',
        color:'',
        description:'',
        price:'',
    })
    const [inputValuesErrors,dispach2] = useReducer(reducerError,{
        name:false,
        model:false,
        distance:false,
        year:false,
        capacity:false,
        power:false,
        torque:false,
        weight:false,
        gears:false,
        combustion:false,
        doors:false,
        seats:false,
        color:false,
        description:false,
        price:false,
        brand:false,
        engine:false,
        gearbox:false,
        rules:false,
        data:false,
        rodo:false,
        photos:false,
    })
    const [dataError, setDataError] = useState('')
    const [random] = useState(Math.floor(Math.random()*1000000000000))
    const [photos,setPhotos] = useState([])
    const [imgLoading,setImgLoading] = useState(false)
    const [imageError,setImageError] = useState('')
    const [verify,setVerify] = useState(true)
    const [emailSendError,setEmailSendError] = useState('')

    const inputRef = useRef(null)
    const addRef = useRef(null)
    const brandRef = useRef(null)
    const engineRef = useRef(null)
    const gearboxRef = useRef(null)
    const [sending,setSending] = useState(false)
    const login = useContext(LoginContext)
    const navigate = useNavigate()

    const rulesHandler = (action)=>
    {
        const newState = {...rules}
        switch(action)
        {
            case 'promo':
                newState.promo = !newState.promo
                break
            case 'rules':
                newState.rules = !newState.rules
                break
            case 'data':
                newState.data = !newState.data
                break
            case 'rodo':
                newState.rodo = !newState.rodo
                break
        }
        setRules(newState)
    }

    const addedPhoto = async(e)=>
    {
       
        setImgLoading(true)
        const storage = getStorage();
        if(photos.length == 0)
        {
            try
            {
                const storageRef = ref(storage, `OffertImage/id${random}/frontImage.jpg`);
                await uploadBytes(storageRef, inputRef.current.files[0])
                const response = await getDownloadURL(ref(storage, `OffertImage/id${random}/frontImage.jpg` ))
                const newState = [...photos]
                newState.push(response)
                setPhotos(newState)
                setImgLoading(false)
            }
            catch(ex)
            {
                setImgLoading(false)
                setImageError(true)
            }
            
        }
        else
        {
            try
            {
                const storageRef = ref(storage, `OffertImage/id${random}/${photos.length}.jpg`);
                const res = await uploadBytes(storageRef, inputRef.current.files[0])
                const response = await getDownloadURL(ref(storage, `OffertImage/id${random}/${photos.length}.jpg` ))
                const newState = [...photos]
                newState.push(response)
                setPhotos(newState)
                setImgLoading(false)
            }
            catch(ex)
            {
                setImgLoading(false)
                setImageError(true)
            }
        }
       
       
    }

    const deleteFunc = async()=>
    {
        const storage = getStorage();
        const imgs = [...photos]
        imgs.splice(-1,1)
        setPhotos(imgs)
        if(imgs.length > 0)
        {
            const desertRef = ref(storage, `OffertImage/id${random}/${imgs.length}.jpg`);
            try
            {

                await deleteObject(desertRef)
            }
            catch(ex)
            {
                setImageError(true)
            }
        }
        else
        {
            const desertRef = ref(storage, `OffertImage/id${random}/frontImage.jpg`);
            try
            {

                await deleteObject(desertRef)
            }
            catch(ex)
            {
                setImageError(true)
            }
        }
    }

    const validateData =()=>
    {
        let name = false
        let model = false
        let distance = false
        let year = false
        let capacity = false
        let power = false
        let torque = false
        let weight = false
        let gears = false
        let combustion = false
        let doors = false
        let seats = false
        let color = false
        let description = false
        let price = false
        let brand = false
        let engine = false
        let gearbox = false
        let rulesLocal = false
        let dataLocal = false
        let rodoLocal = false
        let photosLocal = false
        if(inputValues.name.length < 4)
        {
            dispach2({type:'name',value:'Za krótka nazwa oferty'})
            name = false
        }
        else
        {
            if(inputValues.name.length > 25)
            {
                dispach2({type:'name',value:'Za długa nazwa oferty'})
                name = false
            }
            else
            {
                dispach2({type:'name',value:false})
                name = true
            }
        }
      
        if(brandRef.current.value === "-")
        {
            dispach2({type:'brand',value:'Wybierz markę pojazdu'})
            brand = false
        }
        else
        {
            dispach2({type:'brand',value:false})
            brand=true
        }
        
        if(inputValues.model == 0 || inputValues.model == "")
        {
            dispach2({type:'model',value:'Za krótka nazwa'})
            model=false
        }
        else
        {
            if(inputValues.model.length > 25)
            {
                dispach2({type:'model',value:'Za długa nazwa'})
                model=false
            }
            else
            {
                dispach2({type:'model',value:false})
                model = true
            }
        }

        if(inputValues.distance != '' && inputValues.distance != 0)
        {
            dispach2({type:'distance',value:false})
            distance = true
        }
        else
        {
            dispach2({type:'distance',value:'Wpisz przebieg pojazdu'})
            distance = false
        }
         const date = new Date()
        if(inputValues.year == '' || +inputValues.year < 1920 || +inputValues.year > +date.getFullYear())
        {
            dispach2({type:'year',value:'Nie prawidłowa data'})
            year = false
        }
        else
        {
            dispach2({type:'year',value:false})
            year = true
        }

        if(engineRef.current.value === "-")
        {
            dispach2({type:'engine',value:'Wybierz rodzaj silnika'})
            engine = false
        }
        else
        {
            dispach2({type:'engine',value:false})
            engine = true
        }

        if(inputValues.capacity === '' || inputValues.capacity == 0)
        {
            dispach2({type:'capacity',value:'Nie prawidłowa pojemność'})
            capacity = false
        }
        else
        {
            dispach2({type:'capacity',value:false})
            capacity = true
        }

        if(inputValues.power != '' && inputValues.power != 0)
        {
            dispach2({type:'power',value:false})
            power = true
        }
        else
        {
            dispach2({type:'power',value:'Podaj moc silnika'})
            power = false
        }
        if(inputValues.torque != '' && inputValues.torque != 0)
        {
            dispach2({type:'torque',value:false})
            torque = true
        }
        else
        {
            dispach2({type:'torque',value:"Podaj moment obrotowy"})
            torque = false
        }
        if(inputValues.weight != 0 && inputValues.weight != '')
        {
            dispach2({type:'weight',value:false})
            weight = true
        }
        else
        {
            dispach2({type:'weight',value:'Wpisz wagę pojazdu'})
            weight = false
        }
   
        if(gearboxRef.current.value === "-")
        {
            
            dispach2({type:'gearbox',value:'Wybierz skrzynię biegów'})
            gearbox = false
        }
        else
        {
        
            dispach2({type:'gearbox',value:false})
            gearbox = true
        }
        if(inputValues.gears != '' && inputValues.gears != 0)
        {
            dispach2({type:'gears',value:false})
            gears = true
        }
        else
        {
            dispach2({type:'gears',value:'Wpisz liczbę biegów'})
            gears = false
        }
        if(inputValues.combustion != '' && inputValues.combustion != 0)
        {
            dispach2({type:'combustion',value:false})
            combustion = true
        }
        else
        {
            dispach2({type:'combustion',value:'Wpisz spalanie pojazdu'})
            combustion = false
        }
        if(inputValues.doors != '' && inputValues.doors != 0)
        {
            dispach2({type:'doors',value:false})
            doors = true
        }
        else
        {
            dispach2({type:'doors',value:'Wpisz liczbę drzwi'})
            doors = false
        }
        if(inputValues.seats != '' && inputValues.seats != 0)
        {
            dispach2({type:'seats',value:false})
            seats = true
        }
        else
        {
            dispach2({type:'seats',value:'Wpisz liczbę miejsc'})
            seats = false
        }
        if(inputValues.color != '' && inputValues.color != 0)
        {
            dispach2({type:'color',value:false})
            color = true
        }
        else
        {
            dispach2({type:'color',value:'Wpisz kolor pojazdu'})
            color = false

        }
        if(inputValues.description.length < 20)
        {
            description = false
            if(inputValues.description.length === 0)
            {
                dispach2({type:'description',value:'Napisz opis pojazdu'})
            }
            else
            {
                dispach2({type:'description',value:'Opis musi składać się przynajmniej z 20 znaków'})
            }
        }
        else
        {
            dispach2({type:'description',value:false})
            description = true
        }
        if(inputValues.price != '' && inputValues.price != 0)
        {
            dispach2({type:'price',value:false})
            price = true
        }
        else
        {
            dispach2({type:'price',value:'Podaj cenę pojazdu'})
            price = false
        }
        if(photos.length == 0)
        {
            dispach2({type:'photo',value:'Dodaj przynajmniej jedno zdjęcie'})
            photosLocal = false
        }
        else
        {
            dispach2({type:'photo',value:false})
            photosLocal = true
        }
        if(rules.rules)
        {
            dispach2({type:'rules',value:false})
            rulesLocal = true
        }
        else
        {
            dispach2({type:'rules',value:'To pole jest wymagane'})
            rulesLocal = false
        }
        if(rules.data)
        {
            dispach2({type:'data',value:false})
            dataLocal = true
        }
        else
        {
            dispach2({type:'data',value:'To pole jest wymagane'})
            dataLocal = false
        }
        if(rules.rodo)
        {
            dispach2({type:'rodo',value:false})
            rodoLocal = true
        }
        else
        {
            dispach2({type:'rodo',value:"To pole jest wymagane"})
            rodoLocal = false
        }

        return name && brand && model && distance && year && engine && capacity && power && torque && weight && gearbox && gears && combustion && doors && seats && color && description && price && photosLocal && rulesLocal && dataLocal &&rodoLocal
    }

    const addOffert = async()=>
    {
        setDataError('')
        const response = validateData()

        if(response)
        {
            setSending(true)

            
            const offer = {...inputValues}
            offer.brand = brandRef.current.value
            offer.engine = engineRef.current.value
            offer.gearbox = gearboxRef.current.value
            offer.photos = photos.length
            offer.primed = rules.promo
            offer.key = `key${random}`
            offer.id= `id${random}`
            const uid = JSON.parse(localStorage.getItem('userId'))
           if(uid)
           {
                const users = await axios.get('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/users.json')
                const user = Object.values(users.data).find(x=>x.id == uid)
                offer.userId = uid
                offer.location = user.city
                try
                {
                   
                    const response1 = await axios.post('https://car-spot-ebd4f-default-rtdb.europe-west1.firebasedatabase.app/Offerts.json',offer)
                    setSending(false)
                    navigate('/')
                   
                }
                catch(ex)
                {
                    setSending(false)
                    setDataError('Nie można dodać oferty. Spróbuj ponownie później')
                }
           }
           else
           {
                setSending(false)
                setDataError('Nie można dodać oferty. Spróbuj ponownie później')
           }
        }
        else
        {
            setDataError('Podane dane są nie poprawne')
        }
    }

    useEffect(()=>{
        if(!login.value)
        {
            navigate('/')
        }
    },[login.value])

    const listRef = useRef(null)
    const [openedList,setOpenedList] = useState(false)
    const [selectValue,setSelectValue] = useState('-')

    const selectClicked = (e)=>
    {
        e.preventDefault()
        if(!openedList)
        {
            listRef.current.style.display = `block`
            brandRef.current.focus()
            setOpenedList(true)
        }
    

    }

    const listClicked = (e)=>
    {
        
        setSelectValue(e.target.innerText)
        listRef.current.style.display = `none`
        setOpenedList(false)
       
        
    }

    const checkEmailVerify = async()=>
    {
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
            idToken:JSON.parse(localStorage.getItem('idToken'))
        })
        setVerify(response.data.users[0].emailVerified)
    }

    useEffect(()=>{
        checkEmailVerify()
    },[])
    
    useEffect(()=>{
        document.title = 'Dodaj Ofertę'
      },[])

      const sendEmailVerify = async()=>
      {
        setEmailSendError('')
        try
        {
            const emailVarify = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                requestType:"VERIFY_EMAIL",
                idToken:JSON.parse(localStorage.getItem('idToken'))
            })
            setEmailSendError('Wiadomość została wysłana! Jeżeli nie dotarła do ciebie spróbuj ponownie. Po zweryfikowaniu odśwież stronę.')
        }
        catch(ex)
        {
            setEmailSendError('Nie można w tej chwili wysłać wiadomośći weryfikacyjnej')
        }
      }

    return(
        sending?<div className={styles.sendingCon}><div><LoadingFrontImg /><h1>Tworzenie oferty...</h1></div></div>:
        !verify?<div className={styles.container}><div className={styles.con}><h1>Aby dodać ofertę zweryfikuj swój adres e-mail</h1><button onClick={sendEmailVerify}>Wyślij werifikację na adres email</button><div className={styles.sended}>{emailSendError}</div></div></div>:
        <article className={styles.container}>
            
            {imageError?<ServerNotResponding img={true} message="UPS... serwer nie odpowiada. Spróbuj ponownie później"/>:<>
            <h2>Dodaj ofertę</h2>

            <div className={styles.titlePlace}>
                <h2>Dodaj Tytuł Oferty</h2>
                <input type="text" className={styles.title} placeholder="Tytuł..." value={inputValues.name} onChange={e=>dispach({type:'name',value:e.target.value})}></input>
            </div>
            {inputValuesErrors.name?<div className={styles.errorArea}>{inputValuesErrors.name}</div>:null}

            <div className={styles.car}>
                <h1>Podstawowe Informacje</h1>

                    <h2>Wybierz Markę Pojazdu</h2>
                    <label className={styles.selectLabel} onMouseDown={selectClicked}>
                    <div className={styles.list} ref={listRef} onClick={listClicked}>
                        <ul>
                        <li>Alfa Romeo</li>
                        <li>Alpine</li>
                        <li>Aston Martin</li>
                        <li>Audi</li>
                        <li>BMW</li>
                        <li>Bentley</li>
                        <li>Cadillac</li>
                        <li>Chevrolet</li>
                        <li>Citroen</li>
                        <li>Cupra</li>
                        <li>Dacia</li>
                        <li>Dodge</li>
                        <li>Ferrari</li>
                        <li>Fiat</li>
                        <li>Ford</li>
                        <li>Honda</li>
                        <li>Hyundai</li>
                        <li>Jaguar</li>
                        <li>Jeep</li>
                        <li>Kia</li>
                        <li>Lamborghini</li>
                        <li>Land Rover</li>
                        <li>Lexus</li>
                        <li>Mazda</li>
                        <li>McLaren</li>
                        <li>Mercedes-Benz</li>
                        <li>Nissan</li>
                        <li>Opel</li>
                        <li>Peugeot</li>
                        <li>Porsche</li>
                        <li>Renault</li>
                        <li>Skoda</li>
                        <li>Suzuki</li>
                        <li>Tesla</li>
                        <li>Toyota</li>
                        <li>Volkswagen</li>
                        <li>Volvo</li>
                        </ul>
                    </div>
                    <input  value={selectValue} className={styles.selectBrand} ref={brandRef} >
                        
                    </input>
                    <div className={styles.arrow}><IconNextPage /></div>
                    </label>
                    {inputValuesErrors.brand?<div className={styles.errorArea}>{inputValuesErrors.brand}</div>:null}
                    <h2>Wpisz Model Pojazdu</h2>
                    <input type="text" className={styles.carModel} placeholder="Model Pojazdu..." value={inputValues.model} onChange={e=>dispach({type:'model',value:e.target.value})}></input>
                    {inputValuesErrors.model?<div className={styles.errorArea}>{inputValuesErrors.model}</div>:null}
            </div>

            <div className={styles.line}></div>

            <div className={styles.specification}>
                
                <h2>Specyfikacja Pojazdu</h2>

                <div className={styles.inputCon}>
                    <h2>Przebieg Auta</h2>
                    <div className={styles.capacityCon}>
                    <input type="number" placeholder="Wpisz przebieg auta..." value={inputValues.distance} onChange={e=>dispach({type:'distance',value:e.target.value})} className={styles.specificationInput}></input>
                    <div className={styles.cm}>Km</div>
                    {inputValuesErrors.distance?<div className={styles.errorArea}>{inputValuesErrors.distance}</div>:null}
                    </div>
                </div>

                <div className={styles.inputCon}>
                    <h2>Skrzynia biegów</h2>
                    <label className={styles.engineLabel}>
                        <select className={styles.selectEngine} ref={gearboxRef}>
                            <option>-</option>
                            <option>Manualna</option>
                            <option>Automatyczna</option>
                            <option>Sekwencyjna</option>
                        </select>
                        <div className={styles.arrow2}><IconNextPage /></div>
                    </label>
                    
                    {inputValuesErrors.gearbox?<div className={styles.errorArea}>{inputValuesErrors.gearbox}</div>:null}
                </div> 
                

                <div className={styles.inputCon}>
                    <h2>Rok Produkcji</h2>
                    <input type="number" placeholder="Wpisz rok produkcji..." value={inputValues.year} onChange={e=>dispach({type:'year',value:e.target.value})} className={styles.specificationInput}></input>
                    {inputValuesErrors.year?<div className={styles.errorArea}>{inputValuesErrors.year}</div>:null}
                </div>

                <div className={styles.inputCon}>
                    <h2>Liczba Biegów</h2>
                    <input type="number" placeholder="Wpisz ilość biegów..." value={inputValues.gears} onChange={e=>dispach({type:'gears',value:e.target.value})} className={styles.specificationInput}></input>
                    {inputValuesErrors.gears?<div className={styles.errorArea}>{inputValuesErrors.gears}</div>:null}
                </div>

                <div className={styles.inputCon}>
                    <h2>Silnik</h2>
                    <label className={styles.engineLabel}>
                    <select className={styles.selectEngine} ref={engineRef}>
                        <option>-</option>
                        <option>Benzynowy</option>
                        <option>Diesel</option>
                        <option>Benzynowy + LPG</option>
                        <option>Elektryczny</option>
                        <option>Hybrydowy</option>
                    </select>
                    <div className={styles.arrow2}><IconNextPage /></div>
                    </label>
                    {inputValuesErrors.engine?<div className={styles.errorArea}>{inputValuesErrors.engine}</div>:null}
                </div> 

                <div className={styles.inputCon}>
                    <h2>Spalanie</h2>
                    <div className={styles.capacityCon}>
                        <input type="number" placeholder="Wpisz średnie spalanie..." value={inputValues.combustion} onChange={e=>dispach({type:'combustion',value:e.target.value})} className={`${styles.capacity}`}></input>
                        <div className={styles.cm}>L/100Km</div>
                        {inputValuesErrors.combustion?<div className={styles.errorArea}>{inputValuesErrors.combustion}</div>:null}
                    </div>
                </div> 

                <div className={styles.inputCon}>
                    <h2>Pojemność Silnika</h2>
                    <div className={styles.capacityCon}>
                        <input type="number" placeholder="Wpisz pojemność silnika..." onChange={e=>dispach({type:'capacity',value:e.target.value})} className={styles.capacity} value={inputValues.capacity}></input>
                        <div className={styles.cm}>cm<sup>3</sup></div>
                        {inputValuesErrors.capacity?<div className={styles.errorArea}>{inputValuesErrors.capacity}</div>:null}
                    </div>
                </div> 

                <div className={styles.inputCon}>
                    <h2>Liczba Drzwi</h2>
                    <input type="number" placeholder="Wpisz ilość drzwi..." value={inputValues.doors} onChange={e=>dispach({type:'doors',value:e.target.value})} className={styles.specificationInput}></input>
                    {inputValuesErrors.doors?<div className={styles.errorArea}>{inputValuesErrors.doors}</div>:null}
                </div>

                <div className={styles.inputCon}>
                    <h2>Moc Silnika</h2>
                    <div className={styles.capacityCon}>
                        <input type="number" placeholder="Wpisz moc..." value={inputValues.power} onChange={e=>dispach({type:'power',value:e.target.value})} className={styles.capacity}></input>
                        <div className={styles.cm}>KM</div>
                        {inputValuesErrors.power?<div className={styles.errorArea}>{inputValuesErrors.power}</div>:null}
                    </div>
                </div> 

                <div className={styles.inputCon}>
                    <h2>Liczba Miejsc</h2>
                    <input type="number" placeholder="Wpisz ilość miejsc..." value={inputValues.seats} onChange={e=>dispach({type:'seats',value:e.target.value})} className={styles.specificationInput}></input>
                    {inputValuesErrors.seats?<div className={styles.errorArea}>{inputValuesErrors.seats}</div>:null}
                </div>

                <div className={styles.inputCon}>
                    <h2>Moment Obrotowy</h2>
                    <div className={styles.capacityCon}>
                        <input type="number" placeholder="Wpisz moment obrotowy..." value={inputValues.torque} onChange={e=>dispach({type:'torque',value:e.target.value})} className={styles.capacity}></input>
                        <div className={styles.cm}>Nm</div>
                        {inputValuesErrors.torque?<div className={styles.errorArea}>{inputValuesErrors.torque}</div>:null}
                    </div>
                </div> 

                <div className={styles.inputCon}>
                    <h2>Kolor</h2>
                    <input type="text" placeholder="Wpisz kolor..." value={inputValues.color} onChange={e=>dispach({type:'color',value:e.target.value})} className={styles.specificationInput}></input>
                    {inputValuesErrors.color?<div className={styles.errorArea}>{inputValuesErrors.color}</div>:null}
                </div>

                <div className={styles.inputCon}>
                    <h2>Masa własna</h2>
                    <div className={styles.capacityCon}>
                        <input type="number" placeholder="Wpisz masę pojazdu..." value={inputValues.weight} onChange={e=>dispach({type:'weight',value:e.target.value})} className={styles.capacity}></input>
                        <div className={styles.cm}>kg</div>
                        {inputValuesErrors.weight?<div className={styles.errorArea}>{inputValuesErrors.weight}</div>:null}
                    </div>
                </div> 

            </div>

            <div className={styles.line}></div>

            <div className={styles.description}>
                <h2>Wprowadź Opis Pojazdu</h2>
                <textarea   className={styles.textArea} placeholder="Opisz pojazd..." value={inputValues.description} onChange={e=>dispach({type:'description',value:e.target.value})}></textarea>
                {inputValuesErrors.description?<div className={styles.errorArea}>{inputValuesErrors.description}</div>:null}
               

            </div>

            <div className={styles.line}></div>

            <div className={styles.photo}>
                <h2>Dodaj Zdjęcia</h2>
                {imgLoading?<LoadingFrontImg />:<>
                {photos.length > 0?<div className={styles.delete} onClick={deleteFunc}><IconDelete /></div>:null}
                {photos.map((x,idx)=><div className={styles.imgContainer} key={idx}><img src={x} /></div>)}
                {photos.length <8?<div className={styles.addPhoto} ref={addRef}><IconPlus2 /><input type="file" accept=".jpg" ref={inputRef} onChange={addedPhoto}></input></div>:null}</>}
           
                {inputValuesErrors.photos?<div className={`${styles.errorArea} ${styles.errorArea3}`}>{inputValuesErrors.photos}</div>:null}
            </div>

            <div className={styles.line}></div>

            <div className={styles.price}>
                <h2>Cena:</h2>
                <div className={styles.priceCon}>
                    <input type='number' placeholder="Wpisz cenę..." value={inputValues.price} onChange={e=>dispach({type:'price',value:e.target.value})}></input>
                    <div className={styles.currency}>zł</div>
                    {inputValuesErrors.price?<div className={styles.errorArea2}>{inputValuesErrors.price}</div>:null}
                </div>
                
            </div>

            <div className={styles.line}></div>

            <div className={styles.rules2} onClick={e=>rulesHandler('promo')}>
                {rules.promo?<CheckBoxFilled />:<CheckBoxEmpty/>}
                Promuj Ofertę
            </div>
            <div className={styles.rules} onClick={e=>rulesHandler('rules')}>
                <div>{rules.rules?<CheckBoxFilled />:<CheckBoxEmpty/>}
                Akceptuje warunki regulaminu sprzedaży
                </div>
                {inputValuesErrors.rules?<div className={styles.errorArea}>{inputValuesErrors.rules}</div>:null}
            </div>
            <div className={styles.rules} onClick={e=>rulesHandler('data')}>
                <div>{rules.data?<CheckBoxFilled />:<CheckBoxEmpty/>}
                Potwierdzam poprawność wprowadzonych danych
                </div>
                {inputValuesErrors.data?<div className={styles.errorArea}>{inputValuesErrors.data}</div>:null}
            </div>
            <div className={styles.rules} onClick={e=>rulesHandler('rodo')}>
                <div>{rules.rodo?<CheckBoxFilled/>:<CheckBoxEmpty/>}
                Zgadzam się na przetwarzanie moich danych osobowych
                </div>
                {inputValuesErrors.rodo?<div className={styles.errorArea}>{inputValuesErrors.rodo}</div>:null}
            </div>


            {dataError?<div className={styles.dataError}>{dataError}</div>:null}
            <button onClick={addOffert} className={styles.addOffer}>Dodaj Ofertę</button>
            </>}
        </article>
    )
}

export default AddOffer