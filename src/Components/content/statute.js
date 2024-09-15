import styles from './statute.module.css'
import React, { useEffect } from 'react'

function Statute()
{
    useEffect(()=>{
        window.scrollTo(0,0)
      
        document.title = 'Regulamin'
        
    },[])

    return(
        <div className={styles.container}>
            <h1>Regulamin</h1>

            <h2>1. Postanowienia Ogólne</h2>

            <p>
            1.1. Serwis internetowy o nazwie "Car-Spot" (zwany dalej "Serwisem") świadczy usługi z zakresu wystawiania ofert sprzedaży samochodów.<br></br><br></br>

            1.2. Niniejszy regulamin (dalej nazywany "Regulaminem") określa warunki korzystania z Serwisu oraz zasady wystawiania ofert sprzedaży samochodów.<br></br><br></br>

            1.3. Użytkownik zobowiązany jest do dokładnego zapoznania się z Regulaminem przed rozpoczęciem korzystania z Serwisu.
            </p>

            <h2>2. Rejestracja i Konto Użytkownika</h2>

            <p>
                2.1. Aby wystawiać oferty sprzedaży samochodów, użytkownik zobowiązany jest do dokonania rejestracji i utworzenia konta.
                <br></br><br></br>
                2.2. W trakcie rejestracji użytkownik zobowiązany jest do podania prawdziwych danych osobowych. Serwis zastrzega sobie prawo do weryfikacji podanych informacji.
                <br></br><br></br>
                2.3. Użytkownik ponosi odpowiedzialność za zachowanie poufności danych dostępowych do swojego konta.
            </p>

            <h2>3. Wystawianie Ofert Sprzedaży Samochodów</h2>

            <p>
                3.1. Oferty sprzedaży samochodów mogą być wystawiane tylko przez zarejestrowanych użytkowników.
                <br></br><br></br>
                3.2. Oferty powinny być rzetelne, precyzyjne oraz zgodne z prawdą. Serwis zastrzega sobie prawo do usunięcia ofert naruszających Regulamin.
                <br></br><br></br>
                3.3. W ofertach powinny być zawarte kluczowe informacje dotyczące samochodu, takie jak marka, model, rocznik, przebieg, stan techniczny, cena oraz inne istotne szczegóły.
                <br></br><br></br>
                3.4. Użytkownik zobowiązany jest do aktualizacji oferty w przypadku zmiany istotnych informacji.
            </p>

            <h2>4. Opłaty</h2>

            <p>
                4.1. Korzystanie z Serwisu w zakresie wystawiania ofert sprzedaży samochodów jest bezpłatne.
                <br></br><br></br>
                4.2. Serwis zastrzega sobie prawo do wprowadzenia opłat za korzystanie z niektórych dodatkowych funkcji w przyszłości.  
            </p>

            <h2>5. Odpowiedzialność</h2>

            <p>
                5.1. Serwis nie ponosi odpowiedzialności za zawarcie umów sprzedaży między użytkownikami wynikających z wystawionych ofert.
                <br></br><br></br>
                5.2. Użytkownik ponosi pełną odpowiedzialność za treść i rzetelność ofert, a także za komunikację z potencjalnymi kupcami.
                <br></br><br></br>
                5.3. Serwis zastrzega sobie prawo do zablokowania konta użytkownika w przypadku naruszenia Regulaminu.
            </p>

            <h2>6. Ochrona Danych Osobowych</h2>

            <p>
                6.1. Serwis przetwarza dane osobowe zgodnie z obowiązującymi przepisami prawa oraz Polityką Prywatności dostępną na stronie Serwisu.
                <br></br> <br></br>
                6.2. Użytkownik wyraża zgodę na przetwarzanie swoich danych osobowych w zakresie niezbędnym do korzystania z Serwisu.
            </p>

            <h2>7. Postanowienia Końcowe</h2>

            <p>
                7.1. Serwis zastrzega sobie prawo do zmiany Regulaminu. Użytkownicy zostaną poinformowani o wszelkich zmianach.
                <br></br> <br></br>
                7.2. W przypadku naruszenia Regulaminu, Serwis zastrzega sobie prawo do usunięcia oferty oraz zablokowania konta użytkownika.
                <br></br> <br></br>
                7.3. Niniejszy Regulamin wchodzi w życie w dniu opublikowania na stronie internetowej Serwisu.
                <br></br> <br></br>
                7.4. Wszelkie spory wynikłe z korzystania z Serwisu będą rozstrzygane na drodze mediacji lub postępowania sądowego zgodnie z obowiązującym prawem.
                <br></br> <br></br>
           
            </p>

            <h3>Regulamin opracowano dnia 30 stycznia 2024 roku.</h3>
        </div>
    )
}

export default React.memo(Statute)