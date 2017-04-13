# NodeAnnotations
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/anupam-git/nodeannotations/master/LICENSE) [![npm version](https://badge.fury.io/js/nodeannotations.svg)](https://badge.fury.io/js/nodeannotations) [![GitHub stars](https://img.shields.io/github/stars/anupam-git/nodeannotations.svg)](https://github.com/anupam-git/nodeannotations/stargazers)


## Table of Contents
* [Getting Started](#getting-started)
* [Class : Annotation(objectOf)](#class--annotation)
    * [Annotation.value](#annotationvalue)
    * [Annotation.[param]](#annotationparam)
    * [Annotation.objectOf](#annotationobjectof)
* [Class : AnnotatedElement(name, type, annotations)](#class--annotatedelement)
    * [AnnotatedElement.getName()](#annotatedelementgetname)
    * [AnnotatedElement.getType()](#annotatedelementgettype)
    * [AnnotatedElement.getAnnotation(objectOf)](#annotatedelementgetannotationobjectof)
    * [AnnotatedElement.getAnnotations()](#annotatedelementgetannotations)
    * [AnnotatedElement.TYPE_CLASS](#annotatedelementtype_class)
    * [AnnotatedElement.TYPE_METHOD](#annotatedelementtype_method)
    * [AnnotatedElement.TYPE_VARIABLE](#annotatedelementtype_variable)
* [AnnotationParser](#annotationparser)
    * [AnnotationParser.parse(filePath, annotationsPath, callback)](#annotationparserparsefilepath-annotationspath-callback)

# Getting Started
* Clone the example repository  
`git clone git@github.com:anupam-git/nodeannotations-example.git`
* Install Dependencies  
`npm install`
* Test the Parser  
`node testParser.js`

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
Stores the type of the of the `Annotation`
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
`annotatedElements` is the result returned after parsing the file with path `filePath`. `annotatedElements` is the array of all the elements that are Annotated with the Annotations available at `annotationsPath`. The Array Object also has method [`filterBy(objectOf)`](#)

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