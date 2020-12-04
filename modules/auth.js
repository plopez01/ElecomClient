const request = require('request');
const httpCodes = require('../util/responseCodes.json');
const config = require("../util/config.json");
const errorModule = require("./error.js");

module.exports = {
    login(data){
        request.post({url:`http://${config.network.webip}:${config.network.webport}/login`, 
        form: {email:data.email, password:data.pass}}, 
        function(err, httpResponse){ 
            if(err || httpResponse.statusCode != httpCodes.OK){
                errorModule.httpError(err, httpResponse);
                return false;
            }else{
                return true;
            }
        })
    },
    register(data){
        request.post({url:`http://${config.network.webip}:${config.network.webport}/register`, 
        form: {email:data.email, username:data.username, password:data.pass}}, 
        function(err, httpResponse){ 
            if(err || httpResponse.statusCode != httpCodes.OK){
                errorModule.httpError(err, httpResponse);
                return false;
            }else{
                return true;
            }
        })
    }
}