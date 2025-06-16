import { createContext } from "react";
import App from "../App";
export const AppContext = createContext()
const AppContextProvider = (props) => {
    const currency= '$'
    const calculateAge= (dob)=>{
        const today= new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const months = [" ","jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  


  const slotDateFormate= (slotDate)=>{
    const dateArray= slotDate.split('_');
    return dateArray[0]+ ' ' + months[parseInt(dateArray[1])] + ' ' + dateArray[2];

  }

    const value={
        calculateAge
        , slotDateFormate,
        currency
        

    }
    return (
       <AppContext.Provider value={value}>  
        {props.children}
       </AppContext.Provider>
    )

}

export default AppContextProvider