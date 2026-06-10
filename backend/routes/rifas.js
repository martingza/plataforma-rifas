const express = require('express');
const router = express.Router();
const Rifa = require('../models/Rifa');
const auth = require('../middleware/auth');

// GET /api/rifas - Listar rifas del usuario
router.get('/', auth, async (req, res) => {
    try {
        const rifas = await Rifa.find({ creador: req.userId }).sort({ createdAt: -1 });
        res.json({ success: true, rifas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/rifas/public/:slug - Ver rifa pública
router.get('/public/:slug', async (req, res) => {
    try {
        const rifa = await Rifa.findOne({ slug: req.params.slug, estado: 'activa' })
            .populate('creador', 'nombre email telefono avatar');
        
        if (!rifa) {
            return res.status(404).json({ success: false, message: 'Rifa no encontrada' });
        }

        // Incrementar vistas
        rifa.estadisticas.vistas++;
        await rifa.save();

        res.json({ success: true, rifa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/rifas - Crear rifa
router.post('/', auth, async (req, res) => {
    try {
        const rifa = await Rifa.create({
            ...req.body,
            creador: req.userId
        });

        res.status(201).json({ success: true, rifa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/rifas/:id - Actualizar rifa
router.put('/:id', auth, async (req, res) => {
    try {
        const rifa = await Rifa.findOne({ _id: req.params.id, creador: req.userId });
        if (!rifa) {
            return res.status(404).json({ success: false, message: 'Rifa no encontrada' });
        }

        Object.assign(rifa, req.body);
        await rifa.save();

        res.json({ success: true, rifa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/rifas/:id/reservar - Reservar número
router.post('/:id/reservar', async (req, res) => {
    try {
        const { numero, comprador } = req.body;
        const rifa = await Rifa.findById(req.params.id);
        
        if (!rifa) {
            return res.status(404).json({ success: false, message: 'Rifa no encontrada' });
        }

        const numeroReservado = await rifa.reservarNumero(numero, comprador);
        res.json({ success: true, numero: numeroReservado });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/rifas/:id - Eliminar rifa
router.delete('/:id', auth, async (req, res) => {
    try {
        const rifa = await Rifa.findOneAndDelete({ 
            _id: req.params.id, 
            creador: req.userId 
        });
        
        if (!rifa) {
            return res.status(404).json({ success: false, message: 'Rifa no encontrada' });
        }

        res.json({ success: true, message: 'Rifa eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;