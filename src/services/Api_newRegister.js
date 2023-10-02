
const newRegister = async (data) => {
  console.log('recibo los datos de register', data);
  try {
     await fetch('http://localhost:4500/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('error adding new register:', error);
  }
};

export default newRegister;
