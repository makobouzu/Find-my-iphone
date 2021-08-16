const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
require('date-utils');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const icloudRouter = require('./routes/icloud');
app.use('/icloud', icloudRouter);

const sheetRouter = require('./routes/spreadsheet');
app.use('/sheet', sheetRouter);

http.listen(process.env.PORT || 9000, "0.0.0.0", () => {
    console.log('http://localhost:' + process.env.PORT + ' or 9000')
});