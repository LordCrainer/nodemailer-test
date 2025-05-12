const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para enviar correos
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Faltan parámetros: to, subject, text' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado', messageId: info.messageId });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo', details: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Servidor de correo en funcionamiento');
}
);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
