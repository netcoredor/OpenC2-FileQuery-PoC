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
    var hashes = req.body.target.file.hashes;
    var hashValue = "";
    function getHash() {
    if (req.body.target.file.hashes.hasOwnProperty('md5')){
        hashValue = hashes.md5
        return hashValue
    } 
    else if (req.body.target.file.hashes.hasOwnProperty('sha256')){
        hashValue = hashes['sha256'];
        return hashValue
        }
    };
    var options = { 
        method: 'GET', 
        url: 'https://www.threatcrowd.org/searchApi/v2/file/report/?resource=' + getHash(hashValue),
        headers: {
            'Content-Type': 'application/json'
          }

    };
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