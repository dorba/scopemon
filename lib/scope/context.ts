
/**
 * Represents the context of a scope
 */
export interface ScopeContext {

  /**
   * The scope type
   */
  type: 'global' | 'module' | 'class' | 'method' | 'function';

  /**
   * A reference to the object which created the scope
   */
  reference: any;
}
