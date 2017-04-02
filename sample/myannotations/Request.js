const Annotation = require(__dirname+"/../../src/Annotation");

class Request extends Annotation {
    constructor() {
        super("Request");

        // console.log("Annotation : Request");
    }
}

module.exports = Request;