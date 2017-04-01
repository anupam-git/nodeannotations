/**
 * @Simple()
 * @Request("/controller/endpoint/param")
 * @Path(dir="/home/anupam", param="`~!@#$%^&*()_-+=|\\}]{[\"':;?/>.<,")
 */
function test() {
    console.log("In Function test");
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
         * @Path(dir="/home/anupam1", param="`~!@#$%^&*()_-+=|\\}]{[\"':;?/>.<,sagyud")
         */
        const b;

        /**
         * @Request("/controller3/endpoint3/param3")
         */
        var c;
    }
}