const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "f6b4acaf82699cce7990d88bf3696930";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3151440,
  })
);

const sender = {
  address: "info@etemp.com",
  name: "E-Temp",
};
const recipients = ["priyanshu0dubey@gmail.com"];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sucessfully testing the mailtrap for eTemp store!",
    category: "Integration Test",
    sandbox: true,
  })
  .then(console.log, console.error);
