
const newRegister = async (data) => {
  try {
     await fetch(`${import.meta.env.TDLIST_API}/api/register`, {
       method: 'POST',
       headers: { 'content-type': 'application/json' },
       body: JSON.stringify(data),
     });

     return (window.location.href =
       `${import.meta.env.TDLIST}/todo-list#tasks`);
  } catch (error) {
    console.error('error adding new register:', error);
  }
};

export default newRegister;
