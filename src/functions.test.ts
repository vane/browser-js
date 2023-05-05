import { JsInterpreter } from './js.interpreter';
import { Program } from './node-types';
import acorn from 'acorn';

describe('functions.test', () => {
  test('declare function foo', () => {
    const code = `
function foo() {
    
}
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('foo').name).toEqual('foo');
  });

  test('declare function foo with arguments', () => {
    const code = `
function foo(a, b) {
    
}
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('foo').params).toEqual(['a', 'b']);
  });

  test('invoke function foo with arguments', () => {
    const code = `
function foo(a, b) {
    return a + b;
}
var c = foo(2, 2);
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('c')).toEqual(4);
  });
});
