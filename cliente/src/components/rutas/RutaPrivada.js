import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    const AuthContext = useContext(authContext);
    const { autenticado, usuarioAutenticado, cargando } = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <Route {...props} render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )}
        
        />
    );
}
 
export default RutaPrivada;