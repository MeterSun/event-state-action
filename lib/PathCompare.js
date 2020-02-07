
// PathCompare
function equal(pathA, pathB) {
    return pathA.join() === pathB.join();
}

function ArootBchild(pathA, pathB) {
    if (pathA.length >= pathB.length) {
        return false;
    } else {
        for (let i = 0; i < pathA.length; i++) {
            if (pathA[i] !== pathB[i])
                return false;
        }
        return true;
    }
}

// a = ['a', 'b', 'b']
// b = ['a', 'b', 'b']
// c = ['f',]
// d = ['a',]

// console.log(equal(a, b)) // true
// console.log(equal(a, d)) // false
// console.log(ArootBchild(a, b)) // false
// console.log(ArootBchild(a, d)) // false
// console.log(ArootBchild(d, a)) // true
// console.log(ArootBchild(a, c)) // false
// console.log(ArootBchild(c, a)) // false


module.exports = {
    equal,
    ArootBchild
};