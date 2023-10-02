const addNewTask =async (data) =>{
  console.log('recibo los datos de add task',data)
  try{
    await fetch('http://localhost:4500/api/addNewTask', {
      method: 'POST',
      headers: { 'content-type': 'application/json',"Authorization": localStorage.getItem("jwt")},
      body: JSON.stringify(data),
    });

  } catch (error){
    console.error('error adding new task:', error)
  }
};


export default addNewTask

//{}