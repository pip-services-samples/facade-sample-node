/**
 * @file REST API for system and client information
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

var systemPackage = require('../../package.json');

'use strict';

var
    os = require('os'),
    
    commons = require('pip-services-commons'),
    detect = commons.detect,
    auth = commons.auth,
    response = commons.response;

module.exports = function (app, seneca) {

    function getAbout(req, res) {
        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }

        var about = {
            server: {
                time: new Date().toISOString(),
                protocol: req.protocol,
                host: detect.detectServerHost(req),
                addresses: addresses.toString(),
                port: detect.detectServerPort(req),
                url: req.originalUrl,

                name: systemPackage.name,
                version: systemPackage.version,
                copyrights: systemPackage.author,
                details: systemPackage.details
            },
            client: {
                address: detect.detectAddress(req),
                client: detect.detectBrowser(req),
                platform: detect.detectPlatform(req)
            }
        };

        if (req.user) 
            about.user = req.user;
        
        res.json(about);
    };

    app.get('/about', auth.anybody, getAbout);
};
