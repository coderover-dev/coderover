const constants = require('../../constants');
const utils = require('../../utils');
const template = require('./template');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class DataModelGenerator {

  generate(metadata) {
    return this.writeMetadata(metadata.projectMetadata, metadata.dataModelMetadata);
  }

  prepareListFromObject(object) {
    if (object === undefined ||
      object == null) {
      return [];
    }

    let idList = Object.keys(object);
    let idCount = idList.length;
    let list = [];
    for (let i = 0; i < idCount; i++) {
      let finalObj = object[idList[i]];
      if (finalObj.deleted === undefined ||
        (finalObj.deleted != null && !finalObj.deleted)) {
        finalObj["fieldId"] = idList[i];
        list.push(finalObj);
      }
    }

    return list;
  }

  writeMetadata(projectMetadata, dataModelMetadata) {
    if(dataModelMetadata.id===undefined||dataModelMetadata.id==null){
      dataModelMetadata.id = uuidv4();
    }
    dataModelMetadata.fieldList = this.prepareListFromObject(dataModelMetadata.fields);
    dataModelMetadata.relationList = this.prepareListFromObject(dataModelMetadata.relations);
    let metadataFileName = dataModelMetadata.id + ".data.json";
    let content = utils.parseTemplate(template.DATA_MODEL_METADATA_JSON_TEMPLATE, dataModelMetadata);
    return utils.writeFileSync(
      path.join(projectMetadata.location, constants.APP_METADATA_DIR),
      metadataFileName, content);
  }

}

module.exports = new DataModelGenerator();