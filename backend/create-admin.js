const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const query = 'INSERT INTO usuarios (username, password, email, rol) VALUES (?, ?, ?, ?)';
  
  connection.query(query, ['admin', hashedPassword, 'admin@veterinaria.com', 'admin'], (err, result) => {
    if (err) {
      console.error('❌ Error:', err.message);
    } else {
      console.log('✅ Usuario admin creado exitosamente');
    }
    connection.end();
  });
}

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err);
  } else {
    console.log('✅ Conectado a MySQL');
    createAdmin();
  }
});