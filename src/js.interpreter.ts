import { ExpressionStatement, ForStatement, FunctionDeclaration, VariableDeclaration } from './node-types';
import { ExpressionVisitor } from './visitors/expression.visitor';
import { FunctionDecorator } from './decorators/function.decorator';
import { Logger } from './logger';
import { LoopDecorator } from './decorators/loop.decorator';
import { Node } from 'acorn';
import { VariableDecorator } from './decorators/variable.decorator';
import { VariableSetterVisitor } from './visitors/variable.setter.visitor';

export class JsInterpreter {
  readonly varCache = new VariableDecorator();

  constructor(private fnName?: string, private ctx?: JsInterpreter, vars?: VariableDeclaration) {
    Logger.debug(`JsInterpreter->constructor->${fnName || ''}`);
    if (ctx) this.varCache.merge(ctx.varCache);
    if (vars) this.addVariables(vars);
  }

  run(body: Node[], params?: VariableDecorator) {
    if (params) this.varCache.merge(params);

    for (const node of body) {
      switch (node.type) {
        case 'VariableDeclaration': {
          this.addVariables(node as VariableDeclaration);
          break;
        }
        case 'FunctionDeclaration': {
          const n = node as FunctionDeclaration;
          const value = new FunctionDecorator(
            n.id.name,
            n.params.map((p) => p.name),
            n.body,
            this
          );
          this.varCache.set(n.id.name, value);
          break;
        }
        case 'ExpressionStatement': {
          const n = node as ExpressionStatement;
          ExpressionVisitor.visit(n.expression, this.varCache);
          break;
        }
        case 'ForStatement': {
          const loop = new LoopDecorator(node as ForStatement, this);
          loop.run();
          break;
        }
        default: {
          console.log('Not supported JsInterpreter->run', node);
          return;
        }
      }
    }
  }

  private addVariables(n: VariableDeclaration): void {
    for (const v of n.declarations) {
      VariableSetterVisitor.visit(v, this.varCache);
    }
  }
}
