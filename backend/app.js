const express = require('express');
const cors = require('cors');
const app = express();
const hinoRoutes = require('./routes/hinos');

app.use(cors());
app.use(express.json());

app.use('/hinos', hinoRoutes);

module.exports = app;