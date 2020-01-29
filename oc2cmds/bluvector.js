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
module.exports =  function (req,callback){
    var AuthConfig = require(__dirname + '/../etc/config.json');
    var fs = require('fs');
    var request = require('request');
    var requestBody = req.body;
    var options = { 
        "method": 'POST', 
        "body": JSON.stringify(requestBody),
        "url": 'https://167.102.248.22:6443/command',
        "headers": {
            "content-type": 'application/openc2-cmd+json',
            "X-Request-ID": req.headers['x-request-id'],
            "Authorization": 'Token ' + AuthConfig['bluvectorapikey'],
        } };
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        request(options,
            function (err,body) {
                    if (!err) {
                        callback(body.body);
                        } 
                    else {
                        if (typeof callback == 'function')
                            {
                        callback(err);
                        }
                    }
                })

            }