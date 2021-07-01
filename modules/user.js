module.exports = {
    sendFriendRequest(data){
        return new Promise(function(resolve) {
            request.post({url:`http://${config.network.webip}:${config.network.webport}/user/friends/request`, 
            form: {tag: data.tag}}, 
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