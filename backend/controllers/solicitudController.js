import mongoose from "mongoose";
import Solicitud from "../models/Solicitud.js";
import Usuario from "../models/Usuario.js";

const enviarSolicitud = async (req, res) => {

    const { Para } = req.body
    const id = Para;

    //Verificar el id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    const usuario = await Usuario.findById(id);
    //Verificar que exista
    if (!usuario) {
        const error = new Error("Ese usuario no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que no seas tu
    if (usuario._id.toString() === req.usuario._id.toString()) {
        const error = new Error("No te puedes enviar solicitud a ti");
        return res.status(401).json({ msg: error.message })
    }

    //Verificar que no este en tus contactos
    if (req.usuario.contactos.includes(id.toString())) {
        const error = new Error("Este usuario ya está en tus contactos");
        return res.status(401).json({ msg: error.message })
    }

    const solicitud = await Solicitud.findOne({ Para }).where("De").equals(req.usuario._id);

    if (!solicitud) {

        try {

            const solicitud = new Solicitud(req.body);
            solicitud.De = req.usuario._id;
            const solicitudAlmacenada = await solicitud.save();

            usuario.solicitudes.push(solicitudAlmacenada._id);
            await usuario.save();

            res.json(solicitudAlmacenada);

        } catch (error) {
            console.log(error)
        }

    } else {

        //Verificar que no ya le hayas enviado una solicitud
        if (solicitud.estado === "Pendiente" || solicitud.estado === "Aceptada") {

            const error = new Error("A este usuario ya le enviaste una solicitud");
            return res.status(401).json({ msg: error.message })

        } else {

            //Enviar de nuevo la solicitud

            try {


                solicitud.estado = "Pendiente";
                await solicitud.save();

                usuario.solicitudes.push(solicitud._id);
                await usuario.save();

                res.json({ msg: "Se volvio a enviar la solicitud" })

            } catch (error) {
                console.log(error);
            }

        }

    }

}

const aceptarSolicitud = async (req, res) => {

    const { id } = req.params;
    //Verificar el id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    //Verificar que exista
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
        const error = new Error("Esa solicitud no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que la solicitud no haya sido aceptada
    if (solicitud.estado === "Aceptada") {
        const error = new Error("Esa solicitud ya la aceptaste");
        return res.status(403).json({ msg: error.message })
    }

    const usuario = await Usuario.findById(req.usuario._id);
    try {

        solicitud.estado = "Aceptada";
        const solicitudAlmacenada = await solicitud.save();

        const solicitudesActualizadas = usuario.solicitudes.filter(solicitudUsuario => solicitudUsuario.toString() !== solicitud._id.toString());
        usuario.solicitudes = solicitudesActualizadas;
        await usuario.save();

        res.json(solicitudAlmacenada);

    } catch (error) {
        console.log(error);
    }
}

const rechazarSolicitud = async (req, res) => {

    const { id } = req.params;
    //Verificar el id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    //Verificar que exista
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
        const error = new Error("Esa solicitud no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que la solicitud no haya sido aceptada
    if (solicitud.estado === "Rechazada") {
        const error = new Error("Esa solicitud ya la rechazaste");
        return res.status(403).json({ msg: error.message })
    }

    const usuario = await Usuario.findById(req.usuario._id);
    try {

        solicitud.estado = "Rechazada";
        const solicitudAlmacenada = await solicitud.save();

        const solicitudesActualizadas = usuario.solicitudes.filter(solicitudUsuario => solicitudUsuario.toString() !== solicitud._id.toString());
        usuario.solicitudes = solicitudesActualizadas;
        await usuario.save();

        res.json(solicitudAlmacenada);

    } catch (error) {
        console.log(error);
    }

}

const obtenerSolicitudes = async (req, res) => {

}

const eliminarSolicitud = async (req, res) => {

}

const eliminarSolicitudes = async (req, res) => {

}

export {
    enviarSolicitud,
    aceptarSolicitud,
    rechazarSolicitud,
    obtenerSolicitudes,
    eliminarSolicitud,
    eliminarSolicitudes
}