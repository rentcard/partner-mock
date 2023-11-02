const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World from the backend!');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
