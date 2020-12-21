const request = require('request');
const httpCodes = require('../util/responseCodes.json');
const config = require("../util/config.json");
const errorModule = require("./error.js");
const storageModule = require("./storage.js");

module.exports = {
    login(data){
        return new Promise(function(resolve) {
            request.post({url:`http://${config.network.webip}:${config.network.webport}/login`, 
            form: {email: data.email, password: data.pass}}, 
            function(err, httpResponse){
                if(err || httpResponse.statusCode != httpCodes.OK){
                    // Wrong
                    resolve(errorModule.httpError(err, httpResponse));
                }else{
                    //Correct
                    storageModule.storeUserData(httpResponse.body, 'userData');
                    resolve(true);
                }
            })
        });
        
    },
    register(data){
        return new Promise(function(resolve) {
            request.post({url:`http://${config.network.webip}:${config.network.webport}/register`, 
            form: {email: data.email, username: data.username, password: data.pass}}, 
            function(err, httpResponse){ 
                if(err || httpResponse.statusCode != httpCodes.OK){
                    //Wrong
                    resolve(errorModule.httpError(err, httpResponse));
                }else{
                    //Correct
                    storageModule.storeUserData(httpResponse.body, 'userData');
                    resolve(true);
                }
            })
        });
    }
}