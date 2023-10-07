const newRegister = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_TDLIST_API}/api/register`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
        localStorage.removeItem('jwt')
        localStorage.setItem('jwt', JSON.stringify(dataResponse.token));
        localStorage.setItem('name', JSON.stringify(dataResponse.user));
      window.location.href = `${import.meta.env.VITE_TDLIST}#tasks`;
    return (window.location.href);
  } catch (error) {
    console.error('error adding new register:', error);
  }
};

export default newRegister;
