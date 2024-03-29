import {JsInterpreter} from "../src/js.interpreter";
import {Program} from "../src/node-types";
import * as acorn from 'acorn';

const log = document.getElementById('log')

class ConsoleDecorator {
    log(...args: any[]) {
        log.innerHTML = log.innerHTML + args.join(',') + '<br />';
    }
}

document.getElementById('run-btn').addEventListener('click', () => {
    log.innerHTML = '';
    const code = (document.getElementById('code') as HTMLTextAreaElement).value;
    const ast = acorn.parse(code, { ecmaVersion: 6 });
    console.log(ast);
    const js = new JsInterpreter();
    js.varCache.set('console', new ConsoleDecorator());
    js.run((ast as Program).body);
})