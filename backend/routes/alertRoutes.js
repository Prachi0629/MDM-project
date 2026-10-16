const express = require("express");
const router = express.Router();
const { sendAlert } = require("../controllers/alertController");

router.post("/alert", sendAlert);

module.exports = router;