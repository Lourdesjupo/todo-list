import { useState } from 'react';
import '../styles/main.scss';
import newLogin from '../services/Api_newLogin';
import { Link } from 'react-router-dom';


function Login() {
  const [login, setLogin] = useState();
  const [error, setError] =useState();


  const handleNameLogin = (ev) => {
    setLogin({ ...login, mail: ev.target.value });
  };
  const handlePassLogin = (ev) => {
    setLogin({ ...login, pass: ev.target.value });
  };
  const handleSubmitLogin = async (ev) => {
    ev.preventDefault();
    try {
   const data =  await newLogin(login)
   if (data) {
    setError(data)
   }
    }catch (error) {
      setError(`try again, ${error}`)
    }
  };
  

  return (
    <>
      <section className='landing_form'>
        <div id='login-form' className='login__option'>
          <form className='login' action=''>
            <h1 className='login__title'>Log in</h1>
            <p className='login__text'>
              Welcome to TDlist, please put your login credentials below to
              start using the app
            </p>
            <div className='login__inputs'>
              <input
                className='login__email'
                type='email'
                name='login-email'
                id='login-email'
                placeholder='e-Mail'
                required
                onChange={handleNameLogin}
              />
            </div>
            <div className="login__inputs">
              <input
                className='login__password'
                type='password'
                name='login-password'
                id='login-password'
                placeholder='Password'
                required
                onChange={handlePassLogin}
              />
            </div>
            <div className="login__btn">
              <button className='login__button button' onClick={handleSubmitLogin}>
                Enter
              </button>
              <span className='login__register'> or <Link to={'/register'}><a className='login__register--link' href="">Register</a></Link></span>
            </div>
          </form>
          {error && <div className='error_addTask'>{error}</div>}
        </div>

      </section>
           
    </>
  );
}

export default Login;
