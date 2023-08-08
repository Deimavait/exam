const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { authenticate } = require('./middleware');

require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'event',
};

const adminSchema = joi.object({
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().required(),
});

const dbPool = mysql.createPool(mysqlConfig).promise();

// Task does not require registration field for admin, so I created registration via postman
server.post('/admin-register', async (req, res) => {
  let payload = req.body;

  try {
    payload = await adminSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    await dbPool.execute(
      `
        INSERT INTO adminTable (email, password)
        VALUES (?, ?)
      `,
      [payload.email, hashedPassword]
    );
    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

// Admin Log in

server.post('/admin-login', async (req, res) => {
  let payload = req.body;

  // Validation
  const adminSchema = joi.object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().required(),
  });

  try {
    payload = await adminSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }
  // Checking if email exists

  try {
    const [data] = await dbPool.execute(
      `
      SELECT * FROM adminTable
      WHERE email = ?
      `,
      [payload.email]
    );

    if (!data.length) {
      return res.status(400).send({ error: 'Email or Password did not match' });
    }

    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          email: data[0].email,
          id: data[0].id,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).send({ token });
    }
    return res.status(400).send({ error: 'Email or Password did not match' });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

// register event participants

const participantSchema = joi.object({
  name: joi.string().trim().min(2).required(),
  lastName: joi.string().trim().min(2).required(),
  email: joi.string().email().trim().lowercase().required(),
  dateOfBirth: joi.date().iso().required(),
  phoneNumber: joi
    .string()
    .regex(/^\+\d{11}$/)
    .required(),
});

server.post('/registerParticipant', authenticate, async (req, res) => {
  let payload = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt_decode(token);

  try {
    payload = await participantSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }
  try {
    await dbPool.execute(
      `
            INSERT INTO participants (name, lastName, email, dateOfBirth, phoneNumber, \`admin-table_id\`)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
      [
        payload.name,
        payload.lastName,
        payload.email,
        payload.dateOfBirth,
        payload.phoneNumber,
        decoded.id,
      ]
    );
    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

//  Get participants

server.get('/registerParticipant', authenticate, async (req, res) => {
  try {
    const [data] = await dbPool.execute(
      `
        SELECT * FROM participants
      `
    );
    return res.status(200).send({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

// Delete participant

server.listen(process.env.PORT, () =>
  console.log(`Server is listening to ${process.env.PORT} port`)
);
