
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de la Base de Datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para verificar el token JWT en rutas protegidas
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- ENDPOINTS DE LA API ---

// Endpoint para registrar un nuevo usuario administrador (solo para configuración inicial)
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ error: 'El correo ya podría estar en uso.' });
  }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al iniciar sesión.' });
  }
});

// Endpoint para crear una nueva cita (público)
app.post('/api/appointments', async (req, res) => {
  const { name, phone, service, date, time } = req.body;
  try {
    const newAppointment = await pool.query(
      'INSERT INTO appointments (client_name, client_phone, service, appointment_date, appointment_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, service, date, time]
    );
    res.status(201).json(newAppointment.rows[0]);
  } catch (error) {
    console.error('Error al crear cita:', error);
    res.status(500).json({ error: 'No se pudo crear la cita.' });
  }
});

// Endpoint para obtener todas las citas (protegido)
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const allAppointments = await pool.query('SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time DESC');
    res.json(allAppointments.rows);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las citas.' });
  }
});

// Endpoint para actualizar el estado de una cita (protegido)
app.put('/api/appointments/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedAppointment = await pool.query(
            'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (updatedAppointment.rows.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada.' });
        }
        res.json(updatedAppointment.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cita.' });
    }
});

// Endpoint para eliminar una cita (protegido)
app.delete('/api/appointments/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deleteOp = await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
        if (deleteOp.rowCount === 0) {
            return res.status(404).json({ error: 'Cita no encontrada.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la cita.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});
    