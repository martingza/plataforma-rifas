const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rifas';
        
        console.log('🔗 Conectando a MongoDB...');
        console.log('📍 URI:', mongoURI.substring(0, 30) + '...');  // Muestra solo el inicio
        
        const conn = await mongoose.connect(mongoURI);
        
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error conectando MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
