require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
  to: ["diesel_94@ukr.net", "eddku@i.ua", "taracatus@gmail.com"],
  from: "vmudrij0508@gmail.com",
  subject: "From Node.js with love",
  html: "<h1>Node.js is awesome platform</h1>",
  text: "Node.js is awesome platform",
};

sgMail
  .send(message)
  .then((response) => console.info(response))
  .catch((error) => console.error(error.response.body));
