import { useState } from 'react';
import '../styles/main.scss';
import newLogin from '../services/Api_newLogin';
import  newRegister  from '../services/Api_newRegister';

function Login() {
  const [login, setLogin] =useState()
  const [register, setRegister] =useState()


const handleNameLogin =(ev)=>{setLogin({...login , mail:ev.target.value})}
const handlePassLogin =(ev)=>{setLogin({...login , pass: ev.target.value})}
const handleSubmitLogin =(ev)=>{
  ev.preventDefault() 
  newLogin(login)
}
const handleNameRegister =(ev)=>{setRegister({...register, name: ev.target.value})}
const handleMailRegister =(ev)=>{setRegister({...register, mail: ev.target.value})}
const handlePassRegister =(ev)=>{setRegister({...register, pass: ev.target.value})}
const handleSubmitRegister =(ev)=>{  ev.preventDefault()
   newRegister(register)
  }

  return (
    <>
      <section className='landing_form'>
        <div className="link options">
          <a className='link_login'href="#login-form">Login</a>
          <a className='link_register'href="#register">Registro</a>
        </div>
        <div id ="login-form" className='login_option'>
          <form  className='login' action=''>
            <p>Bienvenido</p>
            <input
              className='login_email'
              type='email'
              name='login-email'
              id='login-email'
              placeholder='e-Mail'
              required
              
              onChange={handleNameLogin}
            />
            <input
              className='login_password'
              type='password'
              name='login-password'
              id='login-password'
              placeholder='contraseña'
              required
              onChange={handlePassLogin}
            />
            <button className='login_button' onClick={handleSubmitLogin}>Entrar</button>
            
          </form>
        </div>
        <div id ="register" className='register_option'>
          <form className='register' action=''>
            <input
              className='register_name'
              type='text'
              placeholder='Nombre'
              required
              onChange={handleNameRegister}
            />
            <input
              className='register_email'
              type='email'
              name='register_email'
              id='register_email'
              placeholder='e-Mail'
              required
              onChange={handleMailRegister}
            />
            <input
              className='register_password'
              type='password'
              name='register-password'
              id='register-password'
              placeholder='contraseña'
              required
              onChange={handlePassRegister}
            />
            <button className='register_button' onClick={handleSubmitRegister}>Registrarse</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
