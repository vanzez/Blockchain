var nodemailer = require('nodemailer');

exports.sendActivateMail = function(toEmail,code) {

    var transporter = nodemailer.createTransport('smtps://alphatestlaravel@gmail.com:vanz123456@smtp.gmail.com');

    var mailOption = {
        from: 'alphatestlaravel@gmail.com',
        to: toEmail,
        subject: 'Activation Email From Block Chain',
        text: 'Activate mail',
        html: '<h1>Welcome to Blockchain!</h1>'
        + '<p>To get started, you need to verify your email address. </p>'
        + '<p><a href=http://localhost:3000/auth/verify/' + code
        + '>Verify Email</a></p>'
    };

        transporter.sendMail(mailOption, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });

}

exports.sendForgotPasswordMail = function(toEmail,pass) {

    var transporter = nodemailer.createTransport('smtps://alphatestlaravel@gmail.com:vanz123456@smtp.gmail.com');

    var mailOption = {
        from: 'alphatestlaravel@gmail.com',
        to: toEmail,
        subject: 'Forgot password From Block Chain',
        text: 'Change forgot password mail',
        html: '<h1>Welcome to Blockchain!</h1>'
        + '<p>This is your new password:</p>' + pass
        + '<p>Use this password to change your password</p>'
    };

        transporter.sendMail(mailOption, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });

}
