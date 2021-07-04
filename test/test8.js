const a = require('..')

a.init('app', 'app').withTag('[start][end]');
a.init('app.first', 'app.first').withTag('[start][end]');
a.init('app.second', 'app.second').withTag('[start][end]');

a.sub('app[@child]', (r, n) => {
    console.log('app[@child]', r, n);
})
a.sub('app.first[#all]', (r, n) => {
    console.log('app.first[#all]', r, n);
})

a.pub('app.first[start]')
a.pub('app.first[end]')
