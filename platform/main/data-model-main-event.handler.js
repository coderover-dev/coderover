const generatorFactory = require('../generators/generator-factory');
const workspace = require('../workspace');
const utils = require('../utils');
const electron = require('electron');
const MainProcessEventHandler = require('./main-process-event.handler');
const path = require('path');
const constants = require("../constants");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class DataModelMainEventHandler extends MainProcessEventHandler {

  constructor(ipcMain) {
    super(ipcMain)
    this._registerEvents();
  }

  _registerEvents() {

    const handleFetchDataModels = this.handleFetchDataModelsEvent.bind(this);
    this.ipcMain.on('FetchDataModels', handleFetchDataModels);

    const handleFetchDataModelFields = this.handleFetchDataModelFieldsEvent.bind(this);
    this.ipcMain.on('FetchDataModelFields', handleFetchDataModelFields);

    const handleLoadDataModel = this.handleLoadDataModelEvent.bind(this);
    this.ipcMain.on('LoadDataModel', handleLoadDataModel);

    const handlePersistDataModel = this.handlePersistDataModelEvent.bind(this);
    this.ipcMain.on('PersistDataModel', handlePersistDataModel);

  }


  prepareObjectFromList(list) {
    if (list === undefined || list == null) {
      return {};
    }

    let listCount = list.length;
    let finalObj = {};
    for (let i = 0; i < listCount; i++) {
      let object = list[i];
      if (object.deleted === undefined ||
        (object.deleted != null && !object.deleted)) {
        finalObj[object.fieldId] = object;
      }
    }

    return finalObj;
  }

  loadDataModel(onComplete, onError) {
    let projectMetadata = this.args.projectMetadata;
    let dataModelName = this.args.dataModelName;
    let metadataFileName = dataModelName.toLowerCase() + ".data.json";
    let content = fs.readFileSync(path.join(
      projectMetadata.location, constants.APP_METADATA_DIR, metadataFileName), 'utf8');
    let jsonDataModel = null;
    let error = false;

    try {
      jsonDataModel = JSON.parse(content.toString());
      onComplete(jsonDataModel);
    } catch (err) {
      error = true;
      console.log(err);
    }

    if (error) {
      onError();
    }
  }

  handleFetchDataModelFieldsEvent(event, args) {
    this.event = event;
    this.args = args;
    this.loadDataModel((jsonDataModel) => {
      let fields = [];
      for(let i=0;i<jsonDataModel.fields.length;i++){
        fields.push(jsonDataModel.fields[i].fieldName);
      }
      this.replyEventName = 'DataModelFieldsRetrieved';
      this.event.reply(
        this.replyEventName, {
          data: fields,
          success: true
        });
    }, () => {
      this.replyEventName = 'FetchDataModelFieldsFailed';
      this.event.reply(this.replyEventName, {
        dataModels: [],
        message: {
          summary: "Invalid metadata",
          description: "Could not read the data model metadata."
        },
        success: false
      });
    })
  }

  handleLoadDataModelEvent(event, args) {
    this.event = event;
    this.args = args;
    this.loadDataModel((jsonDataModel) => {
      jsonDataModel.fields = this.prepareObjectFromList(jsonDataModel.fields);
      jsonDataModel.relations = this.prepareObjectFromList(jsonDataModel.relations);
      this.replyEventName = 'DataModelLoaded';
      this.event.reply(
        this.replyEventName, {
          data: jsonDataModel,
          success: true
        });
    }, () => {
      this.replyEventName = 'LoadDataModelFailed';
      this.event.reply(this.replyEventName, {
        dataModels: [],
        message: {
          summary: "Invalid metadata",
          description: "Could not read the data model metadata."
        },
        success: false
      });
    })
  }

  handleFetchDataModelsEvent(event, args) {
    this.event = event;
    this.args = args;
    let location = path.join(args.location, constants.APP_METADATA_DIR);
    let error = false;
    const dataModelIds = utils.listMetaFiles(location, ".data.json");
    if (dataModelIds != null && dataModelIds.length > 0) {
      let dataModels = {};
      for(let i=0;i<dataModelIds.length;i++){
        let metadataFileName = dataModelIds[i] + ".data.json";
        let content = fs.readFileSync(path.join(location, metadataFileName), 'utf8');
        let jsonDataModel = {};
        try {
          jsonDataModel = JSON.parse(content.toString());
          if(jsonDataModel.id===undefined||jsonDataModel.id==null){
            jsonDataModel.id = uuidv4();
          }
        } catch (err) {}
        dataModels[jsonDataModel.id] = jsonDataModel;
      }
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

