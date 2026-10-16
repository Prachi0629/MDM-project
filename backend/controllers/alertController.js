
const sendSMS = require("../utils/sendSMS");

let latestAlert = null;

exports.sendAlert = async (req, res) => {

    console.log("🚨 ALERT REQUEST RECEIVED:", req.body);

  try {
    const { status, lat, lon } = req.body;

    if (lat == null || lon == null) {
      return res.status(400).json({
        error: "Latitude and longitude are required"
      });
    }

    const locationLink = `https://maps.google.com/?q=${lat},${lon}`;

    const alert = {
      status: status || "FALL DETECTED",
      latitude: lat,
      longitude: lon,
      location: locationLink,
      created_at: new Date().toISOString()
    };

    await sendSMS(
      `FALL ALERT!\nStatus: ${alert.status}\nLocation: ${locationLink}`
    );

    latestAlert = alert;

    return res.json({
      message: "Alert received and SMS sent successfully",
      data: alert
    });
  } catch (error) {
    console.error("Alert error:", error.message);

    return res.status(500).json({
      error: "Failed to send SMS alert",
      details: error.message
    });
  }
};

exports.getLatestAlert = (req, res) => {
  if (!latestAlert) {
    return res.status(404).json({
      message: "No alerts received yet"
    });
  }

  return res.json(latestAlert);
};
