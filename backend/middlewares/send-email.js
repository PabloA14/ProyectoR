import nodemailer from "nodemailer";

const sendEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    ignoreTLS: true,
    auth:{
        user:'repositoriosena123@gmail.com',
        pass: 'uidp tzee kkvd rddq',
    },
    tls:{
rejectUnauthorized: false,
    }
})

sendEmail.verify().then(()=>{
    console.log('Envio de email listo');
});

export default sendEmail
