import styles from './homeOffer.module.css'
import setPrice from '../../assets/helpers/addBlinkInPrices'
import IconLoaction from '../../assets/svg/icon-location'
import IconHighway from '../../assets/svg/icon-highway'
import IconFuel from '../../assets/svg/icon-fuel'
import IconGearBox from '../../assets/svg/icon-gearBox'
import IconCalender from '../../assets/svg/icon-calender'
import { useEffect, useRef, useState } from 'react'
import LoadingImg from '../../assets/svg/loadingSmallIcon'
import {ref,uploadBytes,getStorage, getDownloadURL} from "firebase/storage"
import errorImg from '../../assets/img/browser0000.png'
import { Link } from 'react-router-dom'
function HomeOffer(props)
{

    const [photo,setPhoto] = useState('')
    const [photoLoading,setPhotoLoading] = useState(true)

    const imgRef = useRef(null)

    const downloadPhoto = async() =>
    {
        const storage = getStorage()
        try{
            const refFrontImage = ref(storage,`OffertImage/${props.id}/frontImage.jpg`)
            const response = await getDownloadURL(refFrontImage)
            setPhoto(response)
            setPhotoLoading(false)
        }
        catch(ex)
        {
            setPhoto(errorImg)
            setPhotoLoading(false)
        }
    }

    useEffect(()=>{
        downloadPhoto()
    },[])

    const zoomImg = ()=>
    {
        if(imgRef.current)
        {
            imgRef.current.style.scale = `1.1`
        }
    }

    const zoomOut = ()=>
    {
        if(imgRef.current)
        {
            imgRef.current.style.scale = `1`
        }
    }

    return(
        <Link to={`/offers/${props.id}`} className={styles.container} onMouseOver={zoomImg} onMouseOut={zoomOut}>
            <div className={styles.imgContainer}>
                {photoLoading?<div className={styles.imgLoading}><LoadingImg/></div>:<div className={styles.imgCon}><img src={photo} ref={imgRef}/></div>}
            </div>
            <div className={styles.line}></div>
            <div className={styles.description}>
                <h2>{props.name}</h2>
                <div className={styles.params}>
                    <div><IconHighway /> {`${setPrice(props.distance)} Km`}</div>
                    <div>
                        <IconFuel /> {props.engine}
                    </div>
                    <div><IconCalender /> {props.year}</div>

                </div>
                <div className={styles.bottomDes}>
                    <div className={styles.infoDes}>
                        <IconLoaction /> {props.location}
                    </div>
                    <div className={styles.price}>
                        {`${setPrice(props.price)} zł`}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HomeOffer