import React from "react";
import styles from './footer.module.css'
import FacebookLogo from "../../assets/svg/facebook-logo";
import InstagramLogo from "../../assets/svg/instagram-logo";
import YtLogo from "../../assets/svg/yt-logo";
import XLogo from "../../assets/svg/X-logo";
import { Link } from "react-router-dom";
function Footer()
{

    const date = new Date()

    return(
        <footer className={styles.container}>
            <div className={styles.item}>

                <h2>Znajdź Nas</h2>

                <a href="https://www.facebook.com/" target="_blink" className={styles.social}><FacebookLogo /> Facebook</a>
                <a href="https://www.instagram.com/" target="_blink" className={styles.social}><InstagramLogo /> Instagram</a>
                <a href="https://www.youtube.com/" target="_blink" className={styles.social}><YtLogo /> YouTube</a>
                <a href="https://twitter.com/" target="_blink" className={styles.social}><XLogo /> X (Twitter)</a>

            </div>
            
            <div className={styles.item}>
                <h2>Car-Spot</h2>

                <div className={styles.details}>Pomoc</div>
                <div className={styles.details}>Kontakt</div>
                <div className={styles.details}>Reklama</div>
                <div className={styles.details}>Biuro prasowe</div>
                <div className={styles.details}>Polityka prywatności</div>
                <div className={styles.details}>Polityka "cookie"</div>
                <Link to='/statute' className={styles.details}>Regulamin</Link>
            </div>
            <div className={styles.item}>
                <h2>Informacje</h2>
                <div className={styles.details}>Testy samochodów</div>
                <div className={styles.details}>Mapa kategorii</div>
                <div className={styles.details}>Mapa miejscowości</div>
                <div className={styles.details}>Ważne informacje</div>
                <div className={styles.details}>Kariera</div>
                <div className={styles.details}>Dobre praktyki</div>
            </div>
            <div className={styles.item}>
                <h2 className={styles.client}>Obsługa Klienta</h2>
                <div className={styles.contactDetails}>
                    <div className={styles.contact}>506 984 567</div>
                    <div className={styles.contact}>896 765 983</div>
                    <div className={styles.contact}>pomoc@carspot.com</div>
                    <div className={styles.contact}>pon - pt; 8:00 - 15:00</div>
                </div>
                
            </div>

            <div className={styles.warning}>Wszelkie informacje, oferty, numery telofonów oraz adresy przedstawione na stronie są nieprawdziwe! Strona ta jest tylko stroną testową</div>

            <div className={styles.line}></div>

            <div className={styles.watermark}>
                Car-Spot {date.getFullYear()} <span></span> Wszelkie Prawa Zastrzeżone
            </div>
        </footer>
    )
}

export default Footer