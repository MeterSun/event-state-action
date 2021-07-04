// publish with tags
// with next(param only tag)

const a = require('..')

// a.init('a').withTag('[find]', '[found]', '[lost]');
// or
a.init('a').withTag('[find][found][lost]');

a.subscribe('a', () => console.log('sub a'));

a.subscribe('a[find]', (s) => console.log('sub a[find]'));

a.subscribe('a[found]', (s, next) => { console.log('sub a[found]'); next('[lost]') });

a.subscribe('a[lost]', (s) => console.log('sub a[lost]'));



a.publish('a');
a.publish('a[find]', (_, next) => setTimeout(() => { next('[found]') }, 1000))

// sub a
// sub a[find]
// sub a[found]
// sub a[lost]
