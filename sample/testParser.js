const {AnnotationParser} = require(__dirname+"/../");

try {
    let annotatedElements = AnnotationParser.parse(__dirname+"/annotatedFile.js", __dirname+"/myannotations/");

    console.log("Example to Loop through all the annotated Elements :");

    // Loop through all elements (Class, Method, Variable) that are annotated
    annotatedElements.forEach((annotatedElement) => {
        console.log("\t"+annotatedElement.getName()+" : "+annotatedElement.getType());

        // Loop and Print All annotations of the current Element
        annotatedElement.getAnnotations().forEach((annotation) => {
            console.log("\t\t"+JSON.stringify(annotation));
        });

        console.log();
    });

    console.log("\n\nExample to Loop through the elements which are annotated with @Path() :");

    // Loop through the elements which are annotated with @Request()
    annotatedElements.filterBy("Request").forEach((annotatedElement) => {
        console.log("\t"+annotatedElement.getName()+" : "+annotatedElement.getType());

        // Loop and Print All annotations of the current Element        
        annotatedElement.getAnnotations().forEach((annotation) => {
            console.log("\t\t"+JSON.stringify(annotation));
        });

        console.log();
    });

    console.log("\n\nExample to Loop through the elements which are annotated with @Path():");

    // Loop through the elements which are annotated with @Path()
    annotatedElements.filterBy("Path").forEach((annotatedElement) => {
        console.log("\t"+annotatedElement.getName()+" : "+annotatedElement.getType());

        // Loop and Print the "dir" value of the @Path annotation
        console.log("\t\tdir: "+annotatedElement.getAnnotation("Path").dir);

        console.log();
    });
} catch (err) {
    console.log(err);
}