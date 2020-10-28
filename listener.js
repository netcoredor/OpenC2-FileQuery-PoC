// Copyright 2020 Efrain Ortiz

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";
var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({ type: 'application/openc2-json' }));
var AuthConfig = require(__dirname + '/etc/config.json');
var virustotal = require(__dirname + '/oc2cmds/virustotal.js');
var bluvector = require(__dirname + '/oc2cmds/bluvector.js');
var fireeye = require(__dirname + '/oc2cmds/fireeye.js');
var hashdd = require(__dirname + '/oc2cmds/hashdd.js');
var threatcrowd = require(__dirname + '/oc2cmds/threatcrowd.js');
var opswat = require(__dirname + '/oc2cmds/opswat.js');
var featurepairs = require(__dirname + '/assets/features.json');

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + '/index.html').pipe(res);
});
app.get('/assets/js/myscript.js', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.createReadStream(__dirname + '/assets/js/myscript.js').pipe(res);
});

app.get('/assets/js/jquery-3.3.1.min.js', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.createReadStream(__dirname + '/assets/js/jquery-3.3.1.min.js').pipe(res);
});

app.get('/assets/js/bootstrap.min.js', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.createReadStream(__dirname + '/assets/js/bootstrap.min.js').pipe(res);
});

app.get('/assets/js/popper.min.js', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.createReadStream(__dirname + '/assets/js/popper.min.js').pipe(res);
});

app.get('/assets/css/font-awesome.min.css', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(__dirname + '/assets/css/font-awesome.min.css').pipe(res);
});

app.get('/assets/fonts/fontawesome-webfont.woff2', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + '/assets/fonts/fontawesome-webfont.woff2').pipe(res);
});

app.get('/assets/css/bootstrap.min.css', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(__dirname + '/assets/css/bootstrap.min.css').pipe(res);
});

app.get('/assets/css/styles.css', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(__dirname + '/assets/css/styles.css').pipe(res);
});

app.get('/assets/css/Footer-Basic.css', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(__dirname + '/assets/css/Footer-Basic.css').pipe(res);
});

app.get('/assets/css/tabs-Menu.css', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(__dirname + '/assets/css/tabs-Menu.css').pipe(res);
});

app.get('/assets/actuator_capabilities.json', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "text/json" });
    fs.createReadStream(__dirname + '/assets/actuator_capabilities.json').pipe(res);
});

app.post('/command/', function (req, res) {
    if (req.headers["apikey"] != AuthConfig["apikey"]) {
        var output = '{ "status": "401"}';
        res.send(JSON.parse(output), null, 4);
    }
    if (req.headers["apikey"] == AuthConfig["apikey"]) {
        if (req.body.target.hasOwnProperty('features')) {
        if (req.body.target.hasOwnProperty('features') && (req.body.target['features'] == 0)) {
                var request_id = req.headers.request_id;
                var output = '{ "status": "200"}';
                res.send(JSON.parse(output), null, 4);
        }
        else if(req.body.target.hasOwnProperty('features') != 0 && req.body.target['features'].includes('pairs')) {
                    var request_id = req.headers.request_id;
                    var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : { "pairs": { "query": ["features","file"]}}}';
                    res.send(JSON.parse(output), null, 4);
            }
        else if (req.body.target['features'] != 0 && req.body.target['features'].includes('versions')) {
                var request_id = req.headers.request_id;
                var actuatorversions = [];  
                featurepairs.actuators.forEach(getVersions);
                function getVersions(item) {
                actuatorversions.push({"name": item['name'], "version": item['features']['version']});
              } 
                var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : {"versions": ["1.0"]}}';
                res.send(JSON.parse(output), null, 4);  
        }
    
    
        }
    
        else if (req.body.action.toLowerCase() == 'query' && req.body.target.hasOwnProperty('file') && (req.body.target.file.hasOwnProperty('hashes'))) {
            if (req.body.actuator.hasOwnProperty('x-virustotal')) {
                virustotal(req, function (parsedbody) {
                    if (parsedbody) {
                        var request_id = req.headers.request_id;
                        var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : ' + parsedbody + '}';
                        res.send(JSON.parse(output), null, 4);
                    }
                    else {
                        var output = '{ "status": "400", "results" : "failed" }';
                        res.send(JSON.parse(output), null, 4);
                    }

                });
            }
            else if (req.body.actuator.hasOwnProperty('x-bluvector')) {
                bluvector(req, function (parsedbody) {
                    if (parsedbody) {
                        var request_id = req.headers.request_id;
                        var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : ' + parsedbody + '}';
                        res.send(JSON.parse(output), null, 4);
                    }
                    else {
						var output = '{ "status": "400", "results" : "failed" }';
                        res.send(JSON.parse(output), null, 4);
                    }
                })
            }
            else if (req.body.actuator.hasOwnProperty('x-fireeye')) {
                fireeye(req, function (parsedbody) {
                    if (parsedbody) {
                        var request_id = req.headers.request_id;
                        var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : ' + parsedbody + '}';
                        res.send(JSON.parse(output), null, 4);
                     }
                    else {
                        var output = '{ "status": "400", "results" : "Error in request." }';
                        res.send(JSON.parse(output), null, 4);
                    }
                })
            }
            else if (req.body.actuator.hasOwnProperty('x-hashdd')) {
                hashdd(req, function (parsedbody) {
                    if (parsedbody) {
                        var request_id = req.headers.request_id;
                        var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : ' + parsedbody + '}';
                        res.send(JSON.parse(output), null, 4);
                     }
                    else {
                        var output = '{ "status": "400", "results" : "Error in request." }';
                        res.send(JSON.parse(output), null, 4);
                    }
                })
            }
            else if (req.body.actuator.hasOwnProperty('x-threatcrowd')) {
                threatcrowd(req, function (parsedbody) {
                    if (parsedbody) {
                        var request_id = req.headers.request_id;
                        var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : ' + parsedbody + '}';
                        res.send(JSON.parse(output), null, 4);
                     }
                    else {
                        var output = '{ "status": "400", "results" : "Error in request." }';
                        res.send(JSON.parse(output), null, 4);
                    }
                })
            }            
            else if (req.body.actuator.hasOwnProperty('x-opswat')) {
                opswat(req, function (parsedbody) {
                    if (parsedbody) {
                        var request_id = req.headers.request_id;
                        var output = '{ "status": "200", "request_id": "' + request_id + '", "results" : ' + parsedbody + '}';
                        res.send(JSON.parse(output), null, 4);
                     }
                    else {
                        var output = '{ "status": "400", "results" : "Error in request." }';
                        res.send(JSON.parse(output), null, 4);
                    }
                })
            }
            else {
                var output = '{ "status": "400", "results" : "Resubmit with actuator specified" }';
                res.send(JSON.parse(output), null, 4);
            };
        }
        else {
        var output = '{ "status": "400" }';
        res.send(JSON.parse(output), null, 4);
        }
    }
});

var ssloptions = {
    key: fs.readFileSync(__dirname + '/etc/server.key'),
    cert: fs.readFileSync(__dirname + '/etc/server.crt')
};

https.createServer(ssloptions, app).listen(1512, function () {
    console.log('File Hash Query OpenC2 Proxy Middleware Listening on https://localhost:1512');
});