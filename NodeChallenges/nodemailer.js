var nm = require('nodemailer');
const { getMaxListeners } = require('process');

var transporter = nm.createTransport(
    {
        service: 'gmail',
        auth: 
        {
            user: 'lemierecs@gmail.com',
            pass: ''
        }
    }
);

var mailOptions = {
    from: 'lemierecs@gmail.com',
    to: 'ericlemieremusic@gmail.com, ericrlemiere@gmail.com',
    subject: 'Email using Node.js',
    text: 'If you can read this it worked.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
});