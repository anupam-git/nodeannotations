# NodeAnnotations
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/anupam-git/nodeannotations/master/LICENSE) [![npm version](https://badge.fury.io/js/nodeannotations.svg)](https://badge.fury.io/js/nodeannotations) [![GitHub stars](https://img.shields.io/github/stars/anupam-git/nodeannotations.svg)](https://github.com/anupam-git/nodeannotations/stargazers)


# Table of Contents
* [Getting Started](#getting-started)
* [How To](#how-to)
    * [Installing `nodeannotations`](#installing-nodeannotations)
    * [Creating a Custom Annotation](#creating-a-custom-annotation)
    * [Creating an Annotated File using Custom Annotations](#creating-an-annotated-file-using-custom-annotations)
    * [Parsing an Annotated File](#parsing-an-annotated-file)
* [Class : Annotation](#class--annotation)
    * [Annotation.value](#annotationvalue)
    * [Annotation.[param]](#annotationparam)
    * [Annotation.objectOf](#annotationobjectof)
* [Class : AnnotatedElement](#class--annotatedelement)
    * [AnnotatedElement.getName()](#annotatedelementgetname)
    * [AnnotatedElement.getType()](#annotatedelementgettype)
    * [AnnotatedElement.getAnnotation(objectOf)](#annotatedelementgetannotationobjectof)
    * [AnnotatedElement.getAnnotations()](#annotatedelementgetannotations)
    * [AnnotatedElement.TYPE_CLASS](#annotatedelementtype_class)
    * [AnnotatedElement.TYPE_METHOD](#annotatedelementtype_method)
    * [AnnotatedElement.TYPE_VARIABLE](#annotatedelementtype_variable)
* [AnnotationParser](#annotationparser)
    * [AnnotationParser.parse(filePath, annotationsPath)](#annotationparserparsefilepath-annotationspath)

# Getting Started
* Clone the example repository  
SSH : `git clone git@github.com:anupam-git/nodeannotations-example.git`  
HTTPS : `git clone https://github.com/anupam-git/nodeannotations-example.git`
* Install Dependencies  
`npm install`
* Test the Parser  
`node testParser.js`

# How to
### Installing `nodeannotations`
    npm install --save nodeannotations

### Creating a Custom Annotation
Create the annotations and place them in a folder, say `[project root]/myannotations`  

**_myannotations/Path.js_**
```javascript
const {Annotation} = require("nodeannotations");

class Path extends Annotation {
    constructor() {
        super("Path");
    }

    dir() { return this.dir; }
    param() { return this.param; }
}

module.exports = Path;
```

**_myannotations/Request.js_**
```javascript
const {Annotation} = require("nodeannotations");

class Request extends Annotation {
    constructor() {
        super("Request");
    }
}

module.exports = Request;
```

### Creating an Annotated File using Custom Annotations
**_annotatedFile.js_**
```javascript
/**
 * @Request("/controller/endpoint/param")
 * @Path(dir="/home/user1", param="somevalue")
 */
function test() {
    // Function Body
}

/**
 * @Request("/controller1/endpoint1/param1")
 */
class Test {
    constructor() {
        /**
         * @Request("/controller2/endpoint2/param2")
         */
        let a;

        /**
         * @Path(dir="/home/user2", param="someothervalue")
         */
        const b;

        /**
         * @Request("/controller3/endpoint3/param3")
         */
        var c;
    }

    /**
     * @Path(dir="/home", param="test123")
     */
    testFunction(req) {
        // Function Body
    }
}
```
### Parsing an Annotated File
Parse the annotated file by calling `parse` function with arguments 
* `filePath` : Path of the Annotated File to be Parsed. In this case, it should be the absolute path to the `annotatedFile.js` file.
* `annotationsPath` : Path of the directory containing the Annotations. In this case, it should be the absolute path to the `myannotations` directory.
```javascript
const {AnnotationParser} = require("nodeannotations");

try {
    let annotatedElements = AnnotationParser.parse(__dirname+"/annotatedFile.js", __dirname+"/myannotations/");

    console.log("Example to Loop through all the annotated Elements :");

    // Loop through all elements (Class, Method, Variable) that are annotated
    /*
        OUTPUT :
            test : Method
                {"value":"","objectOf":"Simple"}
                {"value":"/controller/endpoint/param","objectOf":"Request"}
                {"value":null,"objectOf":"Path","dir":"/home/user1","param":"somevalue"}

            Test : Class
                    {"value":"/controller1/endpoint1/param1","objectOf":"Request"}

            a : Variable
                    {"value":"/controller2/endpoint2/param2","objectOf":"Request"}

            b : Variable
                    {"value":null,"objectOf":"Path","dir":"/home/user2","param":"someothervalue"}

            c : Variable
                    {"value":"/controller3/endpoint3/param3","objectOf":"Request"}

            testFunction : Method
                    {"value":null,"objectOf":"Path","dir":"/home","param":"test123"}
    */
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
    /*
        OUTPUT :
            test : Method
                {"value":"","objectOf":"Simple"}
                {"value":"/controller/endpoint/param","objectOf":"Request"}
                {"value":null,"objectOf":"Path","dir":"/home/user1","param":"somevalue"}

            Test : Class
                    {"value":"/controller1/endpoint1/param1","objectOf":"Request"}

            a : Variable
                    {"value":"/controller2/endpoint2/param2","objectOf":"Request"}

            c : Variable
                    {"value":"/controller3/endpoint3/param3","objectOf":"Request"}
    */
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
    /*
        OUTPUT :
            test : Method
                dir: /home/user1

            b : Variable
                    dir: /home/user2

            testFunction : Method
                    dir: /home
    */
    annotatedElements.filterBy("Path").forEach((annotatedElement) => {
        console.log("\t"+annotatedElement.getName()+" : "+annotatedElement.getType());

        // Loop and Print the "dir" value of the @Path annotation
        console.log("\t\tdir: "+annotatedElement.getAnnotation("Path").dir);

        console.log();
    });
} catch (err) {
    console.log(err);
}
```
### Find the Complete Example Here : [nodeannotations-example](https://github.com/anupam-git/nodeannotations-example)

# Class : Annotation
### `Annotation.value`
Stores the `value` of the `Annotation`
```javascript
/**
 * @Annotation("someValue")
 */
function test() {
    //Function Body
}
```
`value` will have the data `someValue` for the function `test()`


### `Annotation.[param]`
Stores the value of the parameter `param` of the `Annotation`
```javascript
/**
 * @Annotation(param1="someValue1", param2="someValue2")
 */
function test() {
    //Function Body
}
```
`param1` will have the data `someValue1` for the function  and `param2` will have the data `someValue2` for the function `test()`


### `Annotation.objectOf`
Stores the type of the `Annotation`
```javascript
/**
 * @Annotation("someValue")
 */
function test() {
    //Function Body
}
```
`objectOf` will have the data `Annotation` for the function `test()`

# Class : AnnotatedElement
### `AnnotatedElement.getName()`
Returns the name of the Element
```javascript
/**
 * @Annotation("someValue")
 */
function test() {
    //Function Body
}
```
`getName()` will return `"test"` for the function `test()`


### `AnnotatedElement.getType()`
Returns the Type of the Element (Variable, Method or Class)
```javascript
/**
 * @Annotation("someValue")
 */
function test() {
    //Function Body
}
```
`getType()` will return `"Method"` for the function `test()`


### `AnnotatedElement.getAnnotation(objectOf)`
Returns the `Annotation` object which is an instance of `objectOf`
```javascript
/**
 * @Annotation("someValue")
 */
function test() {
    //Function Body
}
```
`getAnnotation("Annotation")` will return `{"value":"someValue","objectOf":"Annotation"}` for the function `test()`


### `AnnotatedElement.getAnnotations()`
Returns all the annotations of an `AnnotatedElement`
```javascript
/**
 * @Annotation("someValue")
 * @AnotherAnnotation("someMoreValue")
 */
function test() {
    //Function Body
}
```
`getAnnotations()` will return `[{"value":"someValue","objectOf":"Annotation"}, {"value":"someMoreValue","objectOf":"AnotherAnnotation"}]` for the function `test()`

### `AnnotatedElement.TYPE_CLASS`
Constant value `0` representing the `AnnotatedElement` as a `Class`


### `AnnotatedElement.TYPE_METHOD`
Constant value `1` representing the `AnnotatedElement` as a `Method`


### `AnnotatedElement.TYPE_VARIABLE`
Constant value `2` representing the `AnnotatedElement` as a `Variable`


# AnnotationParser
### `AnnotationParser.parse(filePath, annotationsPath)`
Parses a file for Annotations and returns [`annotatedElements`](#annotatedelements) object.
* `filePath` is the Absolute Path of File to be Parsed for Annotations.
* `annotationsPath` is the Absolute Path of Directory containing all the `Annotation` Classes.

### `annotatedElements`
`annotatedElements` is the result returned after parsing the file with path `filePath`. `annotatedElements` is the array of all the elements that are Annotated with the Annotations available at `annotationsPath`. The Array Object also has method [`filterBy(objectOf)`](#filterbyobjectof)

### `filterBy(objectOf)`
`filterBy` returns the array of Elements Annotated with `objectOf` type of `Annotation`

### Example
```javascript
let annotatedElements = AnnotationParser.parse(__dirname+"/annotatedFile.js", __dirname+"/myannotations/");

annotatedElements.forEach((annotatedElement) => {
    console.log("\t"+annotatedElement.getName()+" : "+annotatedElement.getType());

    // Loop and Print All annotations of the current Element
    annotatedElement.getAnnotations().forEach((annotation) => {
        console.log("\t\t"+JSON.stringify(annotation));
    });

    console.log();
});

// Loop through the elements which are annotated with @Annotation()
annotatedElements.filterBy("Annotation").forEach((annotatedElement) => {
    console.log("\t"+annotatedElement.getName()+" : "+annotatedElement.getType());

    // Loop and Print All annotations of the current Element        
    annotatedElement.getAnnotations().forEach((annotation) => {
        console.log("\t\t"+JSON.stringify(annotation));
    });

    console.log();
});
```