import React from 'react';
import LogoMediatheque from '../icons/IconFooter.jsx';
import LogoArte from '../icons/arte.jsx';
import LogoUniversCine from '../icons/universcine.jsx';
import LogoCinetek from '../icons/cinetek.jsx';
import { useState, useEffect } from 'react';


export default function Footer() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);


  return (
    <footer className='mt-8'>
        <div className={`logoss flex justify-between p-8 bg-transparent text-neutral-100 gap-8 ${isSmallScreen ? 'flex-wrap' : ''}`}>
            <div className='w-full bg-neutral-800 py-12 flex flex-col items-center justify-center gap-2'>
                <LogoMediatheque />
            </div>
            <div className='w-full bg-neutral-800 py-12 flex flex-col items-center justify-center gap-2'>
                <span className=' text-xs text-neutral-400 font-normal'>avec</span>
                <div className=''>
                    <LogoArte className='min-h-6'/>
                    <LogoUniversCine/>
                </div>
            </div>
            <div className='w-full bg-neutral-800 py-12 flex flex-col items-center justify-center gap-2'>
                <span className=' text-xs text-neutral-400 font-normal'>en partenariat avec</span>
                <div className=''>
                    <LogoCinetek/>
                </div>
            </div>
        </div>
        <ul className="flex flex-row gap-6 bg-neutral-800 pt-4 w-full items-center justify-center flex-wrap">
            <li className="text-neutral-100 text-xs text-center bg-neutral-800 py-2 underline">Mentions légales</li>
            <li className="text-neutral-100 text-xs text-center bg-neutral-800 py-2 underline">Politique de confidentialité</li>
            <li className="text-neutral-100 text-xs text-center bg-neutral-800 py-2 underline">Conditions d'utilisation</li>
            <li className="text-neutral-100 text-xs text-center bg-neutral-800 py-2 underline">Contact</li>
        </ul>
        <h5 className="text-neutral-100 text-xs text-center bg-neutral-800 pt-2 pb-6">© 2024 - Tous droits réservés</h5>
    </footer>
  );
}