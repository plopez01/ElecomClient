const request = require('request');
const httpCodes = require('../util/responseCodes.json');
const config = require("../util/config.json");
const errorModule = require("./error.js");

module.exports = {
    sendFriendRequest(data){
        return new Promise(function(resolve) {
            request.post({url:`http://${config.network.webip}:${config.network.webport}/user/friends/request`, 
            form: {tag: data.tag, sessionToken: data.sessionToken}}, 
            function(err, httpResponse){ 
                if(err || httpResponse.statusCode != httpCodes.OK){
                    //Wrong
                    resolve(errorModule.httpError(err, httpResponse));
                }else{
                    //Correct
                    resolve(true);
                }
            })
        });
    }
}