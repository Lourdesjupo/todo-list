
import PropTypes from 'prop-types';


// eslint-disable-next-line react/prop-types
function Task ({task, onChecked,onDelete, onEdit }) {
  function handleClick (id){
    return onChecked(id)
  }
  function handleClickDelete (id){
    return onDelete(id)
  }
  function handleClickEdit (id){
    return onEdit(id)
  }
  const task__checked = {

		width: "20px"
  }
    console.log('task', task)

  

  return (
  <li className="task">
    <div className="task__head">
      <p className="task__date">{task.date}</p>
      <img className="task__edit" src="./pen-solid.svg" alt="editar" onClick={handleClickEdit(task.id)}/>
      <img className="task__delete"src="./xmark-solid.svg" alt="borrar" onClick={handleClickDelete(task.id)}/>
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