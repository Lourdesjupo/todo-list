import '../styles/main.scss';
import Tasklist from '../components/Tasklist';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getAllTasks from '../services/Api_allTasks';

function Main () {
  const [tasks, setTasks] = useState([])


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

useEffect(()=>{
getAllTasks().then((data)=> {
  setTasks(data) 
  
})
},[])


const handleTaskChecked = (id)=>{
//hay que modificar el checked del servidor si está a true a false y viceversa
console.log(id)
}


const time = Date.now()
const date = new Date(time);
const today = date.toLocaleDateString()
console.log('TODAY', today)
  return (<>
      <header>
        <p>Hello moto</p>
        <Link to="/addTask" className='addTask__button'>Add Task</Link>
      </header>
      <main>
        <section className='no-date'>
         
            <Tasklist 
            tasklist={tasks.filter((task) => task.date === '')}
            onTaskChecked={handleTaskChecked}
            taskType ={'no-date'}/>
         
        </section>
        <section className='todo-today'>
         
            <Tasklist 
            tasklist={tasks.filter((task) => task.date === today)}
            onTaskChecked={handleTaskChecked}
            taskType ={'todo-today'}/>
         
        </section>
        <section className='todo-future'>          
            <Tasklist
            tasklist={tasks.filter((task) => task.date !== today && task.date !== '')}
            onTaskChecked={handleTaskChecked} 
            taskType ={'todo-future'}/>
          
        </section>
      </main>
      </>)


}

export default Main