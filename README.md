# browser-js

### Description
javascript interpreter in javascript - poc  
I saw that [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter) is single file so grabbed example fibonacci 
and wrote [arcon](https://github.com/acornjs/acorn) parser from scratch.

### Basic tests
```bash
npm run test

> @szczepano/browser-js@0.0.1 test
> jest

 PASS  src/decorators/loop.test.ts
 PASS  src/visitors/array.test.ts
 PASS  src/js.interpreter.test.ts
 PASS  src/decorators/condition.test.ts

Test Suites: 4 passed, 4 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        0.781 s, estimated 1 s
Ran all test suites.
```

### Example that runs in browser with custom global function
```bash
npm run build:html
```
code is generated in dist/html
```bash
cd dist/html
python3 -m http.server 
```
open [http://localhost:8000](http://localhost:8000)

### to enable debug log - change
```bash
Constraints.IS_DEBUG = true
```
