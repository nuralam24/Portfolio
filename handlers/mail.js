//const express = require('express');
const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const promisify = require('es6-promisify')

//const router = express.Router();

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile(
        `${__dirname}/../views/email/${filename}.pug`,
        options
    )

    const inlined = juice(html)
    return inlined
}

exports.send = async (options) => {
  const transport = nodemailer.createTransport({
    host: smtp.gmail.com,
    port: 587,
    auth: {
        user: 'nuralamcse024@gmail.com',
        pass: 'nurcse0024nurcse'
    }
  })

  const html = generateHTML(options.filename, options)
  const text = htmlToText.fromString(html)

  const mailOptions = {
      from: req.body.email,
      to: 'nuralamcse024@gmail.com',
      replyTo: options.replyTo,
      subject: options.subject,
      html,
      text
  }
  
  const sendMail = promisify(transport.sendMail, transport)
  return sendMail(mailOptions)
}



// alternative option: 

// router.post('/contact', function (req, res) {
//     //setup nodemailer transport
//     var mailOpts, smtpTrans;
//     smtpTrans = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: "nuralamcse024@gmail.com",
//             pass: "nurcse0024"
//         }
//     });
//     //Fill mail options
//     mailOpts = {
//         from: req.body.name + ' &lt;' + req.body.email + '&gt;',
//         to: 'nuralamcse024@gmail.com',
//         subject: 'Email from Portfolio site',
//         text: req.body.message
//     };
//     smtpTrans.sendMail(mailOpts, function (error, info) {
//         //if email is not sent
//         if (error) {
//             res.render('contact', {
//                 title: 'Contact',
//                 page: 'contact',
//                 type: 'error',
//                 description: 'Email has not been sent.'
//             });
//         }
//         else {
//             res.render('contact', {
//                 title: 'Contact',
//                 page: 'contact',
//                 type: 'success',
//                 description: 'email successfully sent!'
//             });
//         }
//     });
// });

// module.exports = router;