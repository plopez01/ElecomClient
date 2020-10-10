const request = require('request');
const configModule = require("./config.js");

module.exports = {
    login(data){
        request.post({url:`http://${configModule.network.webip}:${configModule.network.webport}/login`, 
        form: {email:data.email}}, 
        function(err, httpResponse){ 
            if(err || httpResponse.statusCode != 200){
                console.error(err);
                return false;
            }else{
                return true;
            }
        })
    }
}