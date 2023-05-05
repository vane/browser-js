import { JsInterpreter } from '../js.interpreter';
import { Program } from '../node-types';
import acorn from 'acorn';

describe('loop.test', () => {

    test('loop for', () => {
        const code = `
let a = 0;
for (let i = 0;i<10;i++) {
 a += i;
}
`;
        const ast = acorn.parse(code, { ecmaVersion: 6 });
        const js = new JsInterpreter();
        js.run((ast as Program).body);
        expect(js.varCache.get('a')).toEqual(45)
    });


    test('loop while', () => {
        const code = `
let a = 0;
let i = 0;
while (i < 10) {
    a += i;
    i++;
}
`;
        const ast = acorn.parse(code, { ecmaVersion: 6 });
        const js = new JsInterpreter();
        js.run((ast as Program).body);
        expect(js.varCache.get('a')).toEqual(45)
    });
});
