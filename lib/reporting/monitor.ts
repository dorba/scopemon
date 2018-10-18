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
   * @param from the scope to use, or a name for the root monitor
   * @param directors an array of directors to receive reports
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
  scopeTo(...contexts: any[]) {
    if (!contexts) {
      return this;
    }

    let previous: AnyScope;
    let current = this._scope as AnyScope;

    for(let ctx of contexts) {
      previous = current;
      current = null;

      if (typeof ctx === 'string') {
        current = new Scope.MonitorScope(ctx);
      } else if (this.isModule(ctx)) {
        current = previous.derive(new Scope.ModuleScope(ctx));
      } else if (this.isClass(ctx) && 'class' in previous) {
        current = previous.class(ctx);
      } else if (this.isMethod(ctx) && 'method' in previous) {
        current = previous.method(ctx);
      } else if (this.isFunction(ctx) && 'function' in previous) {
        current = previous.function(ctx);
      }

      if (!current) {
        throw new Error(`Monitor cannot scope from ${previous.constructor.name} to ${ctx}`);
      }
    }

    return new Monitor(current, this._directors);
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
