const AnnotationParser = require(__dirname+"/../").AnnotationParser;
const Request = require(__dirname+"/myannotations/Request");

try {
    let annotatedElements = AnnotationParser.parse(__dirname+"/annotatedFile.js", __dirname+"/myannotations/");

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
} catch (err) {
    console.log(err);
}