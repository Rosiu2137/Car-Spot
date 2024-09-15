import React, { useEffect, useState } from "react"
import styles from './latestOffer.module.css'
import { Link } from "react-router-dom"
import {ref,uploadBytes,getStorage, getDownloadURL} from "firebase/storage"
import LoadingFrontImg from "../../assets/svg/loadingFrontimg"
import setPrice from "../../assets/helpers/addBlinkInPrices"
import errorImg from '../../assets/img/browser0000.png'
import LoadingSmallIcon from "../../assets/svg/loadingSmallIcon"
function LatestOffer(props)
{
    const [img,setImg] = useState('')
    const [imgLoading,setImgLoading] = useState(true)

    const getImage = async()=>
    {
        const storage = getStorage()
        const refFrontImage = ref(storage,`OffertImage/${props.id}/frontImage.jpg`)
        try
        {
            const response = await getDownloadURL(refFrontImage)
            setImg(response)
            setImgLoading(false)
        }
        catch(ex)
        {
            setImg('')
            setImgLoading(false)
        }
    }

    useEffect(()=>{
        getImage()
    },[])

    return(
        <Link to={`offers/${props.id}`} className={styles.container}>
            <div className={styles.img}>
                {imgLoading?<LoadingSmallIcon />:img?<img src={img} />:<img src={errorImg} />}
            </div>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.price}>{`${setPrice(props.price)} zł`}</div>
        </Link>
    )
}

export default React.memo(LatestOffer)