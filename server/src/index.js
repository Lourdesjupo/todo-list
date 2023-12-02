//Imports

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
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

//conection pool
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

//conexión a BBDD

// async function connectDb() {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   });

//   await connection.connect();
//   console.log(`Conectada a la BBDD ${connection.threadId}`);
//   return connection;
// }

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
  const allTasks = 'select * from todolist_todo where fk_user_id = ?';
  const [tasks] = await pool.query(allTasks, [id]);
  console.log(tasks);

  res.json(tasks);
  //console.log(typeof(tasks[4].task_date), tasks[4].task_date, tasks[4].task_id)
});

//getTask

server.get('/api/getTask/:id', async (req, res) => {
  const id = req.params.id;
  const queryTaskId = 'select * from todolist_todo where task_id = ?';
  const [result] = await pool.query(queryTaskId, [id]);

  res.json(result);
});

//Add New Task

server.post('/api/addNewTask', async (req, res) => {
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
  const isertQuery =
    'INSERT INTO todolist_todo (task_name, task_date, task_checked, fk_user_id) VALUES (?,?,?,?)';

  const [result] = await pool.query(isertQuery, [
    req.body.name,
    req.body.date,
    req.body.checked,
    id,
  ]);

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
  const queryUpdate =
    'UPDATE todolist_todo  SET  task_name = ?, task_date = ? WHERE task_id = ?';
  const [result] = await pool.query(queryUpdate, [
    item.name,
    item.date,
    item.id,
  ]);

  res.json(result);
});

//editChecked
server.put('/api/taskchecked', async (req, res) => {
  const data = req.body;
  console.log(data.check);
  const queryUpdateCheck =
    'UPDATE todolist_todo SET task_checked=? where task_id=?';

  const [result] = await pool.query(queryUpdateCheck, [data.check, data.id]);

  res.json(result);
});

//delete one Task
server.delete(`/api/deleteTask/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(id, 'hola id');
  const deleteQuery = 'DELETE FROM todolist_todo where task_id= ?';

  const [result] = await pool.query(deleteQuery, [id]);

  res.json(result);
});

//Endpoint Register
server.post('/api/register', async (req, res) => {
  const username = req.body.name;
  const mail = req.body.mail;
  const pass = req.body.pass;

  const passwordHash = await bcrypt.hash(pass, 15);
  const addRegister =
    'INSERT INTO users_todo (user_name, user_mail, user_password) VALUES (?,?,?)';

  const [result] = await pool.query(addRegister, [
    username,
    mail,
    passwordHash,
  ]);
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

  //user exist BBDD
  let verifyUserQuery = 'SELECT *FROM users_todo WHERE user_mail = ?';

  const [users, fields] = await pool.query(verifyUserQuery, [body.mail]);
  const user = users[0];
  console.log(user, 'usuario');

  //verify pass
  const verifyPass =
    user === null ? false : await bcrypt.compare(body.pass, user.user_password);

  if (!(user && verifyPass)) {
    console.log('ERROR EN EL LOGIN');
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.user_mail,
    pass: user.user_password,
    id: user.user_id,
  };
  console.log('USERFORTOKEN', userForToken);

  const token = jwt.sign(userForToken, key, {
    expiresIn: '1h', // El token expira en 1 hora
  });

  console.log('VERIFY PASS', verifyPass);
  res.status(200).json({ token: token, user: user.user_name });
});
