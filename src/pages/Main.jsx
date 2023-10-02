import '../styles/main.scss';
import Tasklist from '../components/Tasklist';
import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import getAllTasks from '../services/Api_allTasks';
import taskChecked from '../services/Api_taskChecked';
import deleteItem from '../services/Api_deteItem';


function Main() {
  const [tasks, setTasks] = useState([]);

  //   const example = [
  //   {id:'1',date:'',name:'comprar comida gato',checked:'false'},
  //   {id:'2',date:'30/8/2023',name:'sacar a pasear al perro',checked:'true'},
  //   {id:'3',date:'',name:'colgar la ropa',checked:'true'},
  //   {id:'4',date:'30/8/2023',name:'enviar un mail a Pascual',checked:'false'},
  //   {id:'5',date:'12/10/2023',name:'reservar mesas para el sábado',checked:'false'},
  //   {id:'6',date:'21/12/2023',name:'poner gasolina al coche',checked:'true'},
  //   {id:'7',date:'',name:'Ir a la farmacia',checked:'false'},
  //   {id:'8',date:'29/9/2023',name:'llamar a Gertrudis',checked:''},
  //   {id:'9',date:'30/8/2023',name:'Ir al gym',checked:'false'},

  // ]


  useEffect(() => {
    getAllTasks().then((data) => {
      setTasks(data);

    });
  },[]);
  

// data

  const handleTaskChecked = async (id,check) => {
    console.log(check,'check')
    await taskChecked({id, check})
    getAllTasks().then((data) => {
    setTasks(data)})

  };
  const handleDragStart = ()=>{
  
  }

  const handleClickDeleted = async (task) =>{

   await deleteItem(task)
    getAllTasks().then((data) => {
    setTasks(data)})
  }

  function name () {
    const userName = localStorage.getItem('name').slice(0,-1).slice(1)
    return  userName.charAt(0).toUpperCase()+ userName.slice(1)

   
  }

//DATES
  const time = Date.now();
  const date = new Date(time);
  const today = date.toLocaleDateString();
  // console.log('TODAY', today);



  return (
    <>
      <header className='header'>
        <p className='header__title'>Hola {name()}!</p>
      </header>
      <main>
        <section className='button'>
          <Link to='/addTask' className='header__button'>
            <button className='header__button--add'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-plus'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='currentColor' fill=''></path>
                <path d='M12 5l0 14'></path>
                <path d='M5 12l14 0'></path>
              </svg>
              Add Task
            </button>
          </Link>
        </section>
        <div className="sections">
          <section className='no-date'>
            <Tasklist
              tasklist={tasks.filter((task) => task.date === '')}
             onTaskChecked={handleTaskChecked}
              taskType={'No-date'}
              dragstart={handleDragStart}
              onDelete={handleClickDeleted}
            />
          </section>
          <section className='todo-today'>
            <Tasklist
              tasklist={tasks.filter((task) => task.date === today)}
             onTaskChecked={handleTaskChecked}
              taskType={'Todo-Today'}
              onDelete={handleClickDeleted}

            />
          </section>
          <section className='todo-future'>
            <Tasklist
              tasklist={tasks.filter(
                (task) => task.date !== today && task.date !== ''
              )}
              onTaskChecked={handleTaskChecked}
              taskType={'Todo-Future'}
              onDelete={handleClickDeleted}

            />
          </section>
        </div>
      </main>
    </>
  );
}

export default Main;
