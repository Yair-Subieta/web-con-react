const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authController = require('./controllers/authController');
const verifyToken = require('./middleware/authMiddleware');
const db = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/verify', verifyToken, authController.verifyToken);

// Rutas protegidas de ejemplo
app.get('/api/mascotas', verifyToken, (req, res) => {
  const query = `
    SELECT m.*, c.nombre as dueno 
    FROM mascotas m 
    JOIN clientes c ON m.cliente_id = c.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener mascotas' });
    res.json(results);
  });
});

app.get('/api/citas', verifyToken, (req, res) => {
  const query = `
    SELECT c.*, m.nombre as mascota, cl.nombre as dueno
    FROM citas c
    JOIN mascotas m ON c.mascota_id = m.id
    JOIN clientes cl ON m.cliente_id = cl.id
    ORDER BY c.fecha_hora DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener citas' });
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});