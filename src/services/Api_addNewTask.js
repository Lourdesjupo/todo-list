const addNewTask =async (data) =>{

  try{
    await fetch(`${import.meta.env.VITE_TDLIST_API}/api/addNewTask`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    });

  } catch (error){
    console.error('error adding new task:', error)
  }
};


export default addNewTask

//{}