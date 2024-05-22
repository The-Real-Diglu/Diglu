const pool = require('./db_config');

(async () => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        case_id VARCHAR(255) NOT NULL,
        lat FLOAT,
        lng FLOAT,
        description TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE(case_id)
      );
    `);
  } finally {
    connection.release();
  }
})();
