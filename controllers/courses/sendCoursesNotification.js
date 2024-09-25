const axios = require("axios");

const { TELEGRAM_TOKEN } = process.env;

const sendCoursesNotification = async (req, res) => {
  const botToken = TELEGRAM_TOKEN;
  const chatId = "491842033";
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const { name, phone, email, course, message } = req.body;

  let courseName;
  switch (course) {
    case "aroma":
      courseName = "Аромотерапія";
      break;
    case "health":
      courseName = "Оздоровлення";
      break;
    case "pregnant":
      courseName = "Для вагітних";
      break;
    case "recovery":
      courseName = "Відновлення";
      break;
    case "preparation":
      courseName = "Підготовка";
      break;
    default:
      break;
  }

  const notification = `Реєстрація на курс: ${courseName}\n${name}\n${phone}\n${email}\n${message}`;

  try {
    await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: notification,
    });

    res.status(200).json({ message: "Course notification sent successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({
      message: "Failed to send notification",
      error: error.message,
    });
  }
};

module.exports = sendCoursesNotification;
