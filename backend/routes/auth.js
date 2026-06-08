const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generar JWT
const generarToken = (userId) => {
    return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET || 'secret_key_dev', 
        { expiresIn: '7d' }
    );
};

// POST /api/auth/register
router.post('/register', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { nombre, email, password, telefono } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'El email ya está registrado' 
            });
        }

        // Crear usuario
        const user = await User.create({ nombre, email, password, telefono });
        const token = generarToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/auth/login
router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.compararPassword(password))) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }

        const token = generarToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;