const AnnotationParser = require(__dirname+"/../").AnnotationParser;

AnnotationParser.parse(__dirname+"/annotatedFile.js", (annotatedElements) => {
    for (let i in annotatedElements) {
        let annotatedElement = annotatedElements[i]
        console.log(annotatedElement.getAnnotation())
    }
});