import { BinaryVisitor } from '../visitors/binary.visitor';
import { DoWhileStatement } from '../node-types';
import { JsInterpreter } from '../js.interpreter';
import { Logger } from '../logger';

export class LoopDoWhileDecorator {
  constructor(private loop: DoWhileStatement, private ctx: JsInterpreter) {}

  run() {
    Logger.debug('LoopDoWhileDecorator->start');
    const js = new JsInterpreter(this.loop.type, this.ctx);
    let i = 0;
    do {
      js.run(this.loop.body.body);
      i++;
    } while (BinaryVisitor.visit(this.loop.test, js.varCache));
    Logger.debug('LoopDoWhileDecorator->end->iterations', i);
  }
}
