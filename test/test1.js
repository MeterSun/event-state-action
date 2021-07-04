// publish and subscribe
const a = require('..');

a.init("form")

const removehandle = a.subscribe("form", () => {
    console.log("subscribe form")
})

a.publish("form");

removehandle()

a.publish("form");
