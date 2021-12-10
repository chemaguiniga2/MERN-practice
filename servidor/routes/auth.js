//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//inicia sesion

// api/auth
router.post('/',
    authController.autenticarUsuario
    
);
//obteiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);
module.exports = router;