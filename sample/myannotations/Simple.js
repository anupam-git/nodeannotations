const Annotation = require(__dirname+"/../../src/Annotation");

class Simple extends Annotation {
    constructor() {
        super("Simple");

        // console.log("Annotation : Request");
    }
}

module.exports = Simple;