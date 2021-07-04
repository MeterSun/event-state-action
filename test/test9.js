const a = require('..')

a.pub = function (eventName, r) {
    console.log(eventName)
    a.publish(eventName, r)
}
a.init('s')
a.init('s.im.r', false)
a.init('s.lo.r', false)


a.sub('s[@child]', function () {
    console.log('c', this.eventName);
})

a.pub('s.im.r')
