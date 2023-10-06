const newRegister = async (data) => {
  try {
    await fetch(`${import.meta.env.VITE_TDLIST_API}/api/register`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });

    return (window.location.href = `${
      import.meta.env.VITE_TDLIST}/todo-list#tasks`);
  } catch (error) {
    console.error('error adding new register:', error);
  }
};

export default newRegister;
