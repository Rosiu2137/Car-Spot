import React from "react";

const searchingValueContext = React.createContext({
    searchingValue:'',
    changeSearchingValue:()=>{},
    clearSearchingValue:()=>{},
    search:()=>{},
})

export default searchingValueContext