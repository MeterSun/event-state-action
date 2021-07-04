const a = require('..');

a.init("switch", false).withTag('[on]');
a.init('switch.letter', true);

a.subscribe("switch", n => {
    console.log('[switch to]', n)
});
a.subscribe("switch.letter", n => {
    console.log('[switch.letter to]', n)
});


console.log('[switch.letter is]', a.get("switch.letter"));
a.publish("switch.letter", s => !s);
console.log('[switch.letter is]', a.get("switch.letter"));

console.log('[switch is]', a.get("switch"));
a.publish("switch", true);
console.log('[switch is]', a.get("switch"));

a.subscribe("switch[on]", n => {
    console.log('[switch to on]', n)
});
a.publish("switch[on]", true);
