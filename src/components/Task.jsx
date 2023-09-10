
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
function Task ({task, onChecked }) {
  function handleClick (id){
    return onChecked(id)
  }
  // function handleClickDelete (task){
  //   return onDelete(task)
  // }

  const task__checked = {

		width: "20px"
  }
  const id = task.id

  return (
  <li className="task">
    <div className="task__head">
      <p className="task__date">{task.date}</p>
      <Link to={`/editTask/${id}`}>
       <img className="task__edit" src="./pen-solid.svg" alt="editar"/>
      </Link>
      <img className="task__delete"src="./xmark-solid.svg" alt="borrar"/>
    </div>
    <div className="task__data">
      <p className="task__name">{task.name}</p>
      <img className="task__checked" style={task__checked} src={task.checked === "false" ? './uncheck.svg' : './check-solid.svg'} onClick={handleClick(task.id)}></img>
    </div>
    
  </li>
)
}

Task.propTypes = {
  task: PropTypes.object.isRequired
}
export default Task