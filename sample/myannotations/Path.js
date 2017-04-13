const {Annotation} = require(__dirname+"/../../");

class Path extends Annotation {
    constructor() {
        super("Path");
    }

    dir() { return this.dir; }
    param() { return this.param; }
}

module.exports = Path;