import {Link} from 'react-router-dom';
import Button from '../Components/Button'
import React, { useState } from 'react';
import IconLogo from '../Components/icons/IconLogo.jsx'
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { Search } from "react-feather";
import Menus from '../Components/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import { Menu } from 'react-feather';
import { useEffect } from 'react';
import { X } from 'react-feather';

export default function NavBar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const categories = useContext(CategoryContext);
  const { search, setSearch } = useContext(SearchContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    setShowCategories(false)
  };


  const handleSearchSubmit = () => {
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
      setShowSearch(false);
    }
  };


  const handleCategoryClick = () => {
    setShowCategories(!showCategories)
    setShowSearch(false);
  };



  const handleCategorySubmit = (category) => {
    navigate(`/categories/${category}`);
    setShowCategories(false);
  };

  


  return (

    <nav className='flex flex-col fixed z-30 inset-x-0'>

      <section className="bg-neutral-800 py-1 flex flex-row justify-between items-center px-5">
        <div className='flex flex-row gap-2 items-center justify-center'>

      {isSmallScreen && (
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className='w-6 text-neutral-100'/>
        </button>
      )}

        <Link to="/" className="w-28">
          <IconLogo />
        </Link>
        </div>
        {!isSmallScreen && (
        <section className='flex flex-row gap-0'>

          <Button intent="bottom" size="medium" text="blue">
              <Link className="font-extrabold" to="/new">Nouveautés</Link>
            </Button>

            <Button intent="bottom" size="medium" text="blue">
              <Link className="font-extrabold" to="/top">Top</Link>
            </Button>


            <Button intent="bottom" size="medium" text="blue">
              <Link className="font-extrabold" to="/selection">Sélections</Link>
            </Button>

            <Button intent="bottom" size="medium" onClick={handleCategoryClick}>Catalogue</Button>

            <Button intent="bottom" size="medium" onClick={handleSearchClick}>
              <Search className='w-4'/>
            </Button>
        </section>

        )}
        
        <div className='flex flex-row gap-4 justify-center items-center'>
          {isAuthenticated ? (
            <Menus /> 
          ) : (
            <Button intent="bottom" size="medium">
              <Link className="font-light" to="/login">Connexion</Link>
            </Button>
          )}
        </div>
      </section>

            




      {showSearch && (
          <div className='bg-neutral-800 flex flex-row p-4 gap-4 absolute top-full z-30 inset-x-0'>
            <input 
              className="bg-transparent border-none appearance-none w-full px-3 py-2 text-sm
              text-neutral-100 shadow-sm ring-1 ring-inset hover:ring-main-700" 
              type="text" 
              placeholder="Rechercher" 
              value={search} 
              onChange={e => setSearch(e.target.value)}
            />
            <Button intent="primary" size="small" active="true" onClick={handleSearchSubmit}>Valider</Button>
            <Button intent="primary" size="small" onClick={() => setShowSearch(false)}>Fermer</Button>
          </div>
        )}



      {showCategories && (
        <div className='bg-neutral-800 flex flex-col p-12 gap-6 absolute top-full z-30 inset-x-0'>
          <h3 className='text-main-400 text-2xl font-light'>Catégories</h3>
          <article className='grid grid-cols-4 b v gap-3 justify-start items-start max-w-max'>
            {categories.map(category => (
              <button 
                key={category.id} 
                className="bg-transparent text-neutral-100 hover:opacity-90 inline-block text-sm font-light text-left ml-10 opacity-60"
                onClick={() => handleCategorySubmit(category.name)}
              >
                {category.name}
              </button>
            ))}
          </article>
        </div>
      )}


      {isMenuOpen && (
        <div className="menu absolute bg-neutral-800 flex inset-0 flex-col z-50 h-screen">
          <button onClick={() => setIsMenuOpen(false)} className='p-6 text-neutral-100'><X></X></button>
          <Link className="font-extrabold text-center" to="/new">
          <Button intent="bottom" size="medium" text="blue" onClick={() => {setIsMenuOpen(false);}}>
            Nouveautés
          </Button>
          </Link>

          <Link className="font-extrabold text-center" to="/top">
          <Button intent="bottom" size="medium" text="blue" onClick={() => {setIsMenuOpen(false);}}>
            Top
          </Button>
          </Link>

          <Link className="font-extrabold text-center" to="/selection">
          <Button intent="bottom" size="medium" text="blue" onClick={() => {setIsMenuOpen(false);}}>
           Sélections
          </Button>
          </Link>

          <Button intent="bottom" size="medium" onClick={() => {setIsMenuOpen(false); handleCategoryClick();}}>Catalogue</Button>

          <Button className="flex items-center justify-center" intent="bottom" size="medium" onClick={() => {setIsMenuOpen(false); handleSearchClick();}}>
            <Search className='w-4'/>
          </Button>
        </div>
      )}

    </nav>
  );
}




