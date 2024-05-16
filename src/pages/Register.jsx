import { useState } from 'react';
import newRegister from '../services/Api_newRegister';
function Register() {
  const [register, setRegister] = useState();
  console.log('registro me pinto')
  const handleNameRegister = (ev) => {
    setRegister({ ...register, name: ev.target.value });
  };
  const handleMailRegister = (ev) => {
    setRegister({ ...register, mail: ev.target.value });
  };
  const handlePassRegister = (ev) => {
    setRegister({ ...register, pass: ev.target.value });
  };
  const handleSubmitRegister = (ev) => {
    ev.preventDefault();
    newRegister(register);
  };

  return (
    <>
      <section className='register__form'>
        <div id='register' className='register__option'>
          <form className='register' action=''>
            <h1 className='register__title'>Create account</h1>
            <p className='register__text'>
              Welcome to TDlist, please enter your details below to start using
              the app.
            </p>
            <span className='server_msg'>Please wait a moment while the servers start up the process can take between 1 - 2 minutes.</span>
            <div className='register__inputs'>
              <input
                className='register__name'
                type='text'
                placeholder='Mary'
                required
                onChange={handleNameRegister}
              />
            </div>
            <div className='register__inputs'>
              <input
                className='register__email'
                type='email'
                name='register_email'
                id='register_email'
                placeholder='maryAnning@pal.com'
                required
                onChange={handleMailRegister}
              />
            </div>
            <div className='register__inputs'>
              <input
                className='register__password'
                type='password'
                name='register-password'
                id='register-password'
                placeholder='Password'
                required
                onChange={handlePassRegister}
              />
            </div>
            <button
              className='register__button button'
              onClick={handleSubmitRegister}
            >
              Create account
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
