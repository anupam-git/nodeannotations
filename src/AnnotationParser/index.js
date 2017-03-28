const fs = require("fs");
const AnnotatedElement = require(__dirname+"/../AnnotatedElement");

module.exports.parse = (filePath, cb) => {
    let annotationRegex = /\* @(\w+)\(\)/g;
    let annotatedFile = fs.readFileSync(filePath, 'utf8');
    let match;
    let matches = [];

    while (match = annotationRegex.exec(annotatedFile)) {
        let element = new AnnotatedElement(AnnotatedElement.TYPE_METHOD, match[1]);
        matches.push(element);
    }

    cb(matches);
};