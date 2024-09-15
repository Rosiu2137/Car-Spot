import React, { useContext, useEffect, useState } from "react"
import styles from './navBar.module.css'
import logo1 from '../../../assets/img/logo10000.png'
import logo2 from "../../../assets/img/Logo20000.png"
import SearchBar from "../searchbar/SearchBar"
import { Link, json, useSearchParams } from "react-router-dom"
import axios from "axios"
import LoggedUser from "./loggedUser"
import LoginContext from "../../Context/logincontext"
import IconPerson from "../../../assets/svg/icon-person"
function NavBar()
{

    const context = useContext(LoginContext)
    const[userData,setUserData] = useState('')

    const findUser = async(token)=>
    {
       
        try
        {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCDXbJZTd4pk_owHnBY8NJHyn4EosIVt0M',{
                idToken:token
            })
         
            setUserData(response.data.users[0].email)

            context.changeValue(true)
        }
        catch(ex)
        {
            
            context.changeValue(false)
        }
    }
            
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('idToken'))
      
        if(token)
        {
           findUser(token)
        }
    })

    return(
        <nav className={styles.navbar} id="navbar">
            <Link to="/" className={styles.logo}>
                <div className={styles.icon1}>
                    <img src={logo1} />
                </div>
                <div className={styles.icon2}>
                    <img src={logo2} />
                </div>
            </Link>
            <div className={styles.rightMenu}>
                <SearchBar />
                {context.value?<LoggedUser userData={userData}/>:
                <Link to='/login' className={styles.menuOption}>{window.innerWidth > 950? "Zaloguj Się!":<IconPerson cl={styles.svgPerson}/>}</Link>}
            </div>
            
        </nav>
    )
}
export default NavBar