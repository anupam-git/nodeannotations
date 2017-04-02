const AnnotationParser = require(__dirname+"/../").AnnotationParser;
const Request = require(__dirname+"/myannotations/Request");

AnnotationParser.parse(
    __dirname+"/annotatedFile.js",
    __dirname+"/myannotations/",
    (err, annotatedElements) => {
        if (err) {
            console.log(err);
        } else {
            for (let i in annotatedElements) {
                if (typeof annotatedElements[i] != "function") {        // TODO : Improve this feature
                    let annotatedElement = annotatedElements[i];
                    console.log(annotatedElement.getName()+" : "+annotatedElement.getType());

                    let elementAnnotations = annotatedElement.getAnnotations();

                    for (let i in elementAnnotations) {
                        console.log("\t"+JSON.stringify(elementAnnotations[i]));
                    }

                    console.log();
                }
            }
        }
    });