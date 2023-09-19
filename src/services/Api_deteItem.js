async function deleteItem(id) {
  console.log('este es el id de deleteItem', id)
  try {
    await fetch(`http://localhost:4500/api/deleteTask/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    });
  } catch (error) {
    console.log('no se pudo borrar tu tarea:', error);
  }
}

export default deleteItem;