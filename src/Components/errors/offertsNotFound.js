import IconOffertNotFound from "../../assets/svg/icon-OffertNotFound"
import styles from './notfound.module.css'
function OffertNotFound()
{
    return(
        <div className={styles.container}>
          <IconOffertNotFound />
          <div className={styles.info}>Nie znaleźliśmu szukanej frazy w naszej ofercie</div>
        </div>
    )
}   

export default OffertNotFound