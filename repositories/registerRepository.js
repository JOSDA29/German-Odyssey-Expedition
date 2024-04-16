const db = require('../config/config-db.js');

const register = async (nombres, apellidos, direccion, telefono, genero, correo, hashedPassword, historialReservas) => {
     const sql = 'INSERT INTO usuario_cliente (nombres_uc, apellidos_uc, direccion_uc, telefono_uc, genero_uc, correo_electronico_uc, contrasena_uc, historial_reservas_uc  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
     const values = [nombres, apellidos, direccion, telefono, genero, correo, hashedPassword, historialReservas];
     return db.execute(sql, values);
}

module.exports = register;