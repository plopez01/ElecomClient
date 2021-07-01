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
        fs.writeFile(`${path}/${fileName}.json`, JSON.stringify(userData), function(err){
            if(err){
              console.error(err);
            }
        });
    },
    getUserData(fileName){
        if (fs.existsSync(`${path}/${fileName}.json`)) {
            fs.readFile(`${path}/${fileName}.json`, function(err, data){
                if(!err){
                    return JSON.parse(data);
                }else{
                    console.error(err);
                    return null;
                }
            });
        }else{
            return null;
        }
    }
}