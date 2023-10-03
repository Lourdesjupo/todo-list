import Task from './Task'
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Tasklist ({tasklist, onTaskChecked, taskType, onDelete, onEdit}) {
  function handleChecked (id, check) {
    onTaskChecked(id, check)
  }
  function handleClickDeleted (task) {
    onDelete(task)
  }
  function handleClickEdit (task) {
    onEdit(task)
  }
  return (
<ul >
  <div className='tasklist'>
    <p className='tasklist--span'>{taskType}</p>
    <p className='tasklist--type'><span className='tasklist--star'>🟢</span></p>
      
  </div>
{tasklist.map((task)=>{
  return (<Task
  task ={task}
  key={task.id}
  onChecked={handleChecked}
  onDelete={handleClickDeleted}
  onEdit={handleClickEdit}
  taskType={taskType}
  />)
})}
</ul>)

}
Tasklist.propTypes = {
  tasklist: PropTypes.array.isRequired
}
export default Tasklist