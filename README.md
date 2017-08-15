# yield-list
creat a doubly linked list, using a simple comands.
and have a iterator map too!

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

Example:
```javascript
import list from 'yield-list'

// create from array
const Arr = [1, 2, 3]
const L = list(Arr)

// create using push
const a = {a: 1}
const b = {b: 2}
const L = list()
L.push(a)
L.push(b)

// maps!
const arr = L.map() // [{a: 1}, {b: 2}]
const arr = L.mapReverse() // [{b: 2}, {a: 1}] // No need reverse the array! It's a direct map.

// can make a circular array!
L.makeCircular()

// return a generator function
iterator = L.map(
  x=> x, // function will apply by item
  true) // do a map useind 'yield' by item

iterator.next().value // {a: 1}
iterator.next().value // {b: 2}
```
