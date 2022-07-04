import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.decode(token, process.env.SECRET_WORD);

            req.usuario = await Usuario.findById(decoded.id).select("-password -token -createdAt -updatedAt -__v");

            return next();

        } catch (error) {
            console.log(error);
        }
    }

    if(!token) {
        const error = new Error('Token no válido');
        return res.status(401).json({ msg: error.message })
    }

    next();

}

export default checkAuth;