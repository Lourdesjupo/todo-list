import { useState } from 'react';
import addNewTask from '../services/Api_addNewTask';
import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function AddTask() {
  const [newTask, setNewTask] = useState({
    fk_user: 1,
    name: '',
    date: '',
    checked: false,
  });
  // console.log('esta es la tarea guardada en addTask', newTask);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState();

  const handleFormDate = (ev) => {
    //cambiar a UTC
    const nDate = new Date(ev.target.value);
    setNewTask({ ...newTask, date: nDate });
  };
  const handleFormName = (ev) => {
    setNewTask({ ...newTask, name: ev.target.value.trim() });
  };

  const handleNewTaskClick = async (ev) => {
    ev.preventDefault();
    try {
      if (newTask.name === '') {
        throw new Error('Please fill in at least the description field');
      }
      await addNewTask({
        ...newTask,
        date: newTask.date === '' ? null : newTask.date,
      });
      console.log('tarea creada');
      navigate('/tasks');
    } catch (error) {
      setErrorMsg(`Error: ${error.message}`);
      console.log('ERROR', error);
    }
  };

  return (
    <>
      <main>
        <section>
          <form className='form__addTask'>
            <fieldset className='fiedset'>
              <h1 className='title_addTask'>Add your task</h1>
              <p className='title_addTask--title'>
                Indicate date and the task description
              </p>
              <input
                className='fiedset__date'
                type='date'
                name='date'
                id='date'
                onChange={handleFormDate}
              />

              <textarea
                className='fiedset__name'
                name='nameTask'
                id='task'
                cols='30'
                rows='10'
                placeholder='Write here what do you have to do'
                onChange={handleFormName}
              ></textarea>
            </fieldset>

            <div className="buttons__form">
              <button className='btn_addTask' onClick={handleNewTaskClick}>
                Add task
              </button>
              <Link className='btn_cancel' to={'/tasks'}>
                Cancel
              </Link>
            </div>
          </form>
          {errorMsg && <div className='error_addTask'>{errorMsg}</div>}
        </section>
      </main>
    </>
  );
}

export default AddTask;
