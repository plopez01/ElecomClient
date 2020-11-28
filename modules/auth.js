const request = require('request');
const configModule = require("./config.js");

module.exports = {
    login(data){
        request.post({url:`http://${configModule.network.webip}:${configModule.network.webport}/login`, 
        form: {email:data.email, password:data.pass}}, 
        function(err, httpResponse){ 
            if(err || httpResponse.statusCode != 200){
                if(err) console.error(err);
                return false;
            }else{
                return true;
            }
        })
    },
    register(data){
        request.post({url:`http://${configModule.network.webip}:${configModule.network.webport}/register`, 
        form: {email:data.email, username:data.username, password:data.pass}}, 
        function(err, httpResponse){ 
            if(err || httpResponse.statusCode != 200){
                if(err) console.error(err);
                return false;
            }else{
                return true;
            }
        })
    }
}