import {
  AssignmentExpression,
  CallExpression,
  Callee,
  Expression,
  Identifier,
  MemberExpression,
  VariableValue
} from '../node-types';
import { FunctionDecorator } from '../decorators/function.decorator';
import { Logger } from '../logger';
import { Node } from 'acorn';
import { VariableDecorator } from '../decorators/variable.decorator';
import { VariableVisitor } from './variable.visitor';

export class ExpressionVisitor {
  static resolve(expression: Expression, varCache: VariableDecorator) {
    switch (expression.type) {
      case 'CallExpression': {
        const n = expression as CallExpression;
        this.calleeResolve(n.callee, n.arguments, varCache);
        break;
      }
      case 'AssignmentExpression': {
        const n = expression as AssignmentExpression;
        const value = VariableVisitor.getValue(n.right, varCache);
        varCache.set(n.left.name, value);
        break;
      }
      default: {
        console.log('Not supported ExpressionVisitor->resolve', expression);
        return;
      }
    }
  }

  static calleeResolve(callee: Callee, args: Node[], varCache: VariableDecorator) {
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
        //eslint-disable-next-line @typescript-eslint/no-unsafe-call
        v[n.property.name](...a);
        break;
      }
      default:
        console.log('not supported ExpressionVisitor->calleeResolve', callee);
    }
  }

  static getArgumentsValues(args: Node[], varCache: VariableDecorator): any[] {
    const out: any[] = [];
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      out.push(VariableVisitor.getValue(a as VariableValue, varCache));
    }
    return out;
  }
}
