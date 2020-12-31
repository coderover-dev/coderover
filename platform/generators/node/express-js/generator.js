const baseBlueprintGenerator = require('./base-blueprint-generator');
const resourceGenerator = require('./resource-generator');

module.exports = {
  getBaseBlueprintGenerator: () => {
    return baseBlueprintGenerator;
  },
  getResourceGenerator: () => {
    return resourceGenerator;
  }
}