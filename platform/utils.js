const fs = require('fs');
const path = require('path');
const handlebars = require("handlebars");

module.exports = {
  mkdir,
  writeFile,
  parseTemplate
}

function mkdir(dirLocation, dirName, callback) {
  try {
    fs.mkdirSync(path.join(dirLocation, dirName));
    if (callback != null) {
      callback(false);
    }
  } catch (err) {
    if (callback != null) {
      callback(true);
    }
  }
}

function writeFile(fileLocation, fileName, data, callback) {
  try {
    fs.writeFileSync(path.join(fileLocation, fileName), data);
    if (callback != null) {
      callback(false);
    }
  } catch (err) {
    if (callback != null) {
      callback(true);
    }
  }
}

function parseTemplate(template, data) {
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
}