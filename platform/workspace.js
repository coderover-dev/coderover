const fs = require('fs');
const path = require('path');
const constants = require("./constants");

class Workspace {

    constructor() {
        this.projectLocation = "";
    }

    createProject(projectLocation) {
        // check if project dir already exists
        if (!this.existsProjectDir(projectLocation)) {
            //if not exists, then create dir
            let projectDirCreated = this.createProjectDir(projectLocation)
            if (projectDirCreated === undefined || !(projectDirCreated == null)) {
                //project directory created
                return {
                    success: true
                }
            } else {
                return {
                    message: {
                        summary: "Project creation failed.",
                        description: "Failed to create project directory."
                    },
                    success: false
                }
            }
        } else {
            return {
                message: {
                    summary: "Project creation failed.",
                    description: "Directory already exists, cannot overwrite an existing directory"
                },
                success: false
            }
        }
    }

    existsProjectDir(projectLocation) {
        return fs.existsSync(projectLocation);
    }

    createProjectDir(projectLocation) {
        return fs.mkdirSync(projectLocation)
    }

    validateProjectDir(projectLocation) {
        return fs.existsSync(path.join(projectLocation, constants.APP_METADATA_FILE))
    }

    loadProjectMetadata(projectLocation) {
        let content = fs.readFileSync(path.join(projectLocation, constants.APP_METADATA_FILE), 'utf8');
        let jsonContent = null;
        try {
            jsonContent = JSON.parse(content.toString());
        } catch (err) {
            console.log(err);
        }
        return jsonContent;
    }

}

module.exports = new Workspace();
