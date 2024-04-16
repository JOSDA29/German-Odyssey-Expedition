const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');

let auth = async (req, res) => {
      
      try {
        let correo = req.body.email;
        let contrasena = req.body.password;
        const sql = 'SELECT contrasena_uc AS password FROM usuario_cliente WHERE correo_electronico_uc=?';
        const values = [correo];
        const result = await db.execute(sql, values);
        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(contrasena, result[0][0].password);
          if (isPasswordValid){
            return res.status(200).json({ 
              status: 'Successful authentication' 
            });
          }
        }
        return res.status(401).json({ 
          status: 'incorrect username or password'
        });
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
  auth
}
