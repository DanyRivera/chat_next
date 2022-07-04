import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {

    //Verificar si no hay usuarios repetidos
    const { email } = req.body;
    const usuarioExiste = await Usuario.findOne({ email: email });

    if(usuarioExiste) {
        const error = new Error('El usuario ya existe')
        return res.status(400).json({msg: error.message})
    }

    try {

        //Alamcenar el usuario
        const usuario = new Usuario(req.body);
        usuario.token = '';
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
        
    } catch (error) {
        console.log(error.message)
    }

}

const autenticar = async (req, res) => {

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    if(await usuario.comprobarPassword(password)) {

        res.json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono,
            token: generarJWT(usuario._id)
        })

    } else {
        const error = new Error('Password Incorrecto');
        return res.status(400).json({msg: error.message});
    }

}

const resetPassword = async (req, res) => {

    const { email } = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    try {
        
        usuario.token = generarId();
        await usuario.save();
        res.json({msg: "Hemos enviado las instrucciones por email"});

    } catch (error) {
        console.log(error);
    }

}

const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const usuario = await Usuario.findOne({token});

    if(usuario) {

        res.json({msg: 'Token válido y el usuario existe'})

    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message })
    }
}

const nuevaPassword = async (req, res) => {

    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({token});

    if(usuario) {

        usuario.password = password;
        usuario.token = '';

        try {
            
            await usuario.save();
            res.json({msg: "Password Modificado Correctamente"})

        } catch (error) {
            console.log(error);
        }

    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message })
    }

}

const perfil = (req, res) => {
    const {usuario} = req;
    res.json({usuario});
}

const buscarContacto = async (req, res) => {
    const {email} = req.body;
    const contacto = await Usuario.findOne({email}).select("-password -token -createdAt -updatedAt -__v -contactos");

    if(!contacto) {
        const error = new Error('Ese usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    if(req.usuario.email === email) {
        const error = new Error('El usuario que buscas eres tu');
        return res.status(403).json({ msg: error.message })
    }

    res.json(contacto);
}

const agregarContacto = async (req, res) => {

    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    const contacto = await Usuario.findById(id);

    if(!contacto) {
        const error = new Error('Ese usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    if(req.usuario.email === contacto.email) {
        const error = new Error('Tu no te puedes agregar como contacto');
        return res.status(403).json({ msg: error.message })
    }

    if(req.usuario.contactos.includes(contacto._id)) {
        const error = new Error('El contacto ya existe');
        return res.status(403).json({ msg: error.message })
    }

    const usuario = await Usuario.findById(req.usuario._id);
    
    try {
        
        usuario.contactos.push(contacto._id);
        await usuario.save();
        res.json({msg: "Contacto agregado correctamente"})

    } catch (error) {
        console.log(error);
    }

}

const eliminarContacto = async (req, res) => {

    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    const contacto = await Usuario.findById(id);

    if(!contacto) {
        const error = new Error('Ese usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    if(!req.usuario.contactos.includes(contacto._id)) {
        const error = new Error('Ese usuario no es tu contacto');
        return res.status(403).json({ msg: error.message })
    } 

    const usuario = await Usuario.findById(req.usuario._id);

    try {

        usuario.contactos = usuario.contactos.filter(contactoID => contactoID.toString() !== id.toString());
        await usuario.save();
        res.json({msg: "Contacto eliminado correctamente"});
        
        // console.log(usuario.contactos);
        // console.log(req.usuario.contactos);

    } catch (error) {
        console.log(error);
    }

}

const obtenerContactos = async (req, res) => {

    if(req.usuario.contactos.length === 0) {
        return res.json({msg: "Aun no tienes contactos"})
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
    registrar,
    autenticar,
    resetPassword,
    comprobarToken,
    nuevaPassword,
    perfil,
    buscarContacto,
    agregarContacto,
    eliminarContacto,
    obtenerContactos
}