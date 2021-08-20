import React, { Fragment,useState} from "react"
import Formulario from "./components/Formulario"
import Recordatorio from "./components/Recordatorio"


function App() {
  
  const [tareas, setTareas] = useState([]) 
  const [tareaToEdit, setTareaToEdit] = useState(null)  // tiene escuchador de cambio en formulario  
  console.log(tareas)

  //mete cada objeto en un array 
  const crearTareasf = tarea =>{ setTareas( [...tareas, tarea] ) }

  const eliminarf = id => {
    setTareas( tareas.filter( tarea => tarea.id !== id ) )
  }
  
  const tareaEditf = tarea => { setTareaToEdit(tarea) }

  const todoUpdated = updated => {
      setTareas(tareas.map( tarea => tarea.id === updated.id ? updated : tarea ))
      setTareaToEdit(null)
  }
  
  const tareaToggle = id => { 
      tareas.map( el => el.id === id ? el.toggle = !el.toggle : el.toggle )
  }

  const titulo = tareas.length === 0 ? "No hay Tareas" : "Administra tus Tareas" 

  return (
    <Fragment>

      {titulo}

      <h2>{ tareaToEdit && 'Editar tarea' }</h2>

      <Formulario 
          crearTareasp={crearTareasf} 
          editNull={tareaEditf} 
          tareaToEdit={tareaToEdit}
          todoUpdated={todoUpdated} 
      />
 
      {tareas.map( tarea => ( 
            <Recordatorio 
                key={tarea.id}
                tarea={tarea} 
                eliminarp={eliminarf} 
                tareaReadyToEdit={tareaEditf}
                tareaToggle={tareaToggle} 
            />
          )
        )
      }

    </Fragment>
  )
}

export default App

 


