module.exports = function(to, subject, text){
    const nodemailer = require('nodemailer')
    //usando SMTP para envio
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'abbie.trantow86@ethereal.email',
            pass: 'TD3VvV53Sqqa8728cE'
        }
    });
 
    const message = {
        from: 'teste@mail.com',
        to,
        subject,
        text,
        //html: "<b>Olá mundo!</b>" //opcional
    }
 
    smtpTransport.sendMail(message, function(error, response){
        if(error) 
            console.log(error)
        else
            console.log("Email enviado: " + response.message);
        smtpTransport.close();
    })
 
}