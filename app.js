const express = require('express');
const pool = require('./db/db_config');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving events from the database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
