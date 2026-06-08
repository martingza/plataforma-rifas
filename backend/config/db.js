const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rifas', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB conectado');
    } catch (error) {
        console.error('❌ Error conectando MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
