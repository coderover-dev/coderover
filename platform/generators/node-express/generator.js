const baseBlueprintGenerator = require('./base-blueprint-generator');
const dataModelGenerator = require('./data-model-generator');

module.exports = {
  getBaseBlueprintGenerator: () => {
    return baseBlueprintGenerator;
  },
  getDataModelGenerator: () => {
    return dataModelGenerator;
  }
}