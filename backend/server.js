
require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
  override: true
});

const path = require("path");
const express = require("express");
const cors = require("cors");

const recipientRoutes = require("./routes/recipientRoutes");
const alertRoutes = require("./routes/alertRoutes");

console.log(
  "Twilio SID loaded:",
  Boolean(process.env.TWILIO_ACCOUNT_SID)
);
console.log(
  "Twilio token loaded:",
  Boolean(process.env.TWILIO_AUTH_TOKEN)
);
console.log(
  "Twilio phone loaded:",
  Boolean(process.env.TWILIO_PHONE_NUMBER)
);

const app = express();

app.use(cors());
app.use(express.json());

// Serve files from your frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// API routes
app.use("/api", alertRoutes);
app.use("/api", recipientRoutes);

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
