import { Literal, MemberProperty } from '../node-types';
import { ArrayDecorator } from '../decorators/array.decorator';
import { ArraySetterVisitor } from './array.setter.visitor';

export class ArrayIndexVisitor {
  static visitSet(n: MemberProperty, operator: string, v: ArrayDecorator, value: any) {
    switch (n.type) {
      case 'Literal': {
        const index = parseInt((n as Literal).raw);
        ArraySetterVisitor.visit(index, operator, v, value);
        break;
      }
      default: {
        console.log('not supported AssignmentVisitor->arrayIndexSet', n);
      }
    }
  }

  static visitGet(n: MemberProperty, v: ArrayDecorator) {
    switch (n.type) {
      case 'Literal': {
        const index = parseInt((n as Literal).raw);
        return v.arr[index];
      }
      default: {
        console.log('not supported AssignmentVisitor->arrayIndexSet', n);
      }
    }
  }
}
