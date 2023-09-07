
import PropTypes from 'prop-types';


// eslint-disable-next-line react/prop-types
function Task ({task, onChecked}) {
  function handleClick (id){
    return onChecked(id)
  }
  const task__checked = {

		width: "20px"
  }
    console.log('task', task)

  

  return (
  <li className="task">
    <p className="task__date">{task.date}</p>
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