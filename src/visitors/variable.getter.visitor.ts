import { ArrayExpression, BinaryExpression, Identifier, Literal, MemberExpression, VariableValue } from '../node-types';
import { ArrayIndexVisitor } from './array.index.visitor';
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
          console.log('VariableGetterVisitor->error->Identifier, no varCache variable', value);
          return undefined;
        }
        return varCache.get((value as Identifier).name);
      }
      case 'BinaryExpression': {
        if (!varCache) {
          console.log('VariableGetterVisitor->error->BinaryExpression, no varCache variable', value);
          return undefined;
        }
        return BinaryVisitor.visit(value as BinaryExpression, varCache);
      }
      case 'MemberExpression': {
        if (!varCache) {
          console.log('VariableGetterVisitor->error->MemberExpression, no varCache variable', value);
          return undefined;
        }
        const v = value as MemberExpression;
        return ArrayIndexVisitor.visitGet(v.property, varCache.get(v.object.name));
      }
      default: {
        console.log('not supported VariableGetterVisitor->visit', value);
        return;
      }
    }
  }
}
