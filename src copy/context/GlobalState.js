import React, { createContext, useState, useEffect } from 'react';
import UserAPI from '../api/UserAPI';
import Axios from '../api/api';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log(token)
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            const refreshToken = async () => {
                try {
                    const res = await Axios.get('/user/refresh_token');
                    // setToken(res.data.accesstoken);
                    console.log(res)
                    setTimeout(refreshToken, 10 * 60 * 1000);
                } catch (error) {
                    console.log("ishladi")

                    console.error(error);
                }
            };
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        isLoading, setIsLoading
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
