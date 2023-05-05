import { BlockStatement, Identifier, Literal } from '../node-types';
import { JsInterpreter } from '../js.interpreter';
import { Logger } from '../logger';
import { Node } from 'acorn';
import { VariableDecorator } from './variable.decorator';

export class FunctionDecorator {
  private readonly params: string[];
  private block: BlockStatement;
  constructor(private readonly name: string, params: string[], block: BlockStatement, private ctx?: JsInterpreter) {
    this.params = params;
    this.block = block;
  }

  run(runParams?: Node[]) {
    Logger.debug('FunctionDecorator->run->start', runParams);
    const js = new JsInterpreter(this.name, this.ctx);
    const cache = this.toParams(js.varCache, runParams);
    const returnValue = js.run(this.block.body, cache);
    Logger.debug('FunctionDecorator->run->end->return', returnValue);
    return returnValue;
  }

  private toParams(varCache: VariableDecorator, runParams?: Node[]) {
    const cache = new VariableDecorator();
    for (let i = 0; i < this.params.length; i++) {
      const name = this.params[i];
      Logger.debug('FunctionDecorator->toParams', name, 'undefined');
      cache.set(name, undefined);
    }
    if (!runParams) return cache;

    // runParams
    for (let i = 0; i < runParams.length; i++) {
      const param = runParams[i];
      const name = this.params[i];
      if (param) {
        switch (param.type) {
          case 'Identifier': {
            cache.set(name, varCache.get((param as Identifier).name));
            break;
          }
          case 'Literal': {
            cache.set(name, (param as Literal).raw);
            break;
          }
          default: {
            console.log('not supported FunctionDecorator->toParams->runParams', name, param);
          }
        }
      }
      Logger.debug('FunctionDecorator->runParams', name, cache.get(name));
    }
    return cache;
  }
}
