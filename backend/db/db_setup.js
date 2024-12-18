const pool = require('./db_config');

(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connected to the database');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        case_id VARCHAR(255) NOT NULL,
        lat FLOAT,
        lng FLOAT,
        description TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE(case_id)
      );
    `;

    await connection.query(createTableQuery);
    console.log('Table setup completed');
  } catch (err) {
    console.error('Error setting up table:', err.message);
  } finally {
    if (connection) {
      connection.release();
      console.log('Database connection released');
    }
  }
})();
