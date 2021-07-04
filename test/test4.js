// pub 1 sub 1 pub 2 sub 2

const a = require('..')

a.init('a');
a.init('b');
a.init('c');

a.subscribe('c', () => console.log('sub c 1'));
a.subscribe('a', () => {
    console.log('sub a 1')
    a.publish('b');
    a.publish('c');
});
a.subscribe('b', () => console.log('sub b 1'));
a.subscribe('a', () => console.log('sub a 2'));
a.subscribe('c', () => console.log('sub c 2'));
a.subscribe('a', () => console.log('sub a 3'));
a.subscribe('b', () => console.log('sub b 2'));
a.publish('a')
