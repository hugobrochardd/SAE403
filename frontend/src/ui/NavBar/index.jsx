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


  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };


  const { search, setSearch } = useContext(SearchContext);
  const handleSearchSubmit = () => {
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
      setShowSearch(false);
    }
  };





  const categories = useContext(CategoryContext);
  const [selectedOption, setSelectedOption] = useState(categories && categories.length > 0 ? categories[0].id : null);
  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
    navigate(`/categories/${event.target.value}`);
    
  }

  


  return (

    <nav className='flex flex-col'>

      <section className="bg-neutral-800 py-1 flex flex-row justify-between items-center px-5">
        <Link to="/" className="w-28">
          <IconLogo />
        </Link>
        <section className='flex flex-row gap-0'>

        <Button intent="bottom" size="medium" text="blue">
            <Link className="font-semibold" to="/new">Nouveautés</Link>
          </Button>

          <Button intent="bottom" size="medium" text="blue">
            <Link className="font-semibold" to="/top">Top</Link>
          </Button>


          <Button intent="bottom" size="medium" text="blue">
            <Link className="font-semibold" to="/selection">Selection</Link>
          </Button>

          <Button intent="bottom" size="medium">
            <select value={selectedOption} onChange={handleSelectChange} className="bg-transparent border-none uppercase appearance-none text-neutral-100 font-light">
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </Button>

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
          <div className='bg-neutral-800 flex flex-row p-5 gap-4'>
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
    </nav>
  );
}




