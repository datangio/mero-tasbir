const express = require('express');
const app = express();
const port = 5000;

app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Test server is working',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});
