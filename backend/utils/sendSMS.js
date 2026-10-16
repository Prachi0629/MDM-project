
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const toNumber = process.env.ALERT_PHONE_NUMBER;

const sendSMS = async (message) => {
  console.log("Checking SMS configuration:", {
    sidLoaded: Boolean(accountSid),
    tokenLoaded: Boolean(authToken),
    twilioPhoneLoaded: Boolean(fromNumber),
    recipientPhoneLoaded: Boolean(toNumber)
  });

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    throw new Error("Missing Twilio configuration or recipient number");
  }

  const client = twilio(accountSid, authToken);

  const result = await client.messages.create({
    body: message,
    from: fromNumber,
    to: toNumber
  });

  console.log("SMS submitted. Message SID:", result.sid);
  return result;
};

module.exports = sendSMS;
