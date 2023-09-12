import { useState } from 'react';
import taskChecked from '../services/Api_addNewTask';
import { Link } from 'react-router-dom';

function AddTask() {
  const [newTask, setNewTask] = useState({
    name: '',
    date: '',
    checked: false,
  });
  console.log('esta es la tarea guardada en addTask', newTask);

  const handleFormDate = (ev) => {
    const nDate = new Date(ev.target.value);
    setNewTask({ ...newTask, date: nDate });
  };
  const handleFormName = (ev) => {
    setNewTask({ ...newTask, name: ev.target.value });
  };

  const handleNewTaskClick = () => {
    console.log('handleNewTaskClick', newTask);
    return taskChecked({
      ...newTask,
      date: newTask.date === '' ? null : newTask.date,
    });
  };
  return (
    <>
      <header>
        <h1 className='title_addTask'>Añade tu tarea</h1>
      </header>
      <main>
        <section>
          <form className='form_addTask'>
            <fieldset className='fiedset'>
              <label className='fiedset_label' htmlFor='date'>
                {' '}
                Date
                <input
                  className='fiedset_date'
                  type='date'
                  name='date'
                  id='date'
                  onChange={handleFormDate}
                />
              </label>
              <label className='fiedset_label' htmlFor='nameTask'>
                {' '}
                Task
                <textarea
                  className='fiedset_name'
                  name='nameTask'
                  id='task'
                  cols='30'
                  rows='10'
                  placeholder='write here what do you have to do'
                  onChange={handleFormName}
                ></textarea>
              </label>
            </fieldset>
            <Link
              className='button btn_addTask'
              to='/'
              onClick={handleNewTaskClick}
            >
              Add task
            </Link>
          </form>
        </section>
      </main>
    </>
  );
}

export default AddTask;
