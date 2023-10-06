

const newLogin = async (data) => {

  try {
    const response = await fetch(`${import.meta.env.VITE_TDLIST_API}/api/login`, {
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
    return (window.location.href = `${
      import.meta.env.VITE_TDLIST}/todo-list#tasks`);
  } catch (error) {
    return ('error adding new Login:', error);
  }
};

export default newLogin
