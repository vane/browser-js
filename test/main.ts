import {JsInterpreter} from "../src/js.interpreter";
import {Program} from "../src/node-types";
import * as acorn from 'acorn';

const log = document.getElementById('log')

class ConsoleDecorator {
    log(...args: any[]) {
        log.innerText += args.join(',');
    }
}

document.getElementById('run-btn').addEventListener('click', () => {
    const code = (document.getElementById('code') as HTMLTextAreaElement).value;
    const ast = acorn.parse(code, { ecmaVersion: 5 })
    const js = new JsInterpreter();
    js.varCache.set('console', new ConsoleDecorator())
    js.run((ast as Program).body);
})