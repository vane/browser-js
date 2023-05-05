import { Constraints } from './constraints';

export class Logger {
  static debug(...args: any[]) {
    if (Constraints.IS_DEBUG) console.log(...args);
  }
}
