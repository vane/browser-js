import {
  ArrayExpression,
  BinaryExpression,
  CallExpression,
  Identifier,
  Literal,
  VariableDeclarator
} from '../node-types';
import { ArrayDecorator } from '../decorators/array.decorator';
import { BinaryVisitor } from './binary.visitor';
import { FunctionCallVisitor } from './function.call.visitor';
import { Logger } from '../logger';
import { VariableDecorator } from '../decorators/variable.decorator';

export class VariableSetterVisitor {
  static visit(v: VariableDeclarator, varCache: VariableDecorator): void {
    let value = undefined;
    if (v.init) {
      switch (v.init.type) {
        case 'ArrayExpression': {
          value = ArrayDecorator.from((v.init as ArrayExpression).elements);
          break;
        }
        case 'Identifier': {
          value = varCache.get((v.init as Identifier).name);
          break;
        }
        case 'Literal': {
          value = (v.init as Literal).raw;
          break;
        }
        case 'BinaryExpression': {
          value = BinaryVisitor.visit(v.init as BinaryExpression, varCache);
          break;
        }
        case 'CallExpression': {
          const c = v.init as CallExpression;
          value = FunctionCallVisitor.visit(c.callee, c.arguments, varCache);
          break;
        }
        default: {
          console.log('not supported VariableSetterVisitor->visit->', value, v);
        }
      }
    }
    Logger.debug('JsInterpreter->addVariables', v.id.name, value);
    varCache.set(v.id.name, value);
  }
}
