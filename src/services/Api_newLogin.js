

const newLogin = async (data) => {

  try {
    const response = await fetch('http://localhost:4500/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json()
    if(dataResponse.error) {

      return(dataResponse.error);
    }
    localStorage.setItem('jwt', JSON.stringify(dataResponse.token));
    localStorage.setItem('name', JSON.stringify(dataResponse.user));
    return (window.location.href = 'http://localhost:5173/todo-list#tasks');
  } catch (error) {
    return ('error adding new Login:', error);
  }
};

export default newLogin
