const express = require("express");
const bodyParser = require('body-parser');

const imagesRoutes = require('./routes/saved-art-route');
const app = express();
app.use(bodyParser.json());

app.use('/api/saved',imagesRoutes);

app.listen(5000)