import { Navigate } from 'react-router-dom';
import Biblioteca from './containers/pages/Biblioteca';
import { useCookies } from 'react-cookie';

export const PrivateRoute = () => {
    const [cookies] = useCookies(['accessToken']);

    const isAuthenticated = () => {
        return cookies.accessToken !== undefined; // Verificar si la cookie 'accessToken' existe
    };
    return isAuthenticated() ? <Biblioteca /> : <Navigate to="/login" />;
  };
  
