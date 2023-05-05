import { ArrayExpression, BinaryExpression, Identifier, Literal, VariableValue } from '../node-types';
import { BinaryVisitor } from './binary.visitor';
import { VariableDecorator } from '../decorators/variable.decorator';

export class VariableGetterVisitor {
  static visit(value: VariableValue, varCache?: VariableDecorator) {
    switch (value.type) {
      case 'ArrayExpression': {
        return (value as ArrayExpression).elements;
      }
      case 'Literal': {
        return (value as Literal).raw;
      }
      case 'Identifier': {
        if (!varCache) {
          console.log('VariableVisitor->error, no varCache variable', value);
          return undefined;
        }
        return varCache.get((value as Identifier).name);
      }
      case 'BinaryExpression': {
        if (!varCache) {
          console.log('VariableVisitor->error, no varCache variable', value);
          return undefined;
        }
        return BinaryVisitor.visit(value as BinaryExpression, varCache);
      }
      default: {
        console.log('not supported VariableDecorator->getValue', value);
        return;
      }
    }
  }
}
