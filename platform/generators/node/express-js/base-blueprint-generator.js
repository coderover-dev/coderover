const constants = require('../../../constants');
const utils = require('../../../utils');
const template = require('./template');
const path = require('path');

class BaseBlueprintGenerator {

    generate(projectMetaData) {
        console.log("creating project blueprint..")
        //create app.js
        this.writeAppJs(projectMetaData);
        //generate package.json
        this.writePackageJson(projectMetaData);
        //add bin directory
        this.createAppDirectories(projectMetaData);
        //add routes.js to handle route registry
        this.writeRoutesJs(projectMetaData);

        //write project metadata to coderover.json
        this.writeMetadata(projectMetaData);
    }

    writePackageJson(projectMetaData) {
        let pkgJsonContent = utils.parseTemplate(template.PACKAGE_JSON_TEMPLATE, {
            projectName: projectMetaData.name
        })

        let writePackageJsonCallback = this.packageJsonWritten.bind(this);
        utils.writeFile(projectMetaData.location, 'package.json', pkgJsonContent, writePackageJsonCallback);

        return pkgJsonContent;
    }

    packageJsonWritten(error) {
        if (!error) {
            console.log("package.json created.")
        }
    }

    createAppDirectories(projectMetaData) {
        //create bin directory
        this.createDirectory(projectMetaData, constants.BIN_DIR);
        //create config directory
        this.createDirectory(projectMetaData, constants.CONFIG_DIR);
        //create routes directory
        this.createDirectory(projectMetaData, constants.ROUTES_DIR);
        //create services directory
        this.createDirectory(projectMetaData, constants.SERVICES_DIR);
        //create models directory
        this.createDirectory(projectMetaData, constants.MODELS_DIR);
        //create dao directory
        this.createDirectory(projectMetaData, constants.DAO_DIR);
        //create metadata directory
        this.createDirectory(projectMetaData, constants.APP_METADATA_DIR);
    }

    createDirectory(projectMetaData, dirName) {
        utils.mkdir(projectMetaData.location, dirName,
            (error) => {
                if (!error) {
                    console.log(dirName + " directory created.")
                }
            });
    }

    writeAppJs(projectMetaData) {
        let content = utils.parseTemplate(template.APP_JS_TEMPLATE, {
            projectName: projectMetaData.name
        });
        utils.writeFile(projectMetaData.location, constants.APP_MAIN_FILE, content,
            (error) => {
                if (!error) {
                    console.log(constants.APP_MAIN_FILE + ' created.');
                }
            });
    }

    writeRoutesJs(projectMetaData) {
        let content = utils.parseTemplate(template.ROUTE_JS_TEMPLATE, {
            projectName: projectMetaData.name
        });
        utils.writeFile(path.join(projectMetaData.location, constants.ROUTES_DIR), constants.ROUTES_FILE, content,
            (error) => {
                if (!error) {
                    console.log(constants.ROUTES_FILE + ' created.');
                }
            });
    }

    writeMetadata(projectMetaData) {
        let content = utils.parseTemplate(template.PROJECT_METADATA_JSON_TEMPLATE, projectMetaData);
        utils.writeFile(projectMetaData.location, constants.APP_METADATA_FILE, content,
            (error) => {
                if (!error) {
                    console.log(constants.APP_METADATA_FILE + ' created.');
                }
            });
    }

}

module.exports = new BaseBlueprintGenerator();