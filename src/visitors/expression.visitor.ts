import {
  AssignmentExpression,
  CallExpression,
  Callee,
  Expression,
  Identifier,
  MemberExpression,
  VariableValue
} from '../node-types';
import { AssignmentVisitor } from './assignment.visitor';
import { FunctionDecorator } from '../decorators/function.decorator';
import { Logger } from '../logger';
import { Node } from 'acorn';
import { VariableDecorator } from '../decorators/variable.decorator';
import { VariableGetterVisitor } from './variable.getter.visitor';

export class ExpressionVisitor {
  static visit(expression: Expression, varCache: VariableDecorator) {
    switch (expression.type) {
      case 'CallExpression': {
        const n = expression as CallExpression;
        this.calleeResolve(n.callee, n.arguments, varCache);
        break;
      }
      case 'AssignmentExpression': {
        AssignmentVisitor.visit(expression as AssignmentExpression, varCache);
        break;
      }
      default: {
        console.log('Not supported ExpressionVisitor->resolve', expression);
        return;
      }
    }
  }

  private static calleeResolve(callee: Callee, args: Node[], varCache: VariableDecorator) {
    switch (callee.type) {
      case 'Identifier': {
        const n = callee as Identifier;
        const v = varCache.get(n.name) as FunctionDecorator;
        Logger.debug(`ExpressionVisitor->resolve->node->${n.name}`);
        if (v) {
          v.run(args);
        } else {
          console.log('not found ExpressionVisitor->resolve', n.name);
        }
        break;
      }
      case 'MemberExpression': {
        const n = callee as MemberExpression;
        const v = varCache.get(n.object.name);
        const a = this.getArgumentsValues(args, varCache);
        if (n.property.type === 'Identifier') {
          const nn = n.property as Identifier;
          Logger.debug('ExpressionVisitor->calleeResolve->member', nn.name, n.object.name);
          //eslint-disable-next-line @typescript-eslint/no-unsafe-call
          v[nn.name](...a);
        } else {
          console.log('not supported ExpressionVisitor->calleeResolve->member', n.property);
        }
        break;
      }
      default:
        console.log('not supported ExpressionVisitor->calleeResolve', callee);
    }
  }

  private static getArgumentsValues(args: Node[], varCache: VariableDecorator): any[] {
    const out: any[] = [];
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      out.push(VariableGetterVisitor.visit(a as VariableValue, varCache));
    }
    return out;
  }
}
