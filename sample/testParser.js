const AnnotationParser = require(__dirname+"/../").AnnotationParser;

AnnotationParser.parse(
    __dirname+"/annotatedFile.js",
    __dirname+"/myannotations/",
    (err, annotatedElements) => {
        if (err) {
            console.log(err);
        }
        for (let i in annotatedElements) {
            let annotatedElement = annotatedElements[i];
            console.log(annotatedElement.getName()+" : "+annotatedElement.getType());

            let elementAnnotations = annotatedElement.getAnnotations();

            for (let i in elementAnnotations) {
                console.log("\t"+JSON.stringify(elementAnnotations[i]));
            }

            console.log();
        }
    });