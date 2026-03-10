const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("InclusiCare backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "API working successfully"
  });
});

app.post("/api/chat", (req, res) => {

  const userMessage = req.body.message;

  const reply = "I understand how you feel. Tell me more.";

  res.json({
    userMessage: userMessage,
    botReply: reply
  });

});