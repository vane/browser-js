import { UpdateExpression } from '../node-types';
import { VariableDecorator } from '../decorators/variable.decorator';

export class UpdateVisitor {
  static visit(exp: UpdateExpression, varCache: VariableDecorator): void {
    switch (exp.operator) {
      case '++': {
        const v = parseInt(varCache.get(exp.argument.name));
        varCache.set(exp.argument.name, v + 1);
        break;
      }
      default: {
        console.log('not supported UpdateVisitor->update', exp);
      }
    }
  }
}
