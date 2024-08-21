import React, { createContext, useState, ReactNode, } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export interface User {
    username: string;
    email: string;
    role: string;
}

export interface UserContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, passwordConfirm: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const URL = import.meta.env.VITE_API_URL;

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('token') || null);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("accessCookies"));

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${URL}/users/login`, { email, password });
            const token = response.data.token;

            // Store the token in cookies
            Cookies.set('accessCookies', token, { expires: 7 }); // 7 days expiration
            if (token) {
                const decodedToken: { username: string; role: string; email: string } = jwtDecode(token);
                setUser({
                  username: decodedToken.username,
                  role: decodedToken.role,
                  email: decodedToken.email
                });
            }
            setToken(token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed');
        }
    };

    const signup = async (username: string, email: string, password: string, passwordConfirm: string) => {
        try {
            await axios.post(`${URL}/users/signup`, {
                username,
                email,
                password,
                passwordConfirm,
                // role,
            });
        } catch (error) {
            console.error('Signup failed:', error);
            throw new Error('Signup failed');
        }
    };
    
    

    const logout = () => {
        // Remove the token from cookies
        Cookies.remove('accessCookies');
        setToken(null);
        setIsAuthenticated(false);
    };

    const contextValue = {
        token,
        login,
        logout,
        signup,
        isAuthenticated,
        user,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
