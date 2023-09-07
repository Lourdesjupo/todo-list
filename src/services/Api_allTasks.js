const getAllTasks = async ()=> {
  const userId = '1'
  const response = await fetch(`http://localhost:4500/api/allTasks/${userId}`);
  const todoList = await response.json();
  console.log('todo get alltask', todoList)
  const date1 = new Date(todoList[0].task_date)

  const result = [
    {
      id: todoList[0].task_id,
      date: date1.toLocaleDateString(),
      name: todoList[0].task_name,
      checked: todoList[0].task_checked,
    },
  ];
  return result;
}

export default getAllTasks

getAllTasks()