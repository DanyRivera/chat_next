import mongoose from "mongoose";

const mensajeSchema = mongoose.Schema({
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    contenido: {
        type: String,
        trim: true,
        require: true
    },
    hora: {
        type: Date,
        require: true,
        default: Date.now()
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},{
    timestamps: true
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

export default Mensaje;