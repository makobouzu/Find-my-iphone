const { Router } = require('express');
const router = Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('date-utils');
require('dotenv').config();

router.get('/', async(req, res) => {
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    const credentials = require('./credentials.json');
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    var array = [];
    for(let i = 0; i < rows.length; ++i){
        const row = rows[i]._rawData.slice(1);
        array.push(row);
    }
    res.send(array);
});

router.post('/', async(req, res) => {
    console.log(req.body)
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    const credentials = require('./credentials.json');
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    var dt   = new Date();
    var date = dt.toFormat("YYYY:MM:DD:HH24:MI:SS");
    const upload = await sheet.addRow({ Date: date, Latitude: req.body.lat, Longitude: req.body.lng });
    res.send([req.body.lat, req.body.lng]);
});

module.exports = router;