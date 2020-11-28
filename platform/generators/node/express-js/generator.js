const projectGenerator = require('./project-generator');

module.exports = {
    getProjectGenerator: () => {
        return projectGenerator;
    }
}