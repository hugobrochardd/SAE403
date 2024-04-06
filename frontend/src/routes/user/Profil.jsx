import React, { useLayoutEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Button from '../../ui/Components/Button';
import { ChevronLeft } from "react-feather";
import { User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'react-feather';
import { useEffect } from 'react';


export default function Profil() {
  const [user, setUser] = useState(null);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(null);
  const [pseudo, setPseudo] = useState(user ? user.Pseudo : '');
  const [email, setEmail] = useState(user ? user.Email : '');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(user ? user.Id : '');
  const [section, setSection] = useState('infos');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState(null);
  const [pseudoUpdateMessage, setPseudoUpdateMessage] = useState(null);
  const navigate = useNavigate(); 


  const goBack = () => {
    navigate(-1);
  };


  async function updatePseudo(emails, pseudos, ids, passwords) {
    try {
  
      const response = await fetch('http://193.168.145.234:8080/api/updatepseudo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emails,
          pseudo: pseudos,
          id: ids,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.message);

      }

      const response1 = await fetch('http://193.168.145.234:8080/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emails,
                    password: passwords,
                }),
            });
    
            if (!response1.ok) {
                const errorData = await response1.json();
                setPseudoUpdateMessage('Mauvais mot de passe');
                throw new Error(errorData.message);
            }



    
            const data1 = await response1.json();


            Cookies.remove('token');
            Cookies.set("token", data1.token);
            setPseudoUpdateMessage('Informations mis à jour avec succès');


            if (data1.token) {
                const userResponse = await fetch('http://193.168.145.234:8080/api/user', {
                    headers: {
                        'Authorization': `Bearer ${data1.token}`,
                    },
                });
    
                const userData = await userResponse.json();

                Cookies.remove('user');
                Cookies.set("user", JSON.stringify(userData));
                window.location.reload();
            }
          } catch (error) {
            console.error('Error:', error);
            setPseudoUpdateMessage('Erreur lors de la mise à jour du pseudo');
          }
        }










    async function updatePassword(email, oldPassword, newPassword, id) {
        const response = await fetch('http://193.168.145.234:8080/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: oldPassword,
        }),
        });
  
        if (!response.ok) {
            setPasswordUpdateMessage('Mauvais mot de passe');
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();


        try {
          const response = await fetch('http://193.168.145.234:8080/api/updatepassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: newPassword,
              id: id,
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
      
          const data = await response.json();

          Cookies.remove('token');
          Cookies.set("token", data.token);

          setPasswordUpdateMessage('Informations mis à jour avec succès');

    
          if (data.token) {
            const userResponse = await fetch('http://193.168.145.234:8080/api/user', {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                },
            });
    
            const userData = await userResponse.json();
            Cookies.remove('user');
            Cookies.set("user", JSON.stringify(userData));
            window.location.reload();
        }
    
          return data;
        } catch (error) {
          console.error('Error:', error);
          setPasswordUpdateMessage('Erreur lors de la mise à jour du mot de passe');
          return null;
        }
    }







  

  useEffect(() => {
    if (user) {
      setPseudo(user.Pseudo);
      setEmail(user.email);
      setId(user.id);
    }
  }, [user]);




  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute top-0 left-0 p-6 pt-[6.125rem] flex flex-row gap-4 justify-center items-center">
            <ChevronLeft className="size-10 cursor-pointer text-white" onClick={goBack} />
            <h1 className="text-4xl font-medium text-main-400">Profil</h1>
        </div>
        <section className='flex flex-col items-center justify-center min-h-screen text-white gap-4  p-8 rounded-lg mt-4'>


            {section === 'infos' && (
                <section className='flex flex-col items-center justify-center bg-main-900 px-20 py-10 gap-12 rounded-xl'>
                                <div className='bg-main-900 rounded-xl'>
                <Button intent="bottom" size="medium" text="white" onClick={() => setSection('infos')}>Mes informations</Button>
                <Button intent="bottom" size="medium" text="white" onClick={() => setSection('password')}>Modifier mon mot de passe</Button>
            </div>
                    
                    <User className="size-44 text-white bg-transparent rounded-full border-8" aria-hidden="true" />
                    <h1 className="text-2xl font-bold mb-4">Mes informations</h1>
                    <form onSubmit={(e) => {e.preventDefault(); updatePseudo(email, pseudo, id, password);}} className='flex flex-col gap-4'>
                                <label className='text'>
                                        Pseudo :
                                    <input type="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="" required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                                </label>
                                <label className=''>
                                        Email :
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                                </label>
                                <label className=''>
                                        Password :
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" required className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                                </label>
                                <Button type="submit" intent="primary" active="true" size="small" text="black" className="mt-8">Update informations</Button>
                                {pseudoUpdateMessage && <p>{pseudoUpdateMessage}</p>}
                    </form>
                    {isRegistrationSuccessful === null ? null : isRegistrationSuccessful ? <p>Registration successful</p> : <p>Registration failed</p>}
                </section>
            )}

            {section === 'password' && (
                <section className='flex flex-col items-center justify-center bg-main-900 px-20 py-10 gap-12 rounded-xl'>
                                <div className='bg-main-900 rounded-xl'>
                <Button intent="bottom" size="medium" text="white" onClick={() => setSection('infos')}>Mes informations</Button>
                <Button intent="bottom" size="medium" text="white" onClick={() => setSection('password')}>Modifier mon mot de passe</Button>
            </div>
                    
                    <Lock className="size-40 text-white bg-transparent" aria-hidden="true" />
                    <h1 className="text-2xl font-bold mb-4">Mot de passe</h1>
                    <form onSubmit={(e) => {e.preventDefault(); updatePassword(email, oldPassword, newPassword, id)}}className='flex flex-col gap-4'>
                                <label className=''>
                                    Ancien mot de passe :
                                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="" className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                                </label>
                                <label className=''>
                                    Nouveau mot de passe :
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="" className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700 mt-2 rounded-md"/>
                                </label>
                                <Button type="submit" intent="primary" active="true" size="small" text="black" className="mt-8">Update password</Button>
                                {passwordUpdateMessage && <p>{passwordUpdateMessage}</p>}
                    </form>
                    {isRegistrationSuccessful === null ? null : isRegistrationSuccessful ? <p>Registration successful</p> : <p>Registration failed</p>}
                </section>
            )}
        </section>
    </div>
  );
};


