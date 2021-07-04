```js
class ESA 
    init(stateName)
    init(stateName, initialState)
    init(stateName).withTag(tag1, tag2)
    init(stateName, initialState).withTag(...tags)

    get(stateName)
    
    publish(eventName)
    publish(eventName, newState)
    publish(eventName, oldState => newState)
    publish(eventName, (oldState, next) => newState)
    
    subscribe(eventName, newState => { })
    subscribe(eventName, (newState, next) => { })

class State
    constructor(initialState)
    addTag()
    valueOf()
    exec()
```

// ObjTree =
// {
//     root: TreeNode,
//     name: 'string',
//     path: 'Array',
//     pathName: 'string',
//     children: [
//         // ObjTree
//         { root: TreeNode, children: [] },
//         { root: TreeNode, children: [] },
//         { root: TreeNode, children: [] },
//         { root: TreeNode, children: [] },
//         { root: TreeNode, children: [] },
//     ]
// }
