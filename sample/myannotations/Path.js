const Annotation = require(__dirname+"/../../src/Annotation");

class Path extends Annotation {
    constructor() {
        super("Path");

        // console.log("Annotation : Path");
    }
}

module.exports = Path;