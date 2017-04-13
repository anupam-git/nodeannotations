const AnnotationParser = require(__dirname+"/../").AnnotationParser;
const Request = require(__dirname+"/myannotations/Request");

try {
    let annotatedElements = AnnotationParser.parse(__dirname+"/annotatedFile.js", __dirname+"/myannotations/");

    annotatedElements.forEach((annotatedElement) => {
        console.log(annotatedElement.getName()+" : "+annotatedElement.getType());

        annotatedElement.getAnnotations().forEach((annotation) => {
            console.log("\t"+JSON.stringify(annotation));
        });

        console.log();
    });
} catch (err) {
    console.log(err);
}