import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import mensajeRoutes from "./routes/mensajeRoutes.js";

const app = express();
dotenv.config();
app.use(express.json())

connectDB();

//Configurar CORS
const whiteList = [
    process.env.FRONTEND_URL
];
const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions));

//Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/mensajes', mensajeRoutes)

//PORT
const port = process.env.PORT || 4000;

const servidor = app.listen(port, () => {
    console.log(`Servidor Corriendo en el puerto ${port}`)
})

//SOCKET.IO
import { Server } from "socket.io";

const io = new Server(servidor, {
    pingTimeout: 6000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

io.on("connection", (socket) => {
    console.log('Conectado a Socket.io');

    //Eventos de Socket.io
    socket.on('abrir chat', chatId => {
        socket.join(chatId);
    })

    socket.on('crear mensaje', mensaje => {
        const chat = mensaje.chat;
        socket.to(chat).emit('mensaje creado', mensaje);
    })

    socket.on('vaciar chat', chat => {
        socket.to(chat._id).emit('chat vacio', chat);
    })

    socket.on('eliminar chat', chat => {
        socket.to(chat._id).emit('chat eliminado', chat);
    })
})
