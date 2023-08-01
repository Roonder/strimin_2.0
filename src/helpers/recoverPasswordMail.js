import nodemailer from 'nodemailer';

const recoverPasswordEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const {email, user, token} = data;
    
    const info = await transporter.sendMail({
        from: "Strimin - Administrador de Clientes",
        to: email,
        subject: 'Recupera tu cuenta en Strimin',
        text: 'Recupera tu cuenta en Strimin',
        html: `<p>¡Hola, ${user}! Recupera tu cuenta en Strimin.</p>
        
        <p>Fue solicitada una recuperación de password para tu cuenta, para ello haz click en el siguiente enlace:  
        
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Recuperar Cuenta</a>
        </p>

        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `
    });
}

export default recoverPasswordEmail;