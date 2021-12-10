const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer mail y password
    const { email, password } = req.body;

    try {
        //revisar que el usuario sea unico+

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        //crea nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            //mensaje de confirmacion
            res.json({ token: token });
        });

        
    } catch (error) {
        console.log(error);
        res.status.code(400).send("Hubo un error");
    }
}