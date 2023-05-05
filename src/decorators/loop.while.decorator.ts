import { BinaryVisitor } from '../visitors/binary.visitor';
import {ForStatement, WhileStatement} from '../node-types';
import { JsInterpreter } from '../js.interpreter';
import { Logger } from '../logger';
import { UpdateVisitor } from '../visitors/update.visitor';

export class LoopWhileDecorator {
  constructor(private loop: WhileStatement, private ctx: JsInterpreter) {}

  run() {
    Logger.debug('LoopWhileDecorator->start');
    const js = new JsInterpreter(this.loop.type, this.ctx);
    let i = 0;
    while (BinaryVisitor.visit(this.loop.test, js.varCache)) {
      js.run(this.loop.body.body);
      i++;
    }
    Logger.debug('LoopWhileDecorator->end->iterations', i);
  }
}
