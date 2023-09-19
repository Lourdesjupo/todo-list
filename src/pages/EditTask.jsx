import { useEffect, useState } from 'react';
import getTask from '../services/Api_getTask';
import { Link, useParams } from 'react-router-dom';
import editItem from '../services/Api_editItem';

// eslint-disable-next-line react/prop-types
function EditTask() {
  const { id } = useParams();
  const [editTask, setEditTask] = useState({
    date: '',
    name: '',
  });
  console.log(editTask)
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    getTask(id).then((data) => {
      const task = data[0];
      setEditTask(task);
    });
  }, []);

  function handleClick() {
    console.log(editTask)
    editItem(editTask);
  }

  const handleDate = (ev) => {
    console.log(ev.target.value, 'fecha')
    setEditTask({ ...editTask, date: ev.target.value });
  };
  const handleNameTask = (ev) => {
    const currentValue = ev.target.value;
    setEditTask({ ...editTask, name: currentValue });
  };

  return (
    <>
      <header>
        <h2 className='title_editTask '>Modifica tu tarea</h2>
      </header>
      <main>
        <form>
          <fieldset className='fieldset'>
            <label htmlFor='date' className='fieldset_label'>
              <input
                type='date'
                name='date'
                id='date'
                value={editTask.date}
                onChange={handleDate}
                className='fieldset_date'
              />
            </label>
            <label htmlFor='name_task' className='fieldset_label'>
              <textarea
              className='fieldset_date'
                name='name_task'
                id=''
                cols='30'
                rows='10'
                value={editTask.name}
                onChange={handleNameTask}
              ></textarea>
            </label>
          </fieldset>
          <Link to={'/'}>
            <button className='button'onClick={handleClick}>Modificar</button>
          </Link>
        </form>
      </main>
    </>
  );
}

export default EditTask;
