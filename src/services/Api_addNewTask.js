const addNewTask =async (data) =>{
  try{
    await fetch('http://localhost:5173/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

  } catch (error){
    console.error('error adding new task:', error)
  }
};


export default addNewTask

//{}