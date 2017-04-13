/**
 * @Simple()
 * @Request("/controller/endpoint/param")
 * @Path(dir="/home/user1", param="somevalue")
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

    }
}