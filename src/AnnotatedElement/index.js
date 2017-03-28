module.exports = class AnnotatedElement {
    constructor(type, annotation) {
        this.type = type;
        this.annotation = annotation;
    }

    getType() { return this.type; }
    getAnnotation() { return this.annotation; }

    setType(type) { this.type = type; }
    setAnnotation(annotation) { this.annotation = annotation; }
};

module.exports.TYPE_CLASS = 0;
module.exports.TYPE_METHOD = 1;
module.exports.TYPE_PARAMETER = 2;