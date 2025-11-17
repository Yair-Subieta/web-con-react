const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL
  database: 'veterinaria'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error:', err);
  } else {
    console.log('✅ Conexión exitosa a MySQL');
  }
  connection.end();
});