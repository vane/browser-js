import {
  Binary,
  BinaryExpression,
  Identifier,
  Literal,
  MemberExpression,
  UnaryExpression
} from '../node-types';
import { ArrayIndexVisitor } from './array.index.visitor';
import { Logger } from '../logger';
import { VariableDecorator } from '../decorators/variable.decorator';
import {UnaryVisitor} from "./unary.visitor";

export class BinaryVisitor {
  static visit(exp: BinaryExpression, varCache: VariableDecorator): boolean | number {
    const left = this.getAssignmentValue(exp.left, varCache);
    const right = this.getAssignmentValue(exp.right, varCache);
    const value = this.computeValue(left, right, exp.operator);
    Logger.debug('BinaryVisitor->visit->value', left, exp.operator, right, value);
    return value;
  }

  private static getAssignmentValue(assignment: Binary, varCache: VariableDecorator) {
    switch (assignment.type) {
      case 'Identifier': {
        return varCache.get((assignment as Identifier).name);
      } case 'Literal': {
        return (assignment as Literal).raw;
      }
      case 'MemberExpression': {
        const n = assignment as MemberExpression;
        const v = varCache.get(n.object.name);
        if (v.__type__ === 'array') {
          return ArrayIndexVisitor.visitGet(n.property, v);
        }
        console.log('not supported BinaryVisitor->getAssignmentValue->MemberExpression', v);
        return false;
      }
      case 'UnaryExpression':
        return UnaryVisitor.visit(assignment as UnaryExpression, varCache);
      case 'BinaryExpression':
      case 'LogicalExpression': {
        return BinaryVisitor.visit(assignment as BinaryExpression, varCache);
      }
    }
    console.log('not supported BinaryVisitor->getAssignmentValue', assignment);
    return false;
  }

  private static computeValue(leftValue: any, rightValue: any, operator: string) {
    Logger.debug('BinaryVisitor->valueLeftRight', leftValue, operator, rightValue);
    switch (operator) {
      case '<': {
        return parseInt(leftValue) < parseInt(rightValue);
      }
      case '+': {
        return parseFloat(leftValue) + parseFloat(rightValue);
      }
      case '-': {
        return parseFloat(leftValue) - parseFloat(rightValue);
      }
      case '*': {
        return parseFloat(leftValue) * parseFloat(rightValue);
      }
      case '/': {
        return parseFloat(leftValue) / parseFloat(rightValue);
      }
      case '===': {
        return isNaN(leftValue) ? leftValue === rightValue : parseFloat(leftValue) === parseFloat(rightValue);
      }
      case '==': {
        return leftValue === rightValue;
      }
      case '||': {
        return leftValue || rightValue;
      }
      case '&&': {
        return leftValue && rightValue;
      }
      default: {
        console.log('not supported BinaryVisitor->identifierLeftRight->operator', operator);
      }
    }
    return false;
  }
}
