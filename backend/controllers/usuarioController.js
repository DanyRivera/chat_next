import Usuario from "../models/Usuario.js";

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
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
        
    } catch (error) {
        console.log(error.message)
    }

}

const autenticar = async (req, res) => {

}

export {
    registrar,
    autenticar
}