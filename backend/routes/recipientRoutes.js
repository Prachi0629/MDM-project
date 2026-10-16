
const express = require("express");
const router = express.Router();

const {
  getRecipients,
  saveRecipients
} = require("../utils/recipients");

router.get("/recipients", async (req, res) => {
  try {
    res.json(await getRecipients());
  } catch (error) {
    res.status(500).json({ error: "Could not load recipients" });
  }
});

router.post("/recipients", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({
        error: "Enter a name and at least an email or phone number"
      });
    }

    const recipients = await getRecipients();

    const recipient = {
      id: Date.now().toString(),
      name: String(name).trim(),
      email: String(email || "").trim(),
      phone: String(phone || "").trim()
    };

    recipients.push(recipient);
    await saveRecipients(recipients);

    res.status(201).json(recipient);
  } catch (error) {
    res.status(500).json({ error: "Could not save recipient" });
  }
});

module.exports = router;
