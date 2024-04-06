import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function PrivateRoute({ children, ...rest }){
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return isAuthenticated ? children : navigate('/login');
};

