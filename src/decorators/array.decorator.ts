export class ArrayDecorator {
  readonly __type__ = 'array';

  readonly arr: any[];

  constructor(value?: any[]) {
    this.arr = value || [];
  }

  get length(): number {
    return this.arr.length;
  }

  pop(): any {
    return this.arr.pop();
  }

  push(...items: any) {
    return this.arr.push(...items);
  }

  concat(...items: any) {
    return this.arr.concat(...items);
  }

  join(separator?: string): string {
    return this.arr.join(separator);
  }

  reverse() {
    return this.arr.reverse();
  }

  shift() {
    return this.arr.shift();
  }

  slice(start?: number, end?: number) {
    return this.arr.slice(start, end);
  }

  sort(compareFn?: (a: any, b: any) => number) {
    return this.arr.sort(compareFn);
  }

  splice(start: number, deleteCount?: number) {
    return this.arr.splice(start, deleteCount);
  }

  unshift(...items: any) {
    return this.arr.unshift(...items);
  }

  indexOf(searchElement: any, fromIndex?: number) {
    return this.arr.indexOf(searchElement, fromIndex);
  }

  lastIndexOf(searchElement: any, fromIndex?: number) {
    return this.arr.lastIndexOf(searchElement, fromIndex);
  }

  isArray(arg: any) {
    return Array.isArray(arg);
  }

  static from(arg: any) {
    return new ArrayDecorator(Array.from(arg));
  }
}
