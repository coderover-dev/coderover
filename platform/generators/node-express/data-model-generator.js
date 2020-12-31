const constants = require('../../constants');
const utils = require('../../utils');
const template = require('./template');
const path = require('path');

class DataModelGenerator {

  generate(metadata) {
    console.log("creating resource blueprint..");
    return this.writeResourceMetadata(metadata.projectMetadata, metadata.resourceMetadata);
  }

  prepareFieldList(resourceMetadata) {
    if (resourceMetadata.fields === undefined ||
      resourceMetadata.fields == null) {
      return [];
    }

    let fieldIds = Object.keys(resourceMetadata.fields);
    let fieldCount = fieldIds.length;
    let fieldList = [];
    for (let i = 0; i < fieldCount; i++) {
      let field = resourceMetadata.fields[fieldIds[i]];
      fieldList.push(field);
    }

    return fieldList;
  }

  writeResourceMetadata(projectMetadata, resourceMetadata) {
    resourceMetadata.fieldList = this.prepareFieldList(resourceMetadata);
    let metadataFileName = resourceMetadata.dataModelName + ".data.json";
    let content = utils.parseTemplate(template.DATA_MODEL_METADATA_JSON_TEMPLATE, resourceMetadata);
    console.log(projectMetadata)
    return utils.writeFileSync(
      path.join(projectMetadata.location, constants.APP_METADATA_DIR),
      metadataFileName, content);
  }

}

module.exports = new DataModelGenerator();