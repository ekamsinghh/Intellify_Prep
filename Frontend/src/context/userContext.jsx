import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);
                setUser(response.data.data);
            }
            catch(err){
                console.log("User Not Authenticated");
                clearUser();
            }
            finally{// this block always execute no matter what happens in try and catch block
                setLoading(false);
            }
        };

        fetchUser();
    });

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token",userData.token);
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;