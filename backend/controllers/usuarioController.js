import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import { emailPassword } from "../helpers/emails.js";

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
        res.json({msg: "Cuenta creada correctamente, ya puedes iniciar sesión"});
        
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
        emailPassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
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
            res.json({msg: "Password Modificado Correctamente - Ya Puedes Iniciar Sesión"})

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
    res.json(usuario);
}

export {
    registrar,
    autenticar,
    resetPassword,
    comprobarToken,
    nuevaPassword,
    perfil
}