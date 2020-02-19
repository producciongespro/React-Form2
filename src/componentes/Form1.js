import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtener from '../modulos/obtener';
import CheckBox from '../componentes/CheckBox';

export default function Form1() {
    const { register, handleSubmit, errors } = useForm();

    //Estado para controlar la carga del json de productos:
    const [productos, setProductos] = useState(null);
    
    //Estado que maneja el producto seleccionado por el usuario
    const [producto, setProducto] = useState(null);

    //Estado que carga las poblaciones del json del servidor
    const [poblaciones, setPoblaciones] = useState(null);

    //Cargado se cambia a True cuando se termina la carga de json del servidor
    const [cargado, setCargado] = useState(false);
    const onSubmit = data => console.log(data);
    console.log(errors);


async function obtenerDatos () {
    const tmpProductos =  await obtener("http://pruebarecursos.mep.go.cr/webservices/si-ddie/consultas_generales.php?tabla=tipo_productos");
    const tmpPoblaciones = await obtener("http://pruebarecursos.mep.go.cr/webservices/si-ddie/consultas_generales.php?tabla=productos_poblacion_meta");
    //console.log("tmpProductos", tmpProductos);
    //console.log("tmpPoblaciones", tmpPoblaciones);      
    setProductos(tmpProductos);
    setPoblaciones(tmpPoblaciones);
    setCargado(true);
}



    useEffect(() => {
        //Acción que se ejecuta una vez que se monta el componente
        console.log("Componente montado");
        obtenerDatos(); 
       }, []);


    const handleSeleccionarProducto =(e)=>{
        //obtenr el valor de seleccion
        console.log("id del producto seleccionado", e.target.value);
        setProducto(e.target.value);
        
    }

    return (        
            cargado ?                    
      (
        <div className="col-12">
        <form onSubmit={handleSubmit(onSubmit)}>
            <select onChange={handleSeleccionarProducto} name="producto" ref={register}>
               {
                   productos.map((item,i)=>(
                   <option key={"producto"+i} value={item.id}>{item.tipo}</option>
                   ))
               }
            </select>
            <br/>

                {
                    producto > 1 && 
                    <CheckBox  array={poblaciones} register={register}  />
                }

            <hr/>
            <input className="btn btn-success" type="submit" />
        </form>
    </div>
      )
        : 
        (
            <span>Cargando datos. Por favor espere...</span>                 
        )      
    
    );
}