const { request, response } = response('express')
const bcyptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const register = async (req = request, res = response) => {
    try {
        const { userName, email, password } = req.body

        if (!userName || !email || !password) {
            return res.status(400).json({message: "Los campos son obligatorios"})
        }

        const existingUser = await User.findOne({ userName, email})

        if (existingUser) {
            return res.status(400).json({message : 'Nombre de usuario ya existente'})
        }

        // Validaciones de correo, telefono o password

        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(password, salt)

        const user = new User({
            userName,
            email,
            password: hashedPassword,
            phone
        })

        await user.save()

        res.status(201).json({
            message: "Registro realizado correctamente"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del servidor, intente nuevamente"
        })
    }
}
module.export = {
    register
}