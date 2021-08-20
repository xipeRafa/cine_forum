import React, { Fragment } from 'react'


const Recordatorio = ({ tarea, eliminarp, tareaReadyToEdit, tareaToggle }) => {  

  return ( 
    <Fragment>
        <div className="tarea">

          <p>Tarea: {tarea.hacer}</p>
          <p>Detalles: {tarea.detalles}</p>
          <p>Deadline: {tarea.deadline}</p>
          <p>Deadtime: {tarea.deadtime}</p>
          <p>ID: {tarea.id}</p>
        
          <br/>

          <button
            onClick={ ()=> eliminarp(tarea.id) }>
            Eliminar {tarea.hacer}
          </button>

          <br/> <br/>

          <button
            onClick={ ()=> tareaReadyToEdit(tarea) }>
            Editar {tarea.hacer}
          </button>  <br/> <br/>
          
          <label htmlFor={tarea.id} id='toggle'>Completed </label>

          <input 
            id={tarea.id}
            name="toggle"
            type="checkbox"
            onChange={ ()=> tareaToggle(tarea.id) }
          />  

         
        </div>
    </Fragment>
  )
}
 
export default Recordatorio