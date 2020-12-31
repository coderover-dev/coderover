const constants = require('../../../constants');
const utils = require('../../../utils');
const template = require('./template');
const path = require('path');

class BaseBlueprintGenerator {

  generate(projectMetadata) {
    console.log("creating project blueprint..")
    //create app.js
    this.writeAppJs(projectMetadata);
    //generate package.json
    this.writePackageJson(projectMetadata);
    //add bin directory
    this.createAppDirectories(projectMetadata);
    //add routes.js to handle route registry
    this.writeRoutesJs(projectMetadata);

    //write project metadata to coderover.json
    this.writeProjectMetadata(projectMetadata);
  }

  writePackageJson(projectMetadata) {
    let pkgJsonContent = utils.parseTemplate(template.PACKAGE_JSON_TEMPLATE, {
      projectName: projectMetadata.name
    })

    let writePackageJsonCallback = this.packageJsonWritten.bind(this);
    utils.writeFile(projectMetadata.location, 'package.json', pkgJsonContent, writePackageJsonCallback);

    return pkgJsonContent;
  }

  packageJsonWritten(error) {
    if (!error) {
      console.log("package.json created.")
    }
  }

  createAppDirectories(projectMetadata) {
    //create bin directory
    this.createDirectory(projectMetadata, constants.BIN_DIR);
    //create config directory
    this.createDirectory(projectMetadata, constants.CONFIG_DIR);
    //create routes directory
    this.createDirectory(projectMetadata, constants.ROUTES_DIR);
    //create services directory
    this.createDirectory(projectMetadata, constants.SERVICES_DIR);
    //create models directory
    this.createDirectory(projectMetadata, constants.MODELS_DIR);
    //create dao directory
    this.createDirectory(projectMetadata, constants.DAO_DIR);
    //create metadata directory
    this.createDirectory(projectMetadata, constants.APP_METADATA_DIR);
  }

  createDirectory(projectMetadata, dirName) {
    utils.mkdir(projectMetadata.location, dirName,
      (error) => {
        if (!error) {
          console.log(dirName + " directory created.")
        }
      });
  }

  writeAppJs(projectMetadata) {
    let content = utils.parseTemplate(template.APP_JS_TEMPLATE, {
      projectName: projectMetadata.name
    });
    utils.writeFile(projectMetadata.location, constants.APP_MAIN_FILE, content,
      (error) => {
        if (!error) {
          console.log(constants.APP_MAIN_FILE + ' created.');
        }
      });
  }

  writeRoutesJs(projectMetadata) {
    let content = utils.parseTemplate(template.ROUTE_JS_TEMPLATE, {
      projectName: projectMetadata.name
    });
    utils.writeFile(path.join(projectMetadata.location, constants.ROUTES_DIR), constants.ROUTES_FILE, content,
      (error) => {
        if (!error) {
          console.log(constants.ROUTES_FILE + ' created.');
        }
      });
  }

  writeProjectMetadata(projectMetadata) {
    let content = utils.parseTemplate(template.PROJECT_METADATA_JSON_TEMPLATE, projectMetadata);
    utils.writeFile(projectMetadata.location, constants.APP_METADATA_FILE, content,
      (error) => {
        if (!error) {
          console.log(constants.APP_METADATA_FILE + ' created.');
        }
      });
  }

}

module.exports = new BaseBlueprintGenerator();