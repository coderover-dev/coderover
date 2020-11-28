let packageJsonTemplate = `
{
    "name": {{projectName}},
    "version": "0.0.0",
    "private": true,
    "scripts": {

    },
    "dependencies": {
        "cookie-parser": "~1.4.4",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "http-errors": "~1.6.3",
        "jade": "~1.11.0",
        "morgan": "~1.9.1"
    }
}
`


class ProjectGenerator {

    generate(projectMetaData){
        console.log("ProjectGenerator")
        console.log(projectMetaData)
    }

    generatePackageJson(projectMetaData){
        console.log(packageJsonTemplate)
    }

}

module.exports = new ProjectGenerator();