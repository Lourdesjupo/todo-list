async function deleteItem(id) {

  try {
    await fetch(`${import.meta.env.TDLIST_API}/api/deleteTask/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return('no se pudo borrar tu tarea:', error);
  }
}

export default deleteItem;