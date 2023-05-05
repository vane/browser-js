export class VariableDecorator {
  readonly vars: { [key: string]: any } = {};

  set(name: string, value?: any): void {
    this.vars[name] = value;
  }

  get(name: string): any {
    return this.vars[name];
  }

  merge(cache: VariableDecorator) {
    const keys = Object.keys(cache.vars);
    for (const key of keys) {
      this.vars[key] = cache.vars[key];
    }
  }

  refresh(cache: VariableDecorator) {
    const keys = Object.keys(cache.vars);
    for (const key of keys) {
      if (this.vars[key]) this.vars[key] = cache.vars[key];
    }
  }
}
