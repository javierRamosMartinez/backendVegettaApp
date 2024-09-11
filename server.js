const authRouter = require('./src/api/auth/auth.router');
const userRouter = require('./src/api/users/user.router');
const gameRouter = require('./src/api/games/game.router');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const { connectMongo } = require('./src/utils/db');



const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
connectMongo();

app.get('/', (req, res) => {
    res.send('¡El servidor Express está corriendo!');
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/games", gameRouter);



// Inicia el servidor en el puerto 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
