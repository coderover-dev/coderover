const fs = require('fs');

class Workspace {

    constructor() {
        this.projectLocation = "";
    }

    createProject(projectLocation){
        // check if project dir already exists
        if(!this.existsProjectDir(projectLocation)){
            //if not exists, then create dir
            let projectDirCreated = this.createProjectDir(projectLocation)
            if(projectDirCreated===undefined || !(projectDirCreated == null)){
                //project directory created
                return {
                    success: true
                }
            }else{
                return {
                    message:{
                        summary: "Project creation failed.",
                        description:"Failed to create project directory."
                    },
                    success: false
                }
            }
        }else{
            return {
                message: {
                    summary: "Project creation failed.",
                    description:"Directory already exists, cannot overwrite an existing directory"
                },
                success: false
            }
        }
    }

    existsProjectDir(projectLocation){
        return fs.existsSync(projectLocation);
    }

    createProjectDir(projectLocation){
        return fs.mkdirSync(projectLocation)
    }

}

module.exports = new Workspace();
