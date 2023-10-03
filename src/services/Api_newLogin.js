

const newLogin = async (data) => {
  console.log('recibo los datos new Login', data);
  try {
    const response = await fetch('http://localhost:4500/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json()
    console.log('dataResponse', dataResponse)
    localStorage.setItem('jwt', JSON.stringify(dataResponse.token));
    localStorage.setItem('name', JSON.stringify(dataResponse.user));
     console.log(dataResponse, 'token');
    return (window.location.href = 'http://localhost:5173/todo-list#tasks');
  } catch (error) {
    console.error('error adding new Login:', error);
  }
};

export default newLogin
