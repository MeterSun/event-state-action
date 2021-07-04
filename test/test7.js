// Specific tags

// [#all] listen stateName's all tags

const a = require('..')

a.init('a').withTag('[find]', '[found]', '[lost]');

a.subscribe('a', () => console.log('sub a'));

a.subscribe('a[find]', (s) => { console.log('sub a[find]') });

a.subscribe('a[found]', (s, next) => {
    console.log('sub a[found]');
    //next('[lost]')
});

a.subscribe('a[lost]', (s) => { console.log('sub a[lost]') });

a.subscribe('a[#all]', () => {
    console.log('sub a[#all]');
})

a.publish('a[find]', (_, next) => {
    setTimeout(() => {
        next('[found]')
        next('[lost]')
    }, 1000)
})

// sub a[find]
// sub a[#all]
// sub a[found]
// sub a[#all]
// sub a[lost]
// sub a[#all]