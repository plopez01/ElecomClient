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
                    return "Connection failed. Check your internet."
                    
                default:
                    console.error(err);
                    return err;
            }
        }else{ //Did get response, but unexpected one.
            console.error("[ErrorModule/ERROR] Server answered with: "+ httpResponse.statusCode);
            switch(httpResponse.statusCode){

                //Wrong user or password
                case httpCodes.UNAUTHORIZED:
                    return "Unauthorized";

                //User is not registered
                case httpCodes.NOT_FOUND:
                    return "Not found";

                //Api is not implemented yet
                case httpCodes.NOT_IMPLEMENTED:
                    return "Not Implemented";

                //Malformed request
                case httpCodes.BAD_REQUEST:
                    return "Bad request";

                //Access is forbidden to this Api
                case httpCodes.FORBIDDEN:
                    return "Forbidden";

                //The server is not available
                case httpCodes.SERVICE_UNAVAILABLE:
                    return "Service Unavailabe";

                //An internal server error has ocurred
                case httpCodes.INTERNAL_SERVER_ERROR:
                    return "Internal Server Error";

                default:
                    return "Error - " + httpResponse.statusCode;
            }
        }
        
    },
}