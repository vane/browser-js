import {BinaryVisitor} from "../visitors/binary.visitor";
import {BlockStatement, IfStatement} from "../node-types";
import {JsInterpreter} from "../js.interpreter";
import {Logger} from "../logger";

export class ConditionDecorator {
    constructor(private condition: IfStatement, private ctx: JsInterpreter) {
    }

    run() {
        Logger.debug('ConditionDecorator->start');
        if (BinaryVisitor.visit(this.condition.test, this.ctx.varCache)) {
            const js = new JsInterpreter(this.condition.type, this.ctx);
            js.run(this.condition.consequent.body)
        } else if (this.condition.alternate) {
            const alt = this.condition.alternate;
            switch (alt.type) {
                case 'BlockStatement': {
                    const js = new JsInterpreter(alt.type, this.ctx);
                    js.run((alt as BlockStatement).body);
                    break;
                }
                case 'IfStatement': {
                    const c = new ConditionDecorator(alt as IfStatement, this.ctx);
                    c.run();
                    break;
                }
                default: {
                    console.log('not supported ConditionDecorator->run', alt);
                    break;
                }
            }
        }
        Logger.debug('ConditionDecorator->end');
    }
}