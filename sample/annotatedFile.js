/**
 * @Request("/controller/endpoint/param")
 * @Path(dir="/home/anupam", param="`~!@#$%^&*()_-+=|\\}]{[\"':;?/>.<,")
 */
function test() {
    console.log("In Function test");
}

/**
 * @Request()
 */
class Test {
    constructor() {
        /**
         * @Request()
         */
        let a;

        /**
         * @Path()
         */
        const b;

        /**
         * @Request()
         */
        var c;
    }
}