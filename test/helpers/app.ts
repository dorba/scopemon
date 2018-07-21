import { Monitor, Director, Scope } from '../../dist';

class TestDirector extends Director<string> {

  constructor() {
    super(['test']);
  }

  receive(topic: string, info: string, scope: Scope) {
    console.log(`new message from ${scope.path}: ${info}`);
  }
}

class App {
  private _monitor: Monitor;

  constructor() {
    this._monitor = new Monitor('app', [new TestDirector()]);
  }

  get monitor() {
    return this._monitor;
  }
}

let app = new App();
export default app;
