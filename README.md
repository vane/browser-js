# browser-js

### Description
javascript interpreter in javascript - poc  
I saw that [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter) is single file so grabbed example fibonacci 
and wrote [arcon](https://github.com/acornjs/acorn) parser from scratch.

### Basic test to count fibonacci numbers
```bash
npm run test

> @szczepano/browser-js@0.0.1 test
> jest

 PASS  src/js.interpreter.test.ts
  js.interpreter.test
    ✓ calculate fibonacci (5 ms)
    ✓ array->set-index (1 ms)
    ✓ array->assign a[0] += 1
    ✓ array->assign  a[0] -= 1 (1 ms)
    ✓ array->assign - a[0] = a[0] - 1
    ✓ array->assign - a[0] = 1 - a[0] (1 ms)
    ✓ array->assign - a[0] = a[0] + a[0]
    ✓ array->assign - a[0] += a[0]

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.789 s, estimated 1 s
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
