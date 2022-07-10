import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        default: ''
    },
    esGrupo: {
        type: Boolean,
        require: true,
        default: false
    },
    usuarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        }
    ],
    mensajes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mensaje"
        }
    ]
},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;