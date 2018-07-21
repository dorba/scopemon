import { ModuleScope } from './module.scope';

/**
 * The execution scope of the monitor
 */
export class MonitorScope<T=any> {
  private _name: string;
  private _context: T;
  private _parent: MonitorScope;
  private _root: MonitorScope;

  /**
   * Creates a new scope
   * @param name the name of the scope
   * @param context optional context for the scope
   */
  constructor(name: string, context?: T) {
    this._name = name;
    this._context = context || null;
  }

  /** Gets the name of the scope */
  get name() {
    return this._name;
  }

  /** Gets the scope context */
  get context() {
    return this._context;
  }

  /** Gets the parent scope */
  get parent() {
    return this._parent;
  }

  /** Gets the root scope */
  get root() {
    if (!this._root) {
      let root: any = this;
      while (root.parent) {
        root = root.parent;
      }
      this._root = root;
    }
    return this._root;
  }

  /**
   * Sets the parent of a scope to this scope
   * @param scope the child scope
   */
  derive<T extends MonitorScope>(scope: T) {
    scope._parent = this;
    scope._root = this.root;
    return scope;
  }

  /**
   * Creates a new child module scope
   * @param path the module path
   */
  module(path: string): ModuleScope {
    return this.derive(new ModuleScope(path));
  }
}
