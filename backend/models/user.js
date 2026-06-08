const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6
    },
    telefono: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: ''
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Comparar password
userSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);