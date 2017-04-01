class Annotation {
    constructor() {
        this.value = null;
    }

    value() { return this.value; }

    set(name, value) {
        if (name !== "value" && typeof this[name] !== "function") {
            throw new Error("Invalid Argument")
        } else {
            this[name] = value;
        }
    }
}

module.exports = Annotation;