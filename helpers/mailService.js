const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "nilporidreamgirl123@gmail.com",
    pass: "",
  },
});


const mailsender = async({ email, subject, template }) => {
     try {
        await transporter.sendMail({
    from: '"E-commerce Team" <team@e-commerce.com>',
    to: email,
    subject: subject,
    html: template,
  });
     } catch (error) {
      console.log("Error while sending mail, error");  
     }
  }

module.exports = { mailsender }