import nodemailer from "nodemailer";

export const emailPassword = async (datos) => {

    const {nombre, email, token} = datos;

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"ChatApp - Comunicación Fácil" <cuentas@chatapp.com>',
        to: email,
        subject: "ChatApp - Resetea Tu Password",
        text: "Cambia tu password",
        html: `
            <p>Hola ${nombre} cambia tu password de ChatApp</p>
            <p>Sigue el siguente enlace para generar un nuevo password: </p>
            <a href="${process.env.FRONTEND_URL}/reset-password/${token}" >Restablecer Password</a>
            <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        `
    })

}