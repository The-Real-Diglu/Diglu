const express = require('express');
const { addOrUpdateEvent, getEvents } = require('./db/db_operations');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/events', async (req, res) => {
  const { case_id, lat, lng, description } = req.body;
  try {
    const id = await addOrUpdateEvent(case_id, lat, lng, description);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add or update event' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
