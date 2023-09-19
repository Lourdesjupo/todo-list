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
    ev.preventDefault()
    try {
      if(newTask.name ===''){
        throw new Error('Rellena el nombre de la tarea')
      }
      await addNewTask({
        ...newTask,
        date: newTask.date === '' ? null : newTask.date,
      });
      console.log('tarea creada')
       navigate('/')
    } catch (error) {
      setErrorMsg(`Error al crear la tarea: ${error.message}` );
      console.log('ERROR', error)
    }
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

            <button className='button btn_addTask' onClick={handleNewTaskClick}>
              Add task
            </button>
            <Link className='button btn_addTask' to={'/'}>
              cancelar
            </Link>
          </form>
          {errorMsg && (
            <div className='error_addTask'>{errorMsg}</div>
          )}
         
        </section>
      </main>
    </>
  );
}

export default AddTask;
