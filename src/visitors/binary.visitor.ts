import { BinaryExpression, Identifier, Literal, MemberExpression } from '../node-types';
import { ArrayIndexVisitor } from './array.index.visitor';
import { Logger } from '../logger';
import { VariableDecorator } from '../decorators/variable.decorator';

export class BinaryVisitor {
  static visit(exp: BinaryExpression, varCache: VariableDecorator): boolean | number {
    if (exp.left.type === 'Identifier' && exp.right.type === 'Identifier') {
      const leftValue = varCache.get((exp.left as Identifier).name);
      const rightValue = varCache.get((exp.right as Identifier).name);
      return this.valueLeftRight(leftValue, rightValue, exp.operator);
    }

    if (exp.left.type === 'MemberExpression' && exp.right.type === 'MemberExpression') {
      return this.memberLeftRight(exp.left as MemberExpression, exp.right as MemberExpression, exp.operator, varCache);
    }

    if (exp.left.type === 'Identifier' && exp.right.type === 'MemberExpression') {
      return this.identifierLeftMemberRight(
        exp.left as Identifier,
        exp.right as MemberExpression,
        exp.operator,
        varCache
      );
    }

    if (exp.left.type === 'MemberExpression' && exp.right.type === 'Identifier') {
      return this.memberLeftIdentifierRight(
        exp.left as MemberExpression,
        exp.right as Identifier,
        exp.operator,
        varCache
      );
    }

    if (exp.left.type === 'MemberExpression' && exp.right.type === 'Literal') {
      return this.memberLeftLiteralRight(exp.left as MemberExpression, exp.right as Literal, exp.operator, varCache);
    }

    if (exp.left.type === 'Literal' && exp.right.type === 'MemberExpression') {
      return this.literalLeftMemberRight(exp.left as Literal, exp.right as MemberExpression, exp.operator, varCache);
    }

    console.log('not supported BinaryVisitor->visit->type', 'left', exp.left.type, 'right', exp.right.type);
    return false;
  }

  private static literalLeftMemberRight(
    left: Literal,
    right: MemberExpression,
    operator: string,
    varCache: VariableDecorator
  ) {
    const v = varCache.get(right.object.name);
    if (v.__type__ === 'array') {
      const rightValue = ArrayIndexVisitor.visitGet(right.property, v);
      return this.valueLeftRight(left.raw, rightValue, operator);
    }
    console.log('not supported BinaryVisitor->literalLeftMemberRight', v);
    return false;
  }

  private static memberLeftLiteralRight(
    left: MemberExpression,
    right: Literal,
    operator: string,
    varCache: VariableDecorator
  ) {
    const v = varCache.get(left.object.name);
    if (v.__type__ === 'array') {
      const leftValue = ArrayIndexVisitor.visitGet(left.property, v);
      return this.valueLeftRight(leftValue, right.raw, operator);
    }
    console.log('not supported BinaryVisitor->memberLeftLiteralRight', v);
    return false;
  }

  private static memberLeftIdentifierRight(
    left: MemberExpression,
    right: Identifier,
    operator: string,
    varCache: VariableDecorator
  ) {
    const v = varCache.get(left.object.name);
    const rightValue = varCache.get(right.name);
    if (v.__type__ === 'array') {
      const leftValue = ArrayIndexVisitor.visitGet(left.property, v);
      return this.valueLeftRight(leftValue, rightValue, operator);
    }
    console.log('not supported BinaryVisitor->memberLeftIdentifierRight', v);
    return false;
  }

  private static identifierLeftMemberRight(
    left: Identifier,
    right: MemberExpression,
    operator: string,
    varCache: VariableDecorator
  ) {
    const v = varCache.get(right.object.name);
    const leftValue = varCache.get(left.name);
    if (v.__type__ === 'array') {
      const rightValue = ArrayIndexVisitor.visitGet(right.property, v);
      return this.valueLeftRight(leftValue, rightValue, operator);
    }
    console.log('not supported BinaryVisitor->identifierLeftMemberRight', v);
    return false;
  }

  private static memberLeftRight(
    left: MemberExpression,
    right: MemberExpression,
    operator: string,
    varCache: VariableDecorator
  ) {
    const vl = varCache.get(left.object.name);
    const vr = varCache.get(right.object.name);
    if (vl.__type__ === 'array' && vl.__type__ === 'array') {
      const leftValue = ArrayIndexVisitor.visitGet(left.property, vl);
      const rightValue = ArrayIndexVisitor.visitGet(right.property, vr);
      return this.valueLeftRight(leftValue, rightValue, operator);
    }
    console.log('not supported BinaryVisitor->memberLeftRight', left, right);
    return false;
  }

  private static valueLeftRight(leftValue: any, rightValue: any, operator: string) {
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
      default: {
        console.log('not supported BinaryVisitor->identifierLeftRight->operator', operator);
      }
    }
    return false;
  }
}
