const fs = require('fs');
const path = require('path');
const handlebars = require("handlebars");

module.exports = {
  mkdir,
  writeFile,
  writeFileSync,
  parseTemplate,
  listMetaFiles
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

function writeFileSync(fileLocation, fileName, data) {
  try {
    fs.writeFileSync(path.join(fileLocation, fileName), data);
    return true;
  } catch (err) {
    return false;
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

function listMetaFiles(fileLocation, fileExt) {
  let files = []
  try {
    fs.readdirSync(fileLocation).forEach(file=>{
      if(file.endsWith(fileExt)){
        let fileNameWithoutExt = file.replace(fileExt, "");
        files.push(fileNameWithoutExt);
      }
    })
  } catch (err) {
  }

  return files;
}

function parseTemplate(template, data) {
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
}