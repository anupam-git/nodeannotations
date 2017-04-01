const fs = require("fs");
const AnnotatedElement = require(__dirname+"/../AnnotatedElement");

module.exports.parse = (filePath, annotationsPath, cb) => {
    /**
     * Annotation Block REGEX
     * 
     * Matched Block 1 : String containing All Annotations
     * Matched Block 2 : function | class | let | const | var
     * Matched Block 3 : Function / Class / Variable Name
     */
    let annotationBlockRegex = /((?:[\t ]*\* @\w+\(\)[\n\t ]*)+\*\/)[\n\r][\t ]*(function|class|var|let|const) (\w+)/g;

    /**
     * Annotation REGEX
     * 
     * Matched Pattern : Annotation()
     */
    let annotationRegex = /@(\w+)\(\)/g;

    let annotatedFile = fs.readFileSync(filePath, 'utf8');
    let elementType, elementName;
    let matchedBlock, matchedAnnotation;
    let matches = [];
    let err = null;

    while (matchedBlock = annotationBlockRegex.exec(annotatedFile)) {
        let elementAnnotations = [];

        while (matchedAnnotation = annotationRegex.exec(matchedBlock[1])) {
            // console.log("\t\t"+matchedAnnotation)

            try {
                let CustomAnnotation = require(annotationsPath+"/"+matchedAnnotation[1]);
                let cAnnotation = new CustomAnnotation();

                elementAnnotations.push(cAnnotation);
            } catch (e) {
                err = new Error("Undefined Annotation")

                break;
            }
        }

        switch (matchedBlock[2]) {
            case "function":
                elementType = AnnotatedElement.TYPE_METHOD;
                break;
            case "class":
                elementType = AnnotatedElement.TYPE_CLASS;
                break;
            case "let":
            case "const":
            case "var":
                elementType = AnnotatedElement.TYPE_VARIABLE;
                break;
        }

        elementName = matchedBlock[3];

        // console.log("Iteration");
        // console.log("\tAnnotations :");


        let element = new AnnotatedElement(elementName, elementType, elementAnnotations);
        matches.push(element);

        // console.log("\tElement Type : " + elementType);
        // console.log("\tElement Name : " + elementName);
    }

    if (err) {
        cb(err, null);
    } else {
        cb(null, matches);
    }
};