const utils = require("../../../utils");
const template = require('./template');
const path = require('path');

const APP_MAIN_FILE = 'app.js';
const BIN_DIR = 'bin';
const CONFIG_DIR = 'config';
const ROUTES_DIR = 'routes';
const ROUTES_FILE = 'routes.js';
const SERVICES_DIR = 'services';
const DAO_DIR = 'dao';
const MODELS_DIR = 'models';


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
        this.createDirectory(projectMetaData, BIN_DIR);
        //create config directory
        this.createDirectory(projectMetaData, CONFIG_DIR);
        //create routes directory
        this.createDirectory(projectMetaData, ROUTES_DIR);
        //create services directory
        this.createDirectory(projectMetaData, SERVICES_DIR);
        //create models directory
        this.createDirectory(projectMetaData, MODELS_DIR);
        //create dao directory
        this.createDirectory(projectMetaData, DAO_DIR);
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
        let appJsContent = utils.parseTemplate(template.APP_JS_TEMPLATE, {
            projectName: projectMetaData.name
        });
        utils.writeFile(projectMetaData.location, APP_MAIN_FILE, appJsContent,
            (error) => {
                if (!error) {
                    console.log(APP_MAIN_FILE + ' created.');
                }
            });
    }

    writeRoutesJs(projectMetaData) {
        let appJsContent = utils.parseTemplate(template.ROUTE_JS_TEMPLATE, {
            projectName: projectMetaData.name
        });
        utils.writeFile(path.join(projectMetaData.location, ROUTES_DIR), ROUTES_FILE, appJsContent,
            (error) => {
                if (!error) {
                    console.log(ROUTES_FILE + ' created.');
                }
            });
    }

}

module.exports = new BaseBlueprintGenerator();