const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const {getAllCryptoPrice } = require('./controllers/cryptoPriceController');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const dbConnection = require('./database/connection');
dbConnection();
const authRoute = require('./routes/authRoute');
const forgotPasswordRoute = require('./routes/forgotPasswordRoute');
const cryptoPriceRoute = require('./routes/cryptoPriceRoute');
getAllCryptoPrice(io);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoute);
app.use('/password', forgotPasswordRoute);
app.use('/price', cryptoPriceRoute);
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    let priceUpdateInterval = null;
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        if (priceUpdateInterval) {
            clearInterval(priceUpdateInterval);
        }
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
