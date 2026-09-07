const { Router } = require('express')

const router = Router()

// Controller
const {} = require('../controllers/user.controller.js')
// Registrar nuevo usuario
router.post('/registro', register)

module.exports = router