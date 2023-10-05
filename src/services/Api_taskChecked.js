const taskChecked = async (data)=>{

  try { 
    await fetch(`${import.meta.env.TDLIST_API}/api/taskchecked`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
  catch (error){
    console.error('error actualizando check ')
  }
}
export default taskChecked;

//data = {task_name:, task_date:, task_checked:}
