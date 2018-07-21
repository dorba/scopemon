import app from './app';
import { Monitor } from '../../dist';

const moduleMonitor = app.monitor.scopeTo(module);

export function func() {
  let funcMonitor = moduleMonitor.scopeTo(func);
  funcMonitor.report('test', 'start func');

  let work = '';
  for (let i = 0; i < 3; i++) {
    work += 'work';
  }

  funcMonitor.report('test', work);
  funcMonitor.report('test', 'func complete');
}
