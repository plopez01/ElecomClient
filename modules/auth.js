const request = require('request');

module.exports = {
    login(data){
        request('ip:3000/login', function (error, response, body) {
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });
    }
}