import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import mensajeRoutes from "./routes/mensajeRoutes.js";

const app = express();
dotenv.config();
app.use(express.json())

connectDB();

//Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/mensajes', mensajeRoutes)

//PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor Corriendo en el puerto ${port}`)
})
