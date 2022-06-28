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
            email: usuario.email
            //JWT
        })

    } else {
        const error = new Error('Password Incorrecto');
        return res.status(400).json({msg: error.message});
    }

}

export {
    registrar,
    autenticar
}