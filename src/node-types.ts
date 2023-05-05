import { Node } from 'acorn';

export type Expression = CallExpression | AssignmentExpression | UpdateExpression;
export type VariableValue = ArrayExpression | Literal | Identifier | BinaryExpression | MemberExpression;
export type Callee = Identifier | MemberExpression;
export type Assignment = Identifier | MemberExpression | Literal | LogicalExpression;
export type Binary = Identifier | MemberExpression | Literal | LogicalExpression | UnaryExpression;
export type MemberProperty = Identifier | Literal;
export type LogicalExpression = BinaryExpression;
export type AlternateCondition = BlockStatement | IfStatement;

export interface Program extends Node {
  body: Node[];
  sourceType: string;
}

export interface Identifier extends Node {
  name: string;
}

export interface Literal extends Node {
  raw: any;
}

// --- Declaration ---

export interface VariableDeclarator extends Node {
  id: Identifier;
  init?: VariableValue;
}

export interface VariableDeclaration extends Node {
  declarations: VariableDeclarator[];
}

export interface FunctionDeclaration extends Node {
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
}

// --- Expression ---

export interface ArrayExpression extends Node {
  elements: [];
}

export interface AssignmentExpression extends Node {
  left: Assignment;
  operator: string;
  right: Assignment;
}

export interface BinaryExpression extends Node {
  left: Binary;
  operator: string;
  right: Binary;
}

export interface UpdateExpression extends Node {
  prefix: boolean;
  operator: string;
  argument: Identifier;
}

export interface CallExpression extends Node {
  callee: Callee;
  arguments: Node[];
}

export interface MemberExpression extends Node {
  object: Identifier;
  property: MemberProperty;
  computed: boolean;
}

export interface UnaryExpression extends Node {
  operator: string;
  argument: MemberProperty;
}

// --- Statement ---

export interface BlockStatement extends Node {
  body: Node[];
}

export interface ExpressionStatement extends Node {
  expression: Expression;
}

export interface ForStatement extends Node {
  init: VariableDeclaration;
  test: BinaryExpression;
  update: UpdateExpression;
  body: BlockStatement;
}

export interface WhileStatement extends Node {
  test: BinaryExpression;
  body: BlockStatement;
}

export interface IfStatement extends Node {
  test: LogicalExpression;
  consequent: BlockStatement;
  alternate?: AlternateCondition;
}
