//Imports

const express = require('express');
const cors = require('cors');
const sql  = require('./db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Arranque servidor

const server = express();

//configuración de servidor

server.use(cors());
server.use(express.json({ limit: '10mb' }));
server.use(cookieParser());

//listening

const port = process.env.PORT;
console.log(port);
server.listen(port, () => {
  console.log(`servidor arrancado: http://localhost:${port}`);
});




//JWT generate and verify Tokens
const key = process.env.KEY;

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    return null;
  }
};

// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ error: 'Token no proporcionado' });
//   }

//   const decoded = verifyToken(token);

//   if (!decoded) {
//     return res.status(401).json({ error: 'Token inválido' });
//   }

//   req.user = decoded;
//   next();
// };

//EndPoints

//Get all Tasks
server.get('/api/allTasks', async (req, res) => {
  const resToken = JSON.parse(req.get('Authorization'));
  console.log('RESTOKEN', resToken);
  const decoded = verifyToken(resToken);
  if (!decoded) {
    res.status(403);
    res.json('login no es correcto');
    return;
  }

  console.log(decoded, 'decoded');
  const id = decoded.id;
  const tasks = await sql`SELECT * FROM todolist.todolist_todo WHERE fk_user_id =${id} ORDER BY task_date ASC`;
  res.json(tasks);
  //console.log(typeof(tasks[4].task_date), tasks[4].task_date, tasks[4].id)
});

//getTask

server.get('/api/getTask/:id', async (req, res) => {
  const id = req.params.id;
  const result = await sql`SELECT * FROM todolist.todolist_todo WHERE id =${id}`;
  res.json(result);
});

//Add New Task

server.post('/api/addNewTask', async (req, res) => {
  console.log('/api/addNewTask');
  const resToken = JSON.parse(req.get('Authorization'));
  console.log('RESTOKEN', resToken);
  const decoded = verifyToken(resToken);
  if (!decoded) {
    res.status(403);
    res.json('login no es correcto');
    return;
  }
  const id = decoded.id;

  console.log('holi', decoded);
  const result =
		await sql`INSERT INTO todolist.todolist_todo (task_name, task_date, task_checked, fk_user_id) VALUES (${req.body.name},${req.body.date},${req.body.checked},${id})`;
  
  res.json(result);
  console.log('esta es la respuesta del post', result);
});

//editTask

server.put('/api/editItem', async (req, res) => {
  const resToken = JSON.parse(req.get('Authorization'));
  console.log('RESTOKEN', resToken);
  const decoded = verifyToken(resToken);
  if (!decoded) {
    res.status(403);
    res.json('login no es correcto');
    return;
  }
  const item = req.body;
  const result =
		await sql`UPDATE todolist.todolist_todo  SET  task_name = ${item.name}, task_date = ${item.date} WHERE id = ${item.id}`;
  res.json(result);
});

//editChecked
server.put('/api/taskchecked', async (req, res) => {
  const data = req.body;
  console.log(data.check);
  const result = await sql`UPDATE todolist.todolist_todo SET task_checked=${data.check} where id=${data.id}`;
  res.json(result);
});

//delete one Task
server.delete(`/api/deleteTask/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(id, 'hola id');
  const result = await sql`DELETE FROM todolist.todolist_todo where id= ${id}`;
  res.json(result);
});

//Endpoint Register
server.post('/api/register', async (req, res) => {
  const username = req.body.name;
  const mail = req.body.mail;
  const pass = req.body.pass;
  //@todo increase saltRounds when deploy in a proper hosting, for now free Render account is too slow
  const passwordHash = await bcrypt.hash(pass, 1);
  const result =
		await sql`INSERT INTO todolist.users_todo (user_name, user_mail, user_password) VALUES (${username},${mail},${passwordHash})`;
  console.log(result, 'ES EL RESULTADO');
  let user = {
    mail,
    passwordHash,
    id: result.insertId,
  };

  jwt.sign(user, key, (err, token) => {
    if (err) {
      res.status(400).send({ msg: 'Error' });
    } else {
      res.cookie('jwt', token);
      res.json({
        msg: 'success',
        token: token,
        user: username,
      });
    }
  });
});

//Endpoint login

server.post('/api/login', async (req, res) => {
  const body = req.body;
  console.log('RECIBIDO LOGIN', body);
  console.log('hola');
  let startTime = process.hrtime.bigint();
  //user exist BBDD
  let [users, fields] = await sql`SELECT * FROM todolist.users_todo WHERE user_mail = ${body.mail}`;
  console.log(users)
  const user = users;
  console.log(user, 'usuario');
  let stopTime = process.hrtime.bigint();
  console.log('solicita usuario a BBDD', stopTime - startTime);
  startTime=stopTime
  //verify pass
  const verifyPass =
    user === null ? false : await bcrypt.compare(body.pass, user.user_password);

  if (!(user && verifyPass)) {
    console.log('ERROR EN EL LOGIN');
    return res.status(401).json({ error: 'Invalid username or password' });
  }
   stopTime = process.hrtime.bigint();
  console.log('verifica si el pass es correcto', stopTime - startTime);
  startTime = stopTime;
  const userForToken = {
    username: user.user_mail,
    pass: user.user_password,
    id: user.id,
  };
  console.log('USERFORTOKEN', userForToken);
  let token = undefined
  if(userForToken.username ==='prueba@mail.com') {
     token = jwt.sign(userForToken, key, {
      expiresIn: '100000h', // El token expira en 1 hora
    });

  } else {
   token = jwt.sign(userForToken, key, {
    expiresIn: '1h', // El token expira en 1 hora
  });

  }

   stopTime = process.hrtime.bigint();
    console.log('firma token', stopTime - startTime);
    startTime = stopTime;
  console.log('VERIFY PASS', verifyPass);
  res.status(200).json({ token: token, user: user.user_name });
});
