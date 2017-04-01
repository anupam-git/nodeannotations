class Annotation {
    constructor() {
        this.value = null;
    }

    value() { return this.value; }

    set(name, value) { this[name] = value; }
}

module.exports = Annotation;