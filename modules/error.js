const httpCodes = require('../util/responseCodes.json');

module.exports = {
    httpError(err, httpResponse){

        //Did not get any http response, analyze error.
        if(httpResponse == null){
            switch(err.code){

                //Client to server connection failed
                case 'ECONNREFUSED':
                    //Handle
                    console.error(err);
                break;
    
            }
        }else{ //Did get respose, but unexpected one.
            switch(httpResponse.statusCode){

                //Wrong user or password
                case httpCodes.UNAUTHORIZED:
                    //Handle
                break;

                //User is not registered
                case httpCodes.NOT_FOUND:
                    //Handle
                break;

                //Api is not implemented yet
                case httpCodes.NOT_IMPLEMENTED:
                    //Handle
                break;

                //Malformed request
                case httpCodes.BAD_REQUEST:
                    //Handle
                break;

                //Access is forbidden to this Api
                case httpCodes.FORBIDDEN:
                    //Handle
                break;

                //The server is not available
                case httpCodes.SERVICE_UNAVAILABLE:
                    //Handle
                break;

                //An internal server error has ocurred
                case httpCodes.INTERNAL_SERVER_ERROR:
                    //Handle
                break;

            }
        }
        
    },
}