import { JsInterpreter } from '../js.interpreter';
import { Program } from '../node-types';
import acorn from 'acorn';

describe('array.test', () => {

  test('array->set-index', () => {
    const code = `var a = [];
      a.push(1);
      a[0] = 10;
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual(['10']);
  });

  test('array->assign a[0] += 1', () => {
    const code = `var a = [];
      a.push(1);
      a[0] += 1;
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual([2]);
  });

  test('array->assign  a[0] -= 1', () => {
    const code = `var a = [];
      a.push(3);
      a[0] -= 1;
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual([2]);
  });

  test('array->assign - a[0] = a[0] - 1', () => {
    const code = `var a = [];
      a.push(3);
      a[0] = a[0] - 1;
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual([2]);
  });

  test('array->assign - a[0] = 1 - a[0]', () => {
    const code = `var a = [];
      a.push(3);
      a[0] = 1 - a[0];
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual([-2]);
  });

  test('array->assign - a[0] = a[0] + a[0]', () => {
    const code = `var a = [];
      a.push(3);
      a[0] = a[0] + a[0];
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual([6]);
  });

  test('array->assign - a[0] += a[0]', () => {
    const code = `var a = [];
      a.push(3);
      a[0] += a[0];
`;
    const ast = acorn.parse(code, { ecmaVersion: 5 });
    const js = new JsInterpreter();
    js.run((ast as Program).body);
    expect(js.varCache.get('a').arr).toEqual([6]);
  });
});
