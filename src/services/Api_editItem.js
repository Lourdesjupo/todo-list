
async function editItem(item) {

    const ndate = new Date(item.date)
    item.date = ndate

    try {
        await fetch(`${import.meta.env.VITE_TDLIST_API}/api/editItem`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('jwt'),
          },
          body: JSON.stringify(item),
        });

    } catch (error) {
        console.error('error al editar tarea', error)

    }
}

export default editItem