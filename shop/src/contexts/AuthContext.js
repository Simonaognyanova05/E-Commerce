import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

const initialState = {
    _id: '',
    name: '',
    email: '',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : initialState;
        } catch (error) {
            console.error('Invalid user data in localStorage', error);
            return initialState;
        }
    });

    const onRegister = (authData) => {
        console.log('User registered:', authData);
        setUser(authData);
        localStorage.setItem('user', JSON.stringify(authData));
    };

    const onLogin = (authData) => {
        console.log('User logged in:', authData);
        setUser(authData);
        localStorage.setItem('user', JSON.stringify(authData));
    };

    const onLogout = () => {
        setUser(initialState);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, onRegister, onLogout, onLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}