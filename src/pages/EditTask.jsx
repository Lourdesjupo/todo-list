import { useEffect, useState } from 'react';
import getTask from '../services/Api_getTask';
import {useParams, useNavigate } from 'react-router-dom';
import editItem from '../services/Api_editItem';

// eslint-disable-next-line react/prop-types
function EditTask() {
  const { id } = useParams();
  const [editTask, setEditTask] = useState({
    date: '',
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    getTask(id).then((data) => {
      const task = data[0];
      setEditTask(task);
    });
  }, []);

  async function handleClick(ev) {
    ev.preventDefault();

    try {
      await editItem(editTask);

      navigate('/tasks');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDate = (ev) => {

    setEditTask({ ...editTask, date: ev.target.value });
  };
  const handleNameTask = (ev) => {
    const currentValue = ev.target.value;
    setEditTask({ ...editTask, name: currentValue });
  };

  const handleClickCancel =() =>{
    navigate('/tasks')
  }

  return (
    <>
      
      <main>
        <section>
          <form className='form__modifyTask'>
            <fieldset className='fieldset'>
              <h1 className='title__editTask '>Modify your task</h1>
              <p className='title__editTask--title '>
                You can change the date and description
              </p>
              <input
                type='date'
                name='date'
                id='date'
                value={editTask.date}
                onChange={handleDate}
                className='fieldset__date'
              />
              <textarea
                className='fieldset__date'
                name='name_task'
                id=''
                cols='30'
                rows='10'
                value={editTask.name}
                onChange={handleNameTask}
              ></textarea>
            </fieldset>
            <div className='buttons__form'>
              <button className='btn_addTask' onClick={handleClick}>
                Modificar
              </button>
              <button className='btn_cancel' onClick={handleClickCancel}>
                  Cancelar
                </button>
              
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditTask;
