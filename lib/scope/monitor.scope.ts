
type MonitorType = 'global' | 'module' | 'class' | 'method' | 'function';

/**
 * The execution scope of the monitor
 */
export class MonitorScope {
  private _name: string;
  private _type: MonitorType;
  private _reference: any;
  private _parent: MonitorScope;
  private _root: MonitorScope;
  private _path: string;

  /**
   * Creates a new scope
   * @param name the name of the scope
   * @param context optional context for the scope
   */
  constructor(name: string, context?: {
    type: MonitorType,
    reference: any
  }) {
    this._name = name;
    this._type = context ? context.type : 'global';
    this._reference = context ? context.reference : null;
  }

  /** Gets the scope type */
  get type() {
    return this._type;
  }

  /** Gets a reference to the object associated with the scope */
  get reference() {
    return this._reference;
  }

  /** Gets the name of the scope */
  get name() {
    return this._name;
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

  /** Gets the full module path */
  get path() {
    if (!this._path) {
      let names = [this.name];
      let parent = this.parent;
      while (parent) {
        names.unshift(parent.name);
        parent = parent.parent;
      }
      this._path = names.join('/');
    }
    return this._path;
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
}
