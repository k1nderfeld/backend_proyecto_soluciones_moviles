const { request, response } = require('express')

const create = async (req = request, res = response) => {
    try {
        const { name, scientificName } = req.body

        if (!name || !scientificName) {
            return res.status(400).json({message: "Los campos son obligatorios"})
        }

        const existingRock = await Rock.findOne({ scientificName })
        if (existingRock) {
            return res.status(400).json({message: 'No puede añadir una roca que ya este en el sistema.'})
        }

        const rock = new Rock({
            name,
            scientificName
        })

        await rock.save()

        res.status(201).json({
            message: "Se ha añadido satisfactoriamente la roca."
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del Servidor, intente nuevamente."
        })
    }
}

const obtain = async (req = request, res = response) => {
    try {
        const rocks = await Rock.findAll()

        // Validación de que no existan rocas en el sistema.

        return res.status(200).json({
            message: "Rocas Obtenidas satisfactoriamente.",
            rocks: rocks
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del Servidor, intente nuevamente."
        })
    }
}

module.exports = {
    create,
    obtain
}