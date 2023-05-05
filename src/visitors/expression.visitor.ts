import { AssignmentExpression, CallExpression, Expression, UpdateExpression } from '../node-types';
import { AssignmentVisitor } from './assignment.visitor';
import { FunctionCallVisitor } from './function.call.visitor';
import { UpdateVisitor } from './update.visitor';
import { VariableDecorator } from '../decorators/variable.decorator';

export class ExpressionVisitor {
  static visit(exp: Expression, varCache: VariableDecorator) {
    switch (exp.type) {
      case 'CallExpression': {
        const n = exp as CallExpression;
        FunctionCallVisitor.visit(n.callee, n.arguments, varCache);
        break;
      }
      case 'AssignmentExpression': {
        AssignmentVisitor.visit(exp as AssignmentExpression, varCache);
        break;
      }
      case 'UpdateExpression': {
        UpdateVisitor.visit(exp as UpdateExpression, varCache);
        break;
      }
      default: {
        console.log('not supported ExpressionVisitor->resolve', exp);
        return;
      }
    }
  }
}
