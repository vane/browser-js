import { Callee, Identifier, MemberExpression, VariableValue } from '../node-types';
import { FunctionDecorator } from '../decorators/function.decorator';
import { Logger } from '../logger';
import { Node } from 'acorn';
import { VariableDecorator } from '../decorators/variable.decorator';
import { VariableGetterVisitor } from './variable.getter.visitor';

export class FunctionCallVisitor {
  static visit(callee: Callee, args: Node[], varCache: VariableDecorator) {
    switch (callee.type) {
      case 'Identifier': {
        const n = callee as Identifier;
        const v = varCache.get(n.name) as FunctionDecorator;
        Logger.debug(`FunctionCallVisitor->visit->node->${n.name}`);
        if (v) return v.run(args);
        console.log('not found FunctionCallVisitor->visit', n.name);
        break;
      }
      case 'MemberExpression': {
        const n = callee as MemberExpression;
        const v = varCache.get(n.object.name);
        const a = this.getArgumentsValues(args, varCache);
        if (n.property.type === 'Identifier') {
          const nn = n.property as Identifier;
          Logger.debug('FunctionCallVisitor->visit->member', nn.name, n.object.name);
          //eslint-disable-next-line @typescript-eslint/no-unsafe-call
          return v[nn.name](...a);
        }
        console.log('not supported FunctionCallVisitor->visit->member', n.property);
        break;
      }
    }
    console.log('not supported FunctionCallVisitor->visit', callee);
    return false;
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
