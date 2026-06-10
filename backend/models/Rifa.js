const mongoose = require('mongoose');

const numeroSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'reservado', 'pagado'],
        default: 'disponible'
    },
    comprador: {
        nombre: String,
        telefono: String,
        email: String
    },
    fechaReserva: Date,
    fechaPago: Date
});

const rifaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    imagen: {
        type: String,
        default: ''
    },
    imagenesExtras: [String],
    precioNumero: {
        type: Number,
        required: [true, 'El precio por número es obligatorio']
    },
    cantidadNumeros: {
        type: Number,
        required: [true, 'La cantidad de números es obligatoria'],
        default: 100
    },
    numeros: [numeroSchema],
    premio: {
        type: String,
        required: [true, 'El premio es obligatorio']
    },
    premiosSecundarios: [{
        descripcion: String,
        imagen: String
    }],
    fechaSorteo: {
        type: Date,
        required: [true, 'La fecha del sorteo es obligatoria']
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    estado: {
        type: String,
        enum: ['borrador', 'activa', 'finalizada', 'cancelada'],
        default: 'activa'
    },
    configuracion: {
        colorPrimario: {
            type: String,
            default: '#4F46E5'
        },
        colorSecundario: {
            type: String,
            default: '#7C3AED'
        },
        mostrarNumerosDisponibles: {
            type: Boolean,
            default: true
        },
        permitirReserva: {
            type: Boolean,
            default: true
        },
        metodoPago: [{
            type: String,
            enum: ['transferencia', 'efectivo', 'mercadopago', 'paypal']
        }],
        instruccionesPago: String,
        contactoWhatsApp: String,
        contactoInstagram: String,
        contactoEmail: String
    },
    estadisticas: {
        vistas: {
            type: Number,
            default: 0
        },
        numerosVendidos: {
            type: Number,
            default: 0
        },
        numerosReservados: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Generar slug automáticamente
rifaSchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = this.titulo
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-') + '-' + Date.now().toString(36);
    }
    
    // Generar números si no existen
    if (this.numeros.length === 0) {
        for (let i = 0; i < this.cantidadNumeros; i++) {
            this.numeros.push({
                numero: i,
                estado: 'disponible'
            });
        }
    }
    
    next();
});

// Método para obtener números disponibles
rifaSchema.methods.getNumerosDisponibles = function() {
    return this.numeros.filter(n => n.estado === 'disponible').length;
};

// Método para reservar número
rifaSchema.methods.reservarNumero = async function(numero, comprador) {
    const numIndex = this.numeros.findIndex(n => n.numero === numero && n.estado === 'disponible');
    if (numIndex === -1) throw new Error('Número no disponible');
    
    this.numeros[numIndex].estado = 'reservado';
    this.numeros[numIndex].comprador = comprador;
    this.numeros[numIndex].fechaReserva = new Date();
    this.estadisticas.numerosReservados++;
    
    await this.save();
    return this.numeros[numIndex];
};

module.exports = mongoose.model('Rifa', rifaSchema);
