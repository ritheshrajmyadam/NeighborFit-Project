const express = require('express');
const cors = require('cors');
const { matchNeighborhoods } = require('./matching');

const app = express();
app.use(cors());
app.use(express.json());

const neighborhoods = [
  { id: 1, name: 'Greenwood', quietness: 8, budget: 5, parks: 7, vehicleFriendly: 6 },
  { id: 2, name: 'Downtown', quietness: 3, budget: 8, parks: 4, vehicleFriendly: 9 },
  { id: 3, name: 'Lakeside', quietness: 7, budget: 6, parks: 9, vehicleFriendly: 5 },
  { id: 4, name: 'Uptown', quietness: 5, budget: 7, parks: 5, vehicleFriendly: 8 },
];

app.post('/api/match', (req, res) => {
  try {
    const results = matchNeighborhoods(neighborhoods, req.body);
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
