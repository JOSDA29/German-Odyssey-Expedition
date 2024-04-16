const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Josdaquin_85859',
    database: 'odyssey_expedition', 
    connectionLimit: 10,
    queueLimit: 0
  });
  
  module.exports = db.promise();

// Manejar errores en el momento de la conexión
db.getConnection((err, connection) => {
  if (err) {
      console.error('Error al conectar a la base de datos:', err);
      // Realizar alguna acción de recuperación o terminar la aplicación si es necesario
      process.exit(1);
  }
  // Conexión exitosa
  console.log('Conexión exitosa a la base de datos.');
  // Liberar la conexión
  connection.release();
});
