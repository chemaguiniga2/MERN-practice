import React, {useContext, useEffect} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';
import Proyecto from './Proyecto';



const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;

    //obtener proyecto cuando carga componente
    useEffect(() => {
        //si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
        obtenerProyectos();
    },[]);

    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;


    return (

        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto = {proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>

    );
}
 
export default ListadoProyectos;