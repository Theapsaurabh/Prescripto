import { createContext } from "react";
import { doctors } from "../assets/assets";
import App from "../App";
export const AppContext = createContext();


export const AppProvider = (props) => {
    const currencySymbol= "₹";

    const value={
        doctors, currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
           {props.children}
        </AppContext.Provider>
    )

}
export default AppProvider;