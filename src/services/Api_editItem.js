
async function editItem(item) {
    console.log(item)
    const ndate = new Date(item.date)
    item.date = ndate
    console.log(item,'envio al servidor')
    try {
        await fetch(`http://localhost:4500/api/editItem`, {
            method: 'PUT',
            headers: { 'content-type':'application/json'},
            body: JSON.stringify(item)
        })

    } catch (error) {
        console.error('error al editar tarea', error)

    }
}

export default editItem