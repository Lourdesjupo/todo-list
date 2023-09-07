import { useState } from "react"


function AddTask () {

  const [newTask, setNewTask] = useState({
    nameTask:'',
    date:'', 
    checked:false
  })
  console.log(newTask)

const handleForm = (ev)=>{  
  console.log(ev)
setNewTask({...newTask, [ev.target.name] : ev.target.value})
}
const handleNewTaskClick =()=>{
console.log('handleNewTaskClick')
}
return (<>
<header> 
  <h1>Añade tu tarea</h1>
</header>
<main>
<section>
  <form>
    <fieldset>
      <label htmlFor="date"> Date
        <input type="date" name="date" id="date" onChange={handleForm}/>
      </label>
      <label htmlFor="nameTask"> Task
       <textarea name="nameTask" id="task" cols="30" rows="10" placeholder="write here what do you have to do" onChange={handleForm}></textarea>
      </label>
    </fieldset>
    <button onClick={handleNewTaskClick}>Add task</button>
  </form>
</section>
</main>


</>)

}

export default AddTask