import { BinaryVisitor } from '../visitors/binary.visitor';
import { ForStatement } from '../node-types';
import { JsInterpreter } from '../js.interpreter';
import { Logger } from '../logger';
import { UpdateVisitor } from '../visitors/update.visitor';

export class LoopDecorator {
  constructor(private loop: ForStatement, private ctx?: JsInterpreter) {}

  run() {
    Logger.debug('LoopDecorator->start');
    const js = new JsInterpreter(this.loop.type, this.ctx, this.loop.init);
    let i = 0;
    while (BinaryVisitor.resolve(this.loop.test, js.varCache)) {
      Logger.debug('LoopDecorator->loop', js.varCache.get(this.loop.update.argument.name));
      js.run(this.loop.body.body);
      UpdateVisitor.update(this.loop.update, js.varCache);
      i++;
    }
    Logger.debug('LoopDecorator->end->iterations', i);
  }
}
