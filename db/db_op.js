const pool = require('./db_config');

async function addOrUpdateEvent(case_id, lat, lng, description) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(`
      INSERT INTO events (case_id, lat, lng, description)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE lat = VALUES(lat), lng = VALUES(lng), description = VALUES(description), timestamp = CURRENT_TIMESTAMP
    `, [case_id, lat, lng, description]);
    return result.insertId;
  } finally {
    connection.release();
  }
}

async function getEvents() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM events');
    return rows;
  } finally {
    connection.release();
  }
}

module.exports = { addOrUpdateEvent, getEvents };
