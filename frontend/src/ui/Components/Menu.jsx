import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { User } from 'react-feather'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Menus() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const data = Cookies.get('user');
      setUser(data ? JSON.parse(data) : null);
    }
  }, [isAuthenticated]);



   

  function logout() {
    navigate('/logout');
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-neutral-100 border-b-2 border-transparent hover:border-b-2 hover:border-b-main-400 uppercase text-sm py-4 flex flex-row gap-2 justify-center items-center">
          {user ? user.Pseudo : 'User'}
          <User className="size-4 text-white" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-800 ring-black text-neutral-100">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? 'bg-main-900 text-neutral-100' : 'text-neutral-100',
                    'block px-4 py-2 text-base'
                  )}
                  to="/profil"
                >
                  Profil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? 'bg-main-900 text-neutral-100' : 'text-neutral-100',
                    'block px-4 py-2 text-base'
                  )}
                  to="/playlist"
                >
                  Historique
                </Link>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={classNames(
                      active ? 'bg-main-900 text-neutral-100' : 'text-neutral-100',
                      'block w-full px-4 py-2 text-left text-base'
                    )}
                  >
                    Se déconnecter
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}