import {useState} from "react";
import TopBar from "./Components/TopBar/TopBar";
import NavBar from "./Components/TopBar/navBar/navBar";
import ContentDefault from "./Components/content/contentDefault";
import ResponsiveSearchBar from "./Components/responsiweSearchbar/ResponsiveSearchBar";
import responsiveSearchBarContext from "./Components/Context/ResponsiveSearchBarContext";
import searchingValueContext from "./Components/Context/searchingValuecontext";
import {Route,Routes, useHref, useNavigate } from "react-router-dom";
import PageNotFound from "./Components/errors/pageNotFound";
import SearchContent from "./Components/content/searchContent";
import NavToHome from "./Components/navToHome/navToHome";
import SingleOffer from "./Components/offert/singleOffer";
import Login from "./Components/login/login";
import Register from "./Components/login/register";
import LoginContext from "./Components/Context/logincontext";
import LikedContent from "./Components/content/likedContent";
import Profile from "./Components/profile/profile";
import YourContent from "./Components/content/yourOffers";
import AddOffer from "./Components/content/addOffer";
import UserOffers from "./Components/content/userOffers";
import PasswordForgot from "./Components/login/passwordForgot";
import Footer from "./Components/footer/footer";
import Statute from "./Components/content/statute";
function App() {

  const [searchingValue,setsearchingValue] = useState('')
  const [displayResponsiveSearchBar,setdisplayResponsiveSearchBar] = useState(false)
  const [logged,setLogged] = useState(false)
  const navigate = useNavigate()
  const href = useHref()
  const [defaultContentSearching,setDefaultContentSearching] = useState({})

  const resSearchbarContext = responsiveSearchBarContext
  const SearchingValueContext = searchingValueContext

  const showSearchResponsiweBar = ()=>
  {
    if(displayResponsiveSearchBar)
    {
      setdisplayResponsiveSearchBar(false)
    }
    else
    {
      setdisplayResponsiveSearchBar(true)
      window.scrollTo(0,0)
    }
  }

  const changeSearchingValue = (val) =>
  {
    setsearchingValue(val)
  }

  const clearSearchingValue = ()=>{
    setsearchingValue('')
  }

  const search = (navlink) =>
  {
    
    navigate(`search/${navlink}/1`)
  }

  const changeLogin = (val)=>
  {
    setLogged(val)
  }

  const changeDefaultSearchingValues = (obj)=>
  {
    setDefaultContentSearching(obj)
    navigate('/offers/all/1')
  }

  return (
    <div className="App">
    <LoginContext.Provider value={{value:logged,changeValue:changeLogin}} >
      <TopBar />
      <SearchingValueContext.Provider value={{searchingValue:searchingValue,changeSearchingValue:changeSearchingValue,clearSearchingValue:clearSearchingValue,search:search}}>

        <resSearchbarContext.Provider value={{value:displayResponsiveSearchBar,changeValue:showSearchResponsiweBar}}>
          <NavBar />
        </resSearchbarContext.Provider>

        {displayResponsiveSearchBar?<ResponsiveSearchBar />:null}
      </SearchingValueContext.Provider>

      <Routes>
        <Route path="/search//1" element={<NavToHome />}></Route>
        <Route path="/search/:phrase/:pageNumber" element={<SearchContent/>}></Route>
        <Route path="/offers/:id" element={<SingleOffer />}></Route>
        <Route path="/liked/:userId" element={<LikedContent />}></Route>
        <Route path="/profile/:userId" element={<Profile /> }></Route>
        <Route path="/yourOffers/:userId" element={<YourContent />}></Route>
        <Route path="/addoffer/:userId" element={<AddOffer />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/userOffers/:userId" element={<UserOffers />} />
        <Route path="/forgotPassword" element={<PasswordForgot />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/offers/:phrase/:pageNumber" element={<SearchContent searchingData={defaultContentSearching}/>}></Route>
        <Route path="statute" element={<Statute />}></Route>
        <Route path="/" element={<ContentDefault change={changeDefaultSearchingValues}/> }></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

      {href.includes('/profile') || href.includes('/addoffer') || href.includes('/login') || href.includes('/register')?null:<Footer />}
      

      </LoginContext.Provider>
    </div>
  );
}


export default App;
