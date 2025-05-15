import { createContext } from "react";
import { doctors } from "../assets/assets";
import App from "../App";
export const AppContext = createContext();


export const AppProvider = (props) => {

    const value={
        doctors
    }
    return (
        <AppContext.Provider value={value}>
           {props.children}
        </AppContext.Provider>
    )

}
export default AppProvider;