import {Assignment, AssignmentExpression, Identifier, MemberExpression, UnaryExpression} from '../node-types';
import { MemberVisitor } from './member.visitor';
import { VariableDecorator } from '../decorators/variable.decorator';
import { VariableGetterVisitor } from './variable.getter.visitor';

export class AssignmentVisitor {
  static visit(exp: AssignmentExpression, varCache: VariableDecorator): void {
    const value = VariableGetterVisitor.visit(exp.right, varCache);
    this.assign(exp.left, value, exp.operator, varCache);
  }

  private static assign(a: Assignment, value: any, operator: string, varCache: VariableDecorator) {
    switch (a.type) {
      case 'Identifier': {
        this.identifierSet(a as Identifier, operator, value, varCache);
        break;
      }
      case 'MemberExpression': {
        MemberVisitor.visit(a as MemberExpression, operator, value, varCache);
        break;
      }
      default: {
        console.log('not supported AssignmentVisitor->assign', a, value);
      }
    }
  }

  private static identifierSet(i: Identifier, operator: string, value: any, varCache: VariableDecorator) {
    switch (operator) {
      case '=': {
        varCache.set(i.name, value);
        break;
      }
      case '+=': {
        const name = i.name;
        const v = varCache.get(name);
        varCache.set(name, parseFloat(v) + parseFloat(value));
        break;
      }
      case '-=': {
        const name = i.name;
        const v = varCache.get(name);
        varCache.set(name, parseFloat(v) - parseFloat(value));
        break;
      }
      default: {
        console.log('not supported AssignmentVisitor->identifierSet->operator', operator);
      }
    }
  }
}
