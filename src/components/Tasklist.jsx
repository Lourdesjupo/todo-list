import Task from './Task'
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Tasklist ({tasklist, onTaskChecked, taskType, onDeleted,onEdit}) {
  function handleChecked (id) {
    onTaskChecked(id)
  }
  function handleClickDeleted (id) {
    onDeleted(id)
  }
  function handleClickEdit (id) {
    onEdit(id)
  }
  return (
<ul >
  <div className='tasklist'>
    <p className='tasklist--span'>To-Do</p>
    <p className='tasklist--type'><span className='tasklist--star'>⭐</span>{taskType}</p>
      
  </div>
{tasklist.map((task)=>{
  return (<Task
  task ={task}
  key={task.id}
  onChecked={handleChecked}
  onDeleted={handleClickDeleted}
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