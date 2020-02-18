import React from 'react';


export default function CheckBox( props ) {
  
  return (    


    props.array.map((item, i)=>(
           <span  key={"chk"+i}>
                <input type="checkbox" placeholder={item.nombre} name={item.nombre} ref={props.register} /> 
                {item.nombre}
           </span>
    ))
      
      
       
  );
}