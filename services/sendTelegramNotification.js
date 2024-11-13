const axios = require("axios");

const { TELEGRAM_TOKEN } = process.env;

const sendTelegramNotification = async (order) => {
  const botToken = TELEGRAM_TOKEN;
  // const chatId = "491842033"; //Dima
  const chatId = "781097883";
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const {
      id,
      name,
      last_name,
      phone,
      email,
      payment_method,
      delivery_type,
      delivery_city,
      delivery_destination,
      payment_status,
      recipient_name,
      recipient_last_name,
      recipient_phone,
      call_me_back,
    } = order;
    const type_payment =
      payment_method && payment_method === "paymentByRequisites"
        ? "Переказ на банківський рахунок"
        : "Накладний платіж";
    const message = `Створено заказ номер: ${id}\n${name} ${last_name}\n${phone}\n${email}\n\n${
      recipient_name
        ? `Інший одержувач: ${recipient_name} ${recipient_last_name}\n${recipient_phone}\n\n`
        : ""
    }Спосіб доставки: ${delivery_type}\n${
      delivery_type === "Нова пошта"
        ? `Місто: ${delivery_city}\nАдреса: ${delivery_destination}\n`
        : ""
    }\nСпосіб оплати: ${type_payment}\nСтатус оплати: ${payment_status}${
      call_me_back ? `\n\nПрохання передзвонити` : ""
    }`;

    await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = sendTelegramNotification;
