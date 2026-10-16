const pool = require("../config/db");

const createAlert = async (status, lat, lon) => {
  const query = `
    INSERT INTO alerts (status, latitude, longitude)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [status, lat, lon];
  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = { createAlert };