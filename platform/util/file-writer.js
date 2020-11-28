const fs = require('fs');
const path = require('path');

export class FileWriter {
    writeFile(fileLocation, fileName, data, callback) {
        fs.writeFileSync(path.join(fileLocation, fileName), data)
        if (callback != null) {
            callback();
        }
    }
}
