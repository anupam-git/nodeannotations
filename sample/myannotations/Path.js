const Annotation = require(__dirname+"/../../src/Annotation");

class Path extends Annotation {
    constructor() {
        super();

        // console.log("Annotation : Path");
    }

    dir() { return this.dir; }
    param() { return this.param; }
}

module.exports = Path;