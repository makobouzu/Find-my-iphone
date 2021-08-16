const { Router } = require('express');
const router = Router();
const icloud = require("find-my-iphone").findmyphone;
require('dotenv').config();

icloud.apple_id = process.env.APPLE_ID;
icloud.password = process.env.PASSWORD;
icloud.cookieFileStore = "icloud.cookie";
router.get('/', async(req, res) => {
    icloud.getDevices(function(error, devices) {
        var device;
        var array = [];
        if (error) {
            console.log(error);
        }else{
            devices.forEach(function(d) {
                if (device == undefined && d.location && d.lostModeCapable) {
                    device = d;
                }
            });
            if (device) {
                array.push(device.deviceDisplayName);
                array.push(device.location.latitude);
                array.push(device.location.longitude);
            }
        }
        res.send(array);
    });
});

module.exports = router;