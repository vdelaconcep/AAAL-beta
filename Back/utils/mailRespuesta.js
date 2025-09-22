import transporter from "../config/nodemailer";

export const enviarCorreoRespuesta = (mail, asunto, texto) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: 'Asociación de Autos Antiguos de Lanús',
            to: mail,
            subject: asunto,
            text: texto
        }, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};