import { JsInterpreter } from '../js.interpreter';
import { Program } from '../node-types';
import acorn from 'acorn';

describe('condition.test', () => {
  test('condition if', () => {
    const code = `
let a = 1;
let b = 2;
if (a+b === 3 || a-b == -1 && a < b) {
    b = 10;
}
`;
    const ast = acorn.parse(code, { ecmaVersion: 6 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('b')).toEqual('10');
  });
  test('condition if->else if->else', () => {
    const code = `
let a = 1;
let b = 2;
if (a+b === 3 || a-b == -1 && a < b) {
    var c = [];
} else if (a*b === 2) {
    var d = [];
} else {
    var e = [];
}
`;
    const ast = acorn.parse(code, { ecmaVersion: 6 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
  });

  test('condition if->else', () => {
    const code = `
let a = 1;
let b = 2;
if (a+b === 3 || a-b == -1 && a < b) {
    var c = [];
} else {
    var e = [];
}
`;
    const ast = acorn.parse(code, { ecmaVersion: 6 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
  });
});
