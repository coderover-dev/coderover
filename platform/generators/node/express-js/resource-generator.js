const constants = require('../../../constants');
const utils = require('../../../utils');
const template = require('./template');
const path = require('path');

class ResourceGenerator {

  generate(projectMetadata, resourceMetadata) {
    console.log("creating resource blueprint..");
    this.writeResourceMetadata(projectMetadata, resourceMetadata);
  }

  prepareFieldList(resourceMetadata) {
    let fieldCount =
      (resourceMetadata.fields === undefined ||
        resourceMetadata.fields == null) ? 0 : resourceMetadata.fields;
    let fieldListStr = "";
    for (let i = 0; i < fieldCount; i++) {
      let fieldStr = utils.parseTemplate(
        template.FIELD_METADATA_JSON_TEMPLATE, resourceMetadata.fields[i]);
      fieldListStr = fieldListStr + fieldStr;
      if (i < fieldCount - 1) {
        fieldListStr = fieldListStr + ",";
      }
    }

    return fieldListStr;
  }

  writeResourceMetadata(projectMetadata, resourceMetadata) {
    resourceMetadata.fieldsStr = this.prepareFieldList(resourceMetadata);
    let metadataFileName = resourceMetadata.resourceName + ".json";
    let content = utils.parseTemplate(template.RESOURCE_METADATA_JSON_TEMPLATE, resourceMetadata);
    utils.writeFile(path.join(
      projectMetadata.location, constants.APP_METADATA_DIR), metadataFileName, content,
      (error) => {
        if (!error) {
          console.log(metadataFileName + ' created.');
        }
      });
  }

}

module.exports = new ResourceGenerator();