import React from 'react';
import LogoMediatheque from '../icons/IconFooter.jsx';
import LogoArte from '../icons/arte.jsx';
import LogoUniversCine from '../icons/universciné.jsx';
import LogoCinetek from '../icons/cinetek.jsx';

export default function Footer() {
  return (
    <footer className='mt-8'>
        <div className="flex justify-between p-8 bg-transparent text-white gap-8">
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
        <ul className="flex flex-row gap-6 bg-neutral-800 pt-4 w-full items-center justify-center">
            <li className="text-white text-xs text-center bg-neutral-800 py-2 underline">Mentions légales</li>
            <li className="text-white text-xs text-center bg-neutral-800 py-2 underline">Politique de confidentialité</li>
            <li className="text-white text-xs text-center bg-neutral-800 py-2 underline">Conditions d'utilisation</li>
            <li className="text-white text-xs text-center bg-neutral-800 py-2 underline">Contact</li>
        </ul>
        <h5 className="text-white text-xs text-center bg-neutral-800 pt-2 pb-6">© 2024 - Tous droits réservés</h5>
    </footer>
  );
}