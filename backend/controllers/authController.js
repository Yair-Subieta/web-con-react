const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password, email, rol } = req.body;

  try {
    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO usuarios (username, password, email, rol) VALUES (?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, email, rol || 'recepcionista'], (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Usuario ya existe' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Login
exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];

    // Verificar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol
      }
    });
  });
};

// Verificar token
exports.verifyToken = (req, res) => {
  res.json({ message: 'Token válido', user: req.user });
};