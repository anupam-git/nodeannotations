class Annotation {
    constructor(objectOf) {
        if (objectOf == undefined) {
            throw new Error("Call to super(String annotationName) is required ");
        }

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