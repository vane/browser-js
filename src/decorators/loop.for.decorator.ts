import { BinaryVisitor } from '../visitors/binary.visitor';
import { ForStatement } from '../node-types';
import { JsInterpreter } from '../js.interpreter';
import { Logger } from '../logger';
import { UpdateVisitor } from '../visitors/update.visitor';

export class LoopForDecorator {
  constructor(private loop: ForStatement, private ctx: JsInterpreter) {}

  run() {
    Logger.debug('LoopForDecorator->start');
    const js = new JsInterpreter(this.loop.type, this.ctx, this.loop.init);
    let i = 0;
    while (BinaryVisitor.visit(this.loop.test, js.varCache)) {
      Logger.debug('LoopForDecorator->loop', js.varCache.get(this.loop.update.argument.name));
      js.run(this.loop.body.body);
      UpdateVisitor.visit(this.loop.update, js.varCache);
      i++;
    }
    Logger.debug('LoopForDecorator->end->iterations', i);
  }
}
