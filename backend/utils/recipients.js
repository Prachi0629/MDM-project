
let recipients = [];

async function getRecipients() {
  return [...recipients];
}

async function saveRecipients(updatedRecipients) {
  recipients = [...updatedRecipients];
}

module.exports = {
  getRecipients,
  saveRecipients
};
