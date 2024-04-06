import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLayoutEffect } from 'react';

export default function Logout() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    

    useEffect(() => {
        // Check if the user is already logged out
        if (!Cookies.get('user') && !Cookies.get('token')) {
            navigate('/');
        }


        // Remove the user cookie
        Cookies.remove('user');
        Cookies.remove('token');

        setIsAuthenticated(false);

        // Redirect to the previous page
        navigate(-1);
        
    }, [navigate]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className='text-2xl text-neutral-100 font-medium'>Déconnexion en cours...</h1>
        </div>
    );
}

 