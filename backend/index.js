import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
dotenv.config();
app.use(express.json())

connectDB();

//Routing
app.use('/api/usuarios', usuarioRoutes)

//PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor Corriendo en el puerto ${port}`)
})
