const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    // For local dev, you can use ethereal email or just a standard Gmail setup.
    // If you want it to actually send an email to a real address, 
    // you need to configure your real credentials here, or it will use a testing service.
    
    // We'll create a test account on the fly for development purposes.
    // Priority: Real SMTP from environment variables
    let transporter;
    
    if (process.env.EMAIL && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail', // Standard Gmail setup
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Fallback: Ethereal test account
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL ? `"DripCheck" <${process.env.EMAIL}>` : '"DripCheck Team" <noreply@dripcheck.com>',
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
};

module.exports = sendEmail;
