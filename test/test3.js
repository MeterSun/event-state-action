const EventEmitter = require('events');

const emitter = new EventEmitter();
/**
 emitter.off(eventName, listener)
 emitter.emit(eventName[, ...args])
 emitter.on(eventName, listener)
 emitter.once(eventName, listener)
 */

// 触发 emit
// 监听 on once
// 解除监听 off

emitter.on('a', () => {
    console.log('a2');
})
emitter.on('b', () => {
    console.log('b2');
})
emitter.on('a', () => {
    console.log('a2');
})

emitter.on('b', () => {
    console.log('b1');
})
emitter.on('a', () => {
    console.log('a1');
    emitter.emit('b')
})
emitter.on('a', () => {
    console.log('a2');
})

emitter.emit('a')

