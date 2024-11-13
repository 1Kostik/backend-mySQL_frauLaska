const mailjet = require("node-mailjet");
const createEmail = require("./createEmail");

const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = process.env;

const client = mailjet.apiConnect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

const sendEmail = async (order) => {
  const { email, name, last_name, id } = order;

  const HTMLmail = await createEmail(order);
  
  const data = {
    Messages: [
      {
        From: {
          // Email: "dmytro.balynets@gmail.com",        
          Email: "frau.association@gmail.com",
          Name: "Frau Laska",
        },
        To: [
          {
            Email: email,
            Name: `${name} ${last_name}`,
          },
        ],
        Subject: `Ваше замовлення ${id}`,
        TextPart: "Hello dear customer",
        HTMLPart: HTMLmail,
      },
    ],
  };

  try {
    await client.post("send", { version: "v3.1" }).request(data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
