async function deleteItem(id) {

  try {
    await fetch(`http://localhost:4500/api/deleteTask/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    });
  } catch (error) {
    return('no se pudo borrar tu tarea:', error);
  }
}

export default deleteItem;