import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada]);

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
    })

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    //si no hay proyecto seleccionado
    if(!proyecto) return null;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //leer los valores del formulario
    const handleChnage = e => {
        console.log(e.target.value)
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }
        //Si es revision o nueva tarea
        if(tareaseleccionada === null){
            //tarea nueva
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);

            //elimina tareaseleccionada del state
            limpiarTarea();
        }


        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre: ''
        })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChnage}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error"> El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}
 
export default FormTarea;