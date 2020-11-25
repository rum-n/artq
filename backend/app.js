const express = require("express");
const bodyParser = require('body-parser');

const imagesRoutes = require('./routes/saved-art-route');
const app = express();

app.use(imagesRoutes);

app.listen(5000)