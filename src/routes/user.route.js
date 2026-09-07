const { Router } = require('express')

const router = Router()

// Controlador
const { register } = require('../controllers/user.controller')

// Registrar un nuevo usuario
router.post('/registro', register)

module.exports = router