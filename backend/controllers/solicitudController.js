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

            usuario.solicitudes.push(solicitud._id);

            await Promise.all([
                solicitud.save(),
                usuario.save()
            ])

            res.json({msg: "Solicitud enviada correctamente"});

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
                usuario.solicitudes.push(solicitud._id);

                await Promise.all([
                    solicitud.save(),
                    usuario.save()

                ])

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
    if (solicitud.estado === "Aceptada" || solicitud.estado === "Rechazada") {
        const error = new Error("Esa solicitud ya la aceptaste o rechazaste");
        return res.status(403).json({ msg: error.message })
    }

    //Verificar tengas los permiso para aceptar la solicitud
    if (req.usuario._id.toString() !== solicitud.Para.toString()) {
        const error = new Error('Tu no puedes aceptar esta solicitud');
        return res.status(403).json({ msg: error.message })
    }

    //Verificar que no seas tu el de la solicitud
    if (solicitud.De.toString() === solicitud.Para.toString()) {
        const error = new Error('Tu no puedes aceptar tu propia solicitud');
        return res.status(403).json({ msg: error.message })
    }

    //Verificar que no este en tus contactos
    if (req.usuario.contactos.includes(solicitud.Para.toString())) {
        const error = new Error('El contacto ya existe');
        return res.status(403).json({ msg: error.message })
    }

    const [usuario, contacto] = await Promise.all([
        Usuario.findById(req.usuario._id),
        Usuario.findById(solicitud.De)
    ])

    try {

        solicitud.estado = "Aceptada";

        const solicitudesActualizadas = usuario.solicitudes.filter(solicitudUsuario => solicitudUsuario.toString() !== solicitud._id.toString());
        usuario.solicitudes = solicitudesActualizadas;

        usuario.contactos.push(solicitud.De);
        contacto.contactos.push(solicitud.Para)

        await Promise.all([
            solicitud.save(),
            usuario.save(),
            contacto.save()
        ])

        res.json(solicitud);

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

        const solicitudesActualizadas = usuario.solicitudes.filter(solicitudUsuario => solicitudUsuario.toString() !== solicitud._id.toString());
        usuario.solicitudes = solicitudesActualizadas;

        await Promise.all([
            solicitud.save(),
            usuario.save()
        ])

        res.json(solicitud);

    } catch (error) {
        console.log(error);
    }

}

const obtenerSolicitudes = async (req, res) => {

    const solicitudes = await Solicitud.find({ Para: req.usuario._id }).populate("De");

    res.json(solicitudes);

}

const eliminarSolicitud = async (req, res) => {

    const { id } = req.params;

    //Verificar el id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    //Verificar que exista esa solicitud
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
        const error = new Error("Esa solicitud no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que este como pendiente
    if (solicitud.estado !== "Pendiente") {
        const error = new Error("La solicitud fue rechazada o aceptada");
        return res.status(403).json({ msg: error.message })
    }

    //Verificar que sea el autenticado el que quiere eliminar
    if (req.usuario._id.toString() !== solicitud.Para.toString()) {
        const error = new Error("No puedes eliminar esta solicitud");
        return res.status(401).json({ msg: error.message })
    }

    const usuario = await Usuario.findById(req.usuario._id);

    try {

        //Eliminar Solicitud del usuario
        const solicitudesActualizadas = usuario.solicitudes.filter(solicitudUsuario => solicitudUsuario.toString() !== solicitud._id.toString());
        usuario.solicitudes = solicitudesActualizadas;

        await Promise.all([
            solicitud.deleteOne(),
            usuario.save()
        ])

        res.json({ msg: "Solicitud Eliminada Correctamente" })


    } catch (error) {
        console.log(error);
    }

}

const eliminarSolicitudes = async (req, res) => {

    const usuario = await Usuario.findById(req.usuario._id);

    try {

        usuario.solicitudes = [];

        await Promise.all([
            Solicitud.deleteMany({
                Para: req.usuario._id
            }),
            usuario.save()
        ])

        res.json({ msg: "Solicitudes eliminadas correctamente" })

    } catch (error) {
        console.log(error);
    }

}

const buscarContacto = async (req, res) => {
    const { email } = req.body;
    const contacto = await Usuario.findOne({ email }).select("-password -token -createdAt -updatedAt -__v -contactos -solicitudes");

    console.log(req.body);

    if (!contacto) {
        const error = new Error('Ese usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    if (req.usuario.email === email) {
        const error = new Error('El usuario que buscas eres tu');
        return res.status(403).json({ msg: error.message })
    }

    res.json(contacto);
}

const eliminarContacto = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    const contacto = await Usuario.findById(id);

    if (!contacto) {
        const error = new Error('Ese usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    if (!req.usuario.contactos.includes(contacto._id)) {
        const error = new Error('Ese usuario no es tu contacto');
        return res.status(403).json({ msg: error.message })
    }

    const usuario = await Usuario.findById(req.usuario._id);

    try {

        usuario.contactos = usuario.contactos.filter(contactoID => contactoID.toString() !== id.toString());

        await Promise.all([
            Solicitud.findOneAndDelete({
                Para: req.usuario._id,
                De: id
            }),
            usuario.save()
        ])

        res.json({ msg: "Contacto eliminado correctamente" });

    } catch (error) {
        console.log(error);
    }

}

const obtenerContactos = async (req, res) => {

    if (req.usuario.contactos.length === 0) {
        return res.json({ msg: "Aun no tienes contactos" })
    }

    const usuario = await Usuario.findById(req.usuario._id).populate("contactos", {
        nombre: 1,
        email: 1,
        telefono: 1
    });
    const contactos = usuario.contactos;
    res.json(contactos);

}

export {
    enviarSolicitud,
    aceptarSolicitud,
    rechazarSolicitud,
    obtenerSolicitudes,
    eliminarSolicitud,
    eliminarSolicitudes,
    buscarContacto,
    eliminarContacto,
    obtenerContactos
}