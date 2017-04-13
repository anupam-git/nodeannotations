const {Annotation} = require(__dirname+"/../../");

class Request extends Annotation {
    constructor() {
        super("Request");
    }
}

module.exports = Request;