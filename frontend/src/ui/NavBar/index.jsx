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

export default function NavBar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const categories = useContext(CategoryContext);
  const { search, setSearch } = useContext(SearchContext);


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

    <nav className='flex flex-col fixed z-10 inset-x-0'>

      <section className="bg-neutral-800 py-1 flex flex-row justify-between items-center px-5">
        <Link to="/" className="w-28">
          <IconLogo />
        </Link>
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

        
        <div className='flex flex-row gap-4 justify-center items-center'>

          <Menus /> 

          <Button intent="bottom" size="medium">
                  <a className="font-light" href="http://localhost:8080/login">Connexion</a>
          </Button>
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

    </nav>
  );
}




