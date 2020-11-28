
class GeneratorFactory {
    constructor(platform, framework) {
        this.platform = platform;
        this.framework = framework;
        this.generator = null;
    }

    getGenerator(){
        switch(this.platform.toUpperCase()){
            case "NODE":
                switch (this.framework.toUpperCase()){
                    case "EXPRESSJS":
                        this.generator = require("./node/express-js/generator")
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }

        return this.generator;
    }

}

module.exports = new GeneratorFactory("NODE", "EXPRESSJS");