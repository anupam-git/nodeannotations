const elementType = {
    0: "Class",
    1: "Method",
    2: "Variable"
};

module.exports = class AnnotatedElement {
    constructor(name, type, annotations) {
        this.name = name;
        this.type = type;
        this.annotations = annotations;
    }

    getName() { return this.name; }
    getType() { return elementType[this.type]; }
    getAnnotations() { return this.annotations; }

    setType(name) { this.name = name; }
    setType(type) { this.type = type; }
    setAnnotations(annotations) { this.annotations = annotations; }
};

module.exports.TYPE_CLASS = 0;
module.exports.TYPE_METHOD = 1;
module.exports.TYPE_VARIABLE = 2;