const app = require("./app");

const PORT = process.env.PORT;

app.set("port", PORT);

app.listen(PORT, () => {
  console.log("Listening");
  console.log(PORT);
});

