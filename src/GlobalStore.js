import React, {createContext} from 'react';
import useNotificationStore from './useNotificationStore';

export const globalContext = createContext();

export const GlobalProvider = ({children}) => {
    const notificationStore = useNotificationStore();

    return (
        <globalContext.Provider value={{notificationStore}}>
            {children}
        </globalContext.Provider>
    )
}