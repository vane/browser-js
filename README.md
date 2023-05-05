# browser-js

### Description
javascript interpreter in javascript - poc

### # debug log - change
```bash
Constraints.IS_DEBUG = true
```

### Basic test to count fibonacci numbers
```bash
npm run test

> browser-js@0.0.1 test
> jest

 PASS  src/js.interpreter.test.ts
  js.interpreter.test
    ✓ calculate fibonacci (5 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.789 s, estimated 2 s
```

### Example with custom global function
```bash
npm run build:html
```
code is generated in dist/html
```bash
cd dist/html
python3 -m http.server 
```
open [http://localhost:8000](http://localhost:8000)