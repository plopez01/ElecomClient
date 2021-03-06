const { app } = require('electron');
const fs = require('fs');
var path = '';
module.exports = {
    setupStorage(dirName){
        path = `${app.getPath('appData')}/${dirName}`;
        if (!fs.existsSync(path)) {
            console.log(`[Storage/INFO] Creating AppData/${dirName} directory...`);
            fs.mkdirSync(path);
        }
    },
    storeUserData(userData, fileName){
        fs.writeFile(`${path}/${fileName}.json`, userData, function(err){
            if(err){
              console.error(err);
            }
        });
    },
    getUserData(fileName){
        return new Promise(function(resolve) {
            if (fs.existsSync(`${path}/${fileName}.json`)) {
                fs.readFile(`${path}/${fileName}.json`, function(err, data){
                    if(!err){
                        resolve(JSON.parse(data)); // Run parse twice 'cause frist parse only gets rid of escaped string
                    }else{
                        console.error(err);
                        resolve(false);
                    }
                });
            }else{
                resolve(false);
            }
        });
    }
}