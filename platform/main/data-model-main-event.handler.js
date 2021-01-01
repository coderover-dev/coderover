const generatorFactory = require('../generators/generator-factory');
const workspace = require('../workspace');
const utils = require('../utils');
const electron = require('electron');
const MainProcessEventHandler = require('./main-process-event.handler');
const path = require('path');
const constants = require("../constants");
const fs = require('fs');

class DataModelMainEventHandler extends MainProcessEventHandler {

  constructor(ipcMain) {
    super(ipcMain)
    this._registerEvents();
  }

  _registerEvents() {

    const handleFetchDataModels = this.handleFetchDataModelsEvent.bind(this);
    this.ipcMain.on('FetchDataModels', handleFetchDataModels);

    const handleLoadDataModel = this.handleLoadDataModelEvent.bind(this);
    this.ipcMain.on('LoadDataModel', handleLoadDataModel);

    const handlePersistDataModel = this.handlePersistDataModelEvent.bind(this);
    this.ipcMain.on('PersistDataModel', handlePersistDataModel);

  }


  prepareFields(resourceMetadata) {
    if (resourceMetadata.fields === undefined ||
      resourceMetadata.fields == null) {
      return {};
    }

    let fieldList = resourceMetadata.fields;
    let fieldCount = fieldList.length;
    let fields = {};
    for (let i = 0; i < fieldCount; i++) {
      let field = fieldList[i];
      if (field.deleted === undefined ||
        (field.deleted != null && !field.deleted)) {
        fields[field.fieldId] = field;
      }
    }

    return fields;
  }

  handleLoadDataModelEvent(event, args) {
    this.event = event;
    this.args = args;
    let projectMetadata = args.projectMetadata;
    let dataModelName = args.dataModelName;
    let metadataFileName = dataModelName.toLowerCase() + ".data.json";
    let content = fs.readFileSync(path.join(
      projectMetadata.location, constants.APP_METADATA_DIR, metadataFileName), 'utf8');
    let jsonContent = null;
    let error = false;

    try {
      jsonContent = JSON.parse(content.toString());
      jsonContent.fields = this.prepareFields(jsonContent);
      this.replyEventName = 'DataModelLoaded';
      this.event.reply(
        this.replyEventName, {
          data: jsonContent,
          success: true
        });
    } catch (err) {
      error = true;
      console.log(err);
    }

    if (error) {
      this.replyEventName = 'LoadDataModelFailed';
      this.event.reply(this.replyEventName, {
        dataModels: [],
        message: {
          summary: "Invalid metadata",
          description: "Could not read the data model metadata."
        },
        success: false
      });
    }
  }

  handleFetchDataModelsEvent(event, args) {
    this.event = event;
    this.args = args;
    let location = path.join(args.location, constants.APP_METADATA_DIR);
    let error = false;
    const dataModels = utils.listMetaFiles(location, ".data.json");
    if (dataModels != null && dataModels.length > 0) {
      this.replyEventName = 'DataModelsFetched';
      this.event.reply(
        this.replyEventName, {
          dataModels: dataModels,
          success: true
        });
    } else {
      error = true;
    }

    if (error) {
      this.replyEventName = 'FetchDataModelsFailed';
      this.event.reply(this.replyEventName, {
        dataModels: [],
        message: {
          summary: "Invalid metadata",
          description: "Could not retrieve the registered data models for the current project."
        },
        success: false
      });
    }
  }

  handlePersistDataModelEvent(event, args) {
    this.event = event;
    this.args = args;
    const success = generatorFactory
      .getGenerator()
      .getDataModelGenerator()
      .generate(args);
    if (success != null && success) {
      this.replyEventName = 'DataModelPersisted';
      this.event.reply(this.replyEventName, {
        error: !success
      });
    } else {
      this.replyEventName = 'PersistDataModelFailed';
      this.event.reply(this.replyEventName, {
        message: {
          summary: 'Failed to persist the resource',
          description: ''
        },
        error: !success
      });
    }
  }

}

module.exports = function (ipcMain) {
  return new DataModelMainEventHandler(ipcMain);
}

