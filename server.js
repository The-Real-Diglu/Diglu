const express = require('express');
const path = require('path');
const { getEvents } = require('./db/op');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/events', async (req, res) => {
  try {
    const events = await getEvents();
    res.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
