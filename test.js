const a = require('.');
a.init("switch", false);
a.init("switch1", true);
a.init('switch.letter', true);

a.subscribe("switch", (p, n) => { console.log('[switch to]', n) });
a.subscribe("switch1", (p, n) => { console.log('[switch1 to]', n) });
a.subscribe("switch.letter", (p, n) => { console.log('[switch.letter to]', n) });

console.log('[switch1 is]', a.get("switch1"));
a.publish("switch1", true);
console.log('[switch1 is]', a.get("switch1"));

console.log('[switch.letter is]', a.get("switch.letter"));
a.publish("switch.letter", s => !s);
console.log('[switch.letter is]', a.get("switch.letter"));

console.log('[switch is]', a.get("switch"));
a.publish("switch", true);
console.log('[switch is]', a.get("switch"));

a.subscribe("switch[on]", (p, n) => {
    console.log('[switch to on]', n)
});
a.publish("switch[on]", true);
