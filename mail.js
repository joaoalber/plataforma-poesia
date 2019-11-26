module.exports = function (to, subject, text) {
    const nodemailer = require('nodemailer')
    //usando SMTP para envio
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jalyn.beatty92@ethereal.email',
            pass: 'FP5qVgJbKcH7kzbTdW'
        }
    });

    const message = {
        from: 'jalyn.beatty92@ethereal.email',
        to,
        subject,
        text,
        //html: "<b>Olá mundo!</b>" //opcional
    }

    smtpTransport.sendMail(message, function (error, response) {
        if (error)
            console.log(error)
        else
            console.log("Email enviado");
        smtpTransport.close();
    })

}