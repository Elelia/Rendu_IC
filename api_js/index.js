const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${PORT}`)
});