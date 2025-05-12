require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
    // Configuración del transporte
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: process.env.SMTP_USER, // Usuario SMTP
            pass: process.env.SMTP_PASS  // Contraseña SMTP
        }
    });

    // Opciones del correo
    const mailOptions = {
        from: process.env.SMTP_USER, // Remitente
        to: 'soporte@lanubetv.net', // Cambia esto por el destinatario real
        subject: 'Prueba', // Asunto del correo
        text: 'Este es un correo de prueba enviado con Nodemailer.' // Cuerpo del correo
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

// Llamar a la función para enviar el correo
sendTestEmail();
