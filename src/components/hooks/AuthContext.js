import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';


const AuthContext = React.createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useLocalStorage("auth", null);


    return <AuthContext.Provider value={{ user, setUser }} >U{children}</AuthContext.Provider >
}

export default AuthContext