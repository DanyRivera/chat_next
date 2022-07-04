import mongoose from "mongoose";

const solicitudSchema = mongoose.Schema({

   De: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
   },

   Para: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
   },

   estado: {
      type: String,
      enum: ['Pendiente', 'Aceptada', 'Rechazada'],
      default: 'Pendiente'
   }

}, {
   timestamps: true
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

export default Solicitud;
