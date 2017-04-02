class Annotation {
    constructor(objectOf) {
        this.value = null;
        this.objectOf = objectOf;
    }

    value() { return this.value; }
    objectOf() { return this.objectOf; }

    set(name, value) {
        if (name !== "value" && typeof this[name] !== "function") {
            let err = new Error("Invalid Argument "+name);

            throw err;
        } else {
            this[name] = value;
        }
    }
}

module.exports = Annotation;