import { BinaryExpression } from '../node-types';
import { Logger } from '../logger';
import { VariableDecorator } from '../decorators/variable.decorator';

export class BinaryVisitor {
  static resolve(exp: BinaryExpression, varCache: VariableDecorator): boolean | number {
    const leftValue = varCache.get(exp.left.name);
    const rightValue = varCache.get(exp.right.name);
    Logger.debug('BinaryVisitor->resolve', leftValue, exp.operator, rightValue);
    switch (exp.operator) {
      case '<': {
        return parseInt(leftValue) < parseInt(rightValue);
      }
      case '+': {
        return parseFloat(leftValue) + parseFloat(rightValue);
      }
      default: {
        console.log('not supported BinaryDecorator->resolve->', exp);
      }
    }
    return false;
  }
}
