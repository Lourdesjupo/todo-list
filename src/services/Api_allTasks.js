
const getAllTasks = async ()=> {
  // const userId = '1'
  const response = await fetch(`${import.meta.env.TDLIST_API}/api/allTasks`, {
    method: 'GET',
    headers: { Authorization: localStorage.getItem('jwt') },
  });
  const todoList = await response.json();

  
  const result = todoList.map((el)=>{
    const date = new Date(el.task_date)
    return {
      id: el.task_id,
      date: el.task_date === null ? '' : date.toLocaleDateString(),
      name: el.task_name,
      checked: el.task_checked,
    };})
  return result;

}

export default getAllTasks

getAllTasks()