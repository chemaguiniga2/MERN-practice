import React, { useContext, useEffect } from 'react';
import authContext from '../../context/autenticacion/authContext';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTarea';





const Proyectos = () => {

    //extraer la informacion de autenticacion
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Proyectos;