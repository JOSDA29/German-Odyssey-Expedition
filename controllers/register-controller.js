const bcrypt = require("bcryptjs");
const registerRepository = require("../repositories/registerRepository");

let register = async (req, res) => {
    try {
        //lectura de data proveniente del cliente
        let nombres = req.body.names;
        let apellidos = req.body.last_names;
        let direccion = req.body.address;
        let telefono = req.body.phone_number;
        let genero = req.body.gender;
        let correo = req.body.email;
        let contrasena = req.body.password;
        let historialReservas = req.body.booking_history;

        //hasheado de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        
        const result = await registerRepository (nombres, apellidos, direccion, telefono, genero, correo, hashedPassword, historialReservas)
       
        return res.status(201).send({ status: 'register ok', password_hasheado: hashedPassword });
      
    } catch (error) {
        console.error("Error en el controlador de registro:", error);
        // Manejar errores de forma explícita
        if (error && error.code === "ER_DUP_ENTRY") {
            // Enviar una respuesta adecuada si se encuentra un duplicado de entrada
            return res.status(500).send({ errorInfo: error.sqlMessage });
        } else {
            // Enviar una respuesta genérica para otros tipos de errores
            return res.status(500).json({ error: "Error al procesar la solicitud." });
        }
      
    }
}

module.exports = {
    register
}
