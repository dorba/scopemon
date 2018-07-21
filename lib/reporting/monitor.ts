import * as Scope from '../scope';
import { Director } from './director';

type AnyScope = Scope.MonitorScope
  | Scope.ModuleScope
  | Scope.ClassScope
  | Scope.MethodScope
  | Scope.FunctionScope;

/**
 * A monitor which may report on events within a scope
 */
export class Monitor {
  private _scope: AnyScope;
  private _directors: Director[];

  /**
   * Creates a new monitor
   * @param name the monitor name
   */
  constructor(from: string | AnyScope, directors: Director[]) {
    if (!from) {
      this._scope = new Scope.MonitorScope('root', null);
    } else if (typeof from === 'string') {
      this._scope = new Scope.MonitorScope(from, null);
    } else {
      this._scope = from;
    }

    this._directors = directors || [];
  }

  /**
   * Reports new information
   * @param topic the topic to report on
   * @param info information about the topic
   */
  report(topic: string, info?: any) {
    for (let dir of this._directors) {
      if (dir.accept.includes(topic)) {
        dir.receive(topic, info, this._scope);
      }
    }
  }

  /**
   * Creates a new monitor within the specified scope
   * @param context the context to scope to
   */
  scopeTo(context: any) {
    if (!context) {
      return this;
    }

    let scope = this._scope as AnyScope;
    let childScope: AnyScope;

    if (this.isModule(context)) {
      childScope = scope.derive(new Scope.ModuleScope(context));
    } else if (this.isClass(context) && 'class' in scope) {
      childScope = scope.class(context);
    } else if (this.isMethod(context) && 'method' in scope) {
      childScope = scope.method(context);
    } else if (this.isFunction(context) && 'function' in scope) {
      childScope = scope.function(context);
    }

    if (!childScope) {
      throw new Error(`Monitor cannot scope from ${scope.constructor.name} to ${context}`);
    }

    return new Monitor(childScope, this._directors);
  }

  private isModule(context: any) {
    return (
      context.id !== undefined &&
      context.exports &&
      context.filename
    );
  }

  private isClass(context: any) {
    return (
      typeof context === 'object' &&
      context.constructor &&
      context.constructor.name !== 'Object'
    );
  }

  private isMethod(context: any) {
    return (
      typeof context === 'function' &&
      this._scope instanceof Scope.ClassScope
    );
  }

  private isFunction(context: any) {
    return (
      typeof context === 'function'
    );
  }
}
