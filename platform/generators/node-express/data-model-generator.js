const constants = require('../../constants');
const utils = require('../../utils');
const template = require('./template');
const path = require('path');

class DataModelGenerator {

  generate(metadata) {
    return this.writeMetadata(metadata.projectMetadata, metadata.dataModelMetadata);
  }

  prepareFieldList(metadata) {
    if (metadata.fields === undefined ||
      metadata.fields == null) {
      return [];
    }

    let fieldIds = Object.keys(metadata.fields);
    let fieldCount = fieldIds.length;
    let fieldList = [];
    for (let i = 0; i < fieldCount; i++) {
      let field = metadata.fields[fieldIds[i]];
      if (field.deleted === undefined ||
        (field.deleted != null && !field.deleted)) {
        field["fieldId"] = fieldIds[i];
        fieldList.push(field);
      }
    }

    return fieldList;
  }

  writeMetadata(projectMetadata, dataModelMetadata) {
    dataModelMetadata.fieldList = this.prepareFieldList(dataModelMetadata);
    let metadataFileName = dataModelMetadata.dataModelName.toLowerCase() + ".data.json";
    console.log(metadataFileName)
    let content = utils.parseTemplate(template.DATA_MODEL_METADATA_JSON_TEMPLATE, dataModelMetadata);
    return utils.writeFileSync(
      path.join(projectMetadata.location, constants.APP_METADATA_DIR),
      metadataFileName, content);
  }

}

module.exports = new DataModelGenerator();