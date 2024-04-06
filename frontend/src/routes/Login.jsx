import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../ui/Components/Button';
import Cookies from 'js-cookie';
import { useLayoutEffect } from 'react';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            
    
            const data = await response.json();

            


            if (data.token) {
                const userResponse = await fetch('http://localhost:8080/api/user', {
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                    },
                });
    
                const userData = await userResponse.json();

                Cookies.set("user", JSON.stringify(userData));
            }


            Cookies.set("token", data.token);
            setMessage("You're logged in!");

            navigate(-1);
            


            setIsAuthenticated(true);

        } catch (error) {
            setMessage(error.message);
        }
    };

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className='pt-[4.125rem] flex justify-center items-center min-h-screen flex-col gap-4 text-white'>
            <h1 className='text-3xl font-bold '>Login</h1>
            <form onSubmit={handleSubmit} className='bg-main-900 p-8 rounded-lg shadow-md flex flex-col gap-4'>
                <label className=''>
                    Email :
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                </label>
                <label className=''>
                    Password :
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                </label>
                <Button intent="primary" active="true" size="small" text="black" className="mt-8">Log in</Button>
            </form>
            <p className='text-white'>{message}</p>
            <Link to="/register" className='text-white underline text-sm'>Vous n'avez pas de compte ? S'inscrire</Link>
        </div>
    );
}