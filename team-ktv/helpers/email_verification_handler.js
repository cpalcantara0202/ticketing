const MAIL = require('../classes/MailClass');

function generateVerificationCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

async function sendVerificationEmail(email, verificationToken)
{
    try
    {
        const verificationUrl = `${ global_config.base_url }/v1/verify?token=${verificationToken}`;

        let mail = new MAIL();
        mail.setFrom(global_config.mail_from);
        mail.setRecipient(email)
        mail.setSubject('Email Verification');
        mail.setContent(`Please click the following link to verify your email: ${verificationUrl}`);
        await mail.send();
    }
    catch (error)
    {
        console.error('Error sending verification email:', error);
    }
}

module.exports = {
    generateVerificationCode,
    sendVerificationEmail
}