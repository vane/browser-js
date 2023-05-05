import {
  DoWhileStatement,
  ExpressionStatement,
  ForStatement,
  FunctionDeclaration,
  IfStatement,
  ReturnStatement,
  VariableDeclaration,
  WhileStatement
} from './node-types';
import { BinaryVisitor } from './visitors/binary.visitor';
import { ConditionDecorator } from './decorators/condition.decorator';
import { ExpressionVisitor } from './visitors/expression.visitor';
import { FunctionDecorator } from './decorators/function.decorator';
import { Logger } from './logger';
import { LoopDoWhileDecorator } from './decorators/loop.do.while.decorator';
import { LoopForDecorator } from './decorators/loop.for.decorator';
import { LoopWhileDecorator } from './decorators/loop.while.decorator';
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
    let returnValue = undefined;
    if (params) this.varCache.merge(params);

    for (const node of body) {
      switch (node.type) {
        case 'VariableDeclaration': {
          this.addVariables(node as VariableDeclaration);
          break;
        }
        case 'FunctionDeclaration': {
          const n = node as FunctionDeclaration;
          const f = new FunctionDecorator(
            n.id.name,
            n.params.map((p) => p.name),
            n.body,
            this
          );
          this.varCache.set(n.id.name, f);
          break;
        }
        case 'ExpressionStatement': {
          const n = node as ExpressionStatement;
          ExpressionVisitor.visit(n.expression, this.varCache);
          break;
        }
        case 'ForStatement': {
          const f = new LoopForDecorator(node as ForStatement, this);
          f.run();
          break;
        }
        case 'WhileStatement': {
          const f = new LoopWhileDecorator(node as WhileStatement, this);
          f.run();
          break;
        }
        case 'DoWhileStatement': {
          const f = new LoopDoWhileDecorator(node as DoWhileStatement, this);
          f.run();
          break;
        }
        case 'IfStatement': {
          const f = new ConditionDecorator(node as IfStatement, this);
          f.run();
          break;
        }
        case 'ReturnStatement': {
          const n = node as ReturnStatement;
          returnValue = BinaryVisitor.visit(n.argument, this.varCache);
          break;
        }
        default: {
          console.log('not supported JsInterpreter->run', node);
          return;
        }
      }
    }
    // update modified variables up to ctx
    this.ctx?.varCache.refresh(this.varCache);
    return returnValue;
  }

  private addVariables(n: VariableDeclaration): void {
    for (const v of n.declarations) {
      VariableSetterVisitor.visit(v, this.varCache);
    }
  }
}
