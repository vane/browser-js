import { ArrayIndexVisitor } from './array.index.visitor';
import { MemberExpression } from '../node-types';
import { VariableDecorator } from '../decorators/variable.decorator';

export class MemberVisitor {
  static visit(exp: MemberExpression, operator: string, value: any, varCache: VariableDecorator) {
    const v = varCache.get(exp.object.name);
    if (v.__type__ === 'array') {
      ArrayIndexVisitor.visitSet(exp.property, operator, v, value);
    } else {
      console.log('not supported AssignmentVisitor->assign MemberExpression', v);
    }
  }
}
