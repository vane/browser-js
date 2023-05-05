import { ArrayDecorator } from '../decorators/array.decorator';

export class ArraySetterVisitor {
  static visit(index: number, operator: string, v: ArrayDecorator, value: any) {
    switch (operator) {
      case '=': {
        v.arr[index] = value;
        break;
      }
      case '+=': {
        v.arr[index] = parseFloat(v.arr[index]) + parseFloat(value);
        break;
      }
      case '-=': {
        v.arr[index] = parseFloat(v.arr[index]) - parseFloat(value);
        break;
      }
      default: {
        console.log('not supported AssignmentVisitor->arrayIndexSetLiteral->operator', operator);
      }
    }
  }
}
