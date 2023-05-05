# browser-js

### Description
javascript interpreter in javascript - poc  
I saw that [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter) is single file so grabbed example fibonacci 
and wrote [acorn](https://github.com/acornjs/acorn) parser from scratch.

### Run in browser
visit page [https://vane.github.io/browser-js/](https://vane.github.io/browser-js/)

### Basic tests
```bash
npm run test

> @szczepano/browser-js@0.0.1 test
> jest

 PASS  src/js.interpreter.test.ts
 PASS  src/visitors/array.test.ts
 PASS  src/decorators/loop.test.ts
 PASS  src/functions.test.ts
 PASS  src/decorators/condition.test.ts

Test Suites: 5 passed, 5 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        1.336 s, estimated 2 s
Ran all test suites.
```

### Build docs
```bash
npm run build:html
``` 

### Enable debug log
```bash
Constraints.IS_DEBUG = true
```
