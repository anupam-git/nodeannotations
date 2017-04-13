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
    let annotationBlockRegex = /((?:[\t ]*\* @\w+\([\w `~!@#$%^&*()_\-+=|\\}\]{[\"':;?/>.<,]*\)[\n\t ]*)+\*\/)[\n\r][\t ]*(?:(function|class|var|let|const) )*(\w+)/g;

    /**
     * Annotation REGEX
     * 
     * Matched Pattern : Annotation()
     */
    let annotationRegex = /@(\w+)\(([\w `~!@#$%^&*()_\-+=|\\}\]{[\"':;?/>.<,]*)\)/g;

    /**
     * Arguments REGEX
     * 
     * Matched Block 1 : Argument Name
     * Matched Block 2 : Argument Value
     */
    let argsRegex = /(\w+)=\"([\w`~!@#$%^&*()_\-+=|\\}\]{[\"':;?/>.<,]*)\"/g;

    let annotatedFile = fs.readFileSync(filePath, 'utf8');
    let elementType, elementName;
    let matchedBlock, matchedAnnotation, matchedArg;
    let matches = [];
    let err = null;

    while (matchedBlock = annotationBlockRegex.exec(annotatedFile)) {
        let elementAnnotations = [];
        let breakError = false;

        while (matchedAnnotation = annotationRegex.exec(matchedBlock[1])) {
            // console.log("\t\t"+JSON.stringify(matchedAnnotation));
            
            let argsCount = 0;
            
            try {
                let CustomAnnotation = require(annotationsPath+"/"+matchedAnnotation[1]);
                let cAnnotation = new CustomAnnotation();

                try {
                    while (matchedArg = argsRegex.exec(matchedAnnotation[2])) {
                        argsCount++;

                        cAnnotation.set(matchedArg[1], matchedArg[2]);
                    }

                    if (matchedAnnotation[2] == "" || (argsCount == 0 && matchedAnnotation[2] != "")) {
                        let value = matchedAnnotation[2];
                        
                        if(value.startsWith("\"") && value.endsWith("\"")) {
                            value = value.substr(1, value.length-2);
                        }

                        cAnnotation.set("value", value);
                    }
                } catch (e) {
                    err = e;
                    matches = null;
                    breakError = true;

                    break;
                }

                elementAnnotations.push(cAnnotation);
            } catch (e) {
                err = new Error("Cannot Find Annotation "+matchedAnnotation[1]+" ("+annotationsPath+"/"+matchedAnnotation[1]+")");
                breakError = true;
                matches = null;
                
                break;
            }
        }

        switch (matchedBlock[2]) {
            case "function":
            case "":
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

        if (!breakError) {
            if (elementAnnotations.length > 0) {
                let element = new AnnotatedElement(elementName, elementType, elementAnnotations);
                matches.push(element);
            }
        } else {
            break;
        }

        // console.log("\tElement Type : " + elementType);
        // console.log("\tElement Name : " + elementName);
    }

    if (err) {
        throw err;

        return null;
    } else {
        matches.filterBy = (objectOf) => {
            if (objectOf == "" || objectOf == undefined) {
                return matches.filter((e) => {
                    return typeof e != "function";
                });
            } else {
                return matches.filter((e) => {
                    let found = false;

                    for (i in e.annotations) {
                        if (e.annotations[i].objectOf == objectOf) {
                            found = true;
                            break;
                        }
                    }

                    return found;
                });
            }
        };
        
        return matches;
    }
};