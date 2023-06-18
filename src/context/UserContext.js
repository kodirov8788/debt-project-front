import { createContext, useState } from "react";

export const UserContext = createContext()


export const UserContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);


    return <UserContext.Provider value={{ isLoading, setIsLoading }}>{children}</UserContext.Provider>
}