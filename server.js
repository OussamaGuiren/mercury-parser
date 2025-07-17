const express = require('express');
const Mercury = require('@postlight/mercury-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/parser', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  try {
    const result = await Mercury.parse(url, { contentType: 'html' });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Mercury Parser API listening on port', port);
});
