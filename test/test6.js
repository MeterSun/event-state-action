// Specific tags

// [@child] listen all child stateName

const a = require('..')

a.init('a.b.c');
a.init('a.b');
a.init('a');

a.sub('a.b.c', () => console.log('sub a.b.c'));
a.sub('a.b', () => console.log('sub a.b'));
a.sub('a', () => console.log('sub a'));

a.sub('a.b[@child]', () => console.log('sub a.b[@child]'));
a.sub('a[@child]', () => console.log('sub a[@child]'));

a.pub('a.b.c')

// sub a.b.c
// sub a.b[@child]
// sub a[@child]

