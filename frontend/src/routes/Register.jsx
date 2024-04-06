import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Components/Button';
import { useLayoutEffect } from 'react';

export default function Register() {
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://193.168.145.234:8080/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password, pseudo: pseudo}),
        });
    
        if (response.headers.get('Content-Type').includes('application/json')) {
            const data = await response.json();
    
            if (response.status === 200) {
                setIsRegistrationSuccessful(true);
                setTimeout(() => setShouldRedirect(true), 3000);
            } else {

                setIsRegistrationSuccessful(false);
            }
        } else {
            setIsRegistrationSuccessful(false);
        }
    };

    if (shouldRedirect) {
        navigate ("/login");
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className='pt-[4.125rem] flex justify-center items-center min-h-screen flex-col gap-4 text-neutral-100'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <form onSubmit={handleSubmit} className='bg-main-900 p-8 rounded-lg shadow-md flex flex-col gap-4'>
                <label className=''>
                        Pseudo :
                    <input type="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="" required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                </label>
                <label className=''>
                        Email :
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                </label>
                <label className=''>
                    Password :
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                </label>
                <Button intent="primary" active="true" size="small" text="black" className="mt-8">Register</Button>
            </form>
            {isRegistrationSuccessful === null ? null : isRegistrationSuccessful ? <p>Registration successful</p> : <p>Registration failed</p>}
            <Link to="/login" className='text-neutral-100 underline text-sm'>Already have an account? Login here</Link>
        </div>
    );
}

