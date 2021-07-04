
// Specific tags

// [#all] listen stateName's all tags

const a = require('..')

a.init('def', 'def');
a.init('def.a', 'def.a').withTag('[find][found][lost]');
a.init('def.a.b', 'def.a.b').withTag('[find][found][lost]');


// a.subscribe('def.a[#all]', () => {
//     console.log('sub a[#all]');
// })

// a.sub('def[@child]', () => {
//     console.log('def[@child]');
// })

a.sub('def.a.b[found]', () => {
    console.log('found');
})
a.publish('def.a.b[find]', (_, next) => {
    console.log('1');
    next('[found]')
    console.log('2');
})

// sub a[find]
// sub a[#all]
// sub a[found]
// sub a[#all]
// sub a[lost]
// sub a[#all]