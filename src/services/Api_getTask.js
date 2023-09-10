async function getTask(id) {
  const response = await fetch(`http://localhost:4500/api/getTask/${id}`);
  const data = await response.json();
  const dataset = data.map((el) => {
    console.log('fecha', el.task_date);
          const date = new Date(el.task_date);
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate() 
          const dayIs = day < 10 ? `0${day}` : day
          const monthIs = month < 10 ? `0${month}` : month;
    return {
      id: el.task_id,
      date: `${year}-${monthIs}-${dayIs}`,
      name: el.task_name,
      checked: el.task_checked,
    };
  });
  console.log('dataset', dataset.date);
  return dataset;
}

export default getTask;
