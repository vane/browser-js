import { JsInterpreter } from './js.interpreter';
import { Program } from './node-types';
import acorn from 'acorn';

describe('js.interpreter.test', () => {
  test('calculate fibonacci', () => {
    const code = `
// fibonacci code from https://neil.fraser.name/software/JS-Interpreter/
var result = [];
function fibonacci(n, output) {
  var a = 1, b = 1, sum;
  for (var i = 0; i < n; i++) {
    output.push(a);
    sum = a + b;
    a = b;
    b = sum;
  }
}
fibonacci(16, result);
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('result').arr).toEqual(['1', '1', 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]);
  });
});
