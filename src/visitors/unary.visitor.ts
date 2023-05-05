import { Identifier, Literal, MemberProperty, UnaryExpression } from '../node-types';
import { VariableDecorator } from '../decorators/variable.decorator';

export class UnaryVisitor {
  static visit(unary: UnaryExpression, varCache: VariableDecorator) {
    const value = this.getUnaryValue(unary.argument, varCache);
    switch (unary.operator) {
      case '-': {
        return -parseFloat(value);
      }
    }
    console.log('not supported BinaryVisitor->getAssignmentValue->UnaryExpression', unary);
    return false;
  }

  private static getUnaryValue(argument: MemberProperty, varCache: VariableDecorator) {
    switch (argument.type) {
      case 'Identifier': {
        return varCache.get((argument as Identifier).name);
      }
      case 'Literal': {
        return (argument as Literal).raw;
      }
    }
    console.log('not supported BinaryVisitor->getUnaryArgument', argument);
    return false;
  }
}
