
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



// eslint-disable-next-line react/prop-types
function Task ({task, onChecked, onDelete }) {
  function handleClick (id, check){
    check = check === 0 ? 1:0

    return onChecked(id, check)
  }

  const handleDeleteId = (id)=> {
    return onDelete(id)
  }
  const task__checked = {

		width: "20px"
  }
  const id = task.id

  //param (date), return boolean
  function pastTask (dateStr)  {
    const dateParts = dateStr.split ('/')
    const date = new Date (`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`)
    const now = new Date () 
    return date < now 

  }

  return (
  <li className="task">
    <div className="task__head">
      <p className="task__date" style={{color: pastTask(task.date)? 'red': undefined}}>{task.date}</p>
      <Link to={`/editTask/${id}`}>
       <img className="task__edit" src="./pen-solid.svg" alt="editar"/>
      </Link>
      <img className="task__delete"src="./xmark-solid.svg" onClick={()=>{handleDeleteId(task.id)}}alt="borrar"/>
    </div>
    <div className="task__data">
      <p className={task.checked === 0 ? "task__name": "task__done" }>{task.name}</p>
      <img className="task__checked" style={task__checked} src={task.checked === 0 ? './uncheck.svg' : './check-solid.svg'} onClick={()=>{handleClick(task.id, task.checked)}}></img>
    </div>
    
  </li>
)
}

Task.propTypes = {
  task: PropTypes.object.isRequired
}
export default Task