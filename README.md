# event-state-action

event-state-action  is a  publish-subscribe library written in JavaScript.

## Start

```sh
npm i https://github.com/MeterSun/event-state-action.git
```



```js
import state from "event-state-action";
// or
const state =  require("event-state-action");
```



## Examples

1

```js
state.init("switch", false)
state.subscribe("switch", (prevState, nextState) => {
    console.log('[switch to]', nextState)
})
state.publish("switch", true)
// [switch to] true

state.publish("switch", s => !s)
// [switch to] false

```



