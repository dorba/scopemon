import app from './app';
import { Monitor } from '../../dist';

const moduleMonitor = app.monitor.scopeTo(module);

export class Thing {
  private monitor: Monitor;

  constructor() {
    this.monitor = moduleMonitor.scopeTo(this);
    this.monitor.report('test', 'created new Thing');
  }

  testSync() {
    let fnMonitor = this.monitor.scopeTo(this.testSync);
    fnMonitor.report('test', 'called testSync');
  }

  async testAsync() {
    let fnMonitor = this.monitor.scopeTo(this.testAsync);
    fnMonitor.report('test', 'called testAsync');

    await new Promise(resolve => {
      setTimeout(() => {
        fnMonitor.report('test', 'async timeout complete');
        resolve();
      }, 500);
    });

    fnMonitor.report('test', 'exiting testAsync');
  }
}
