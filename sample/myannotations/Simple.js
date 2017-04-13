const {Annotation} = require(__dirname+"/../../");

class Simple extends Annotation {
    constructor() {
        super("Simple");
    }
}

module.exports = Simple;