# scopemon
Scoped execution monitoring for Node.js

## Installation
```
# Using npm
npm install scopemon

# or yarn
yarn add scopemon
```

## Getting started
_Note: all code samples are in Typescript_

Create a root monitor for your service or app:
```
import { Monitor } from 'scopemon';

export class AppContext {
  private _monitor: Monitor;

  constructor() {
    this._monitor = new Monitor('my-app', []);
  }

  get monitor() {
    return this._monitor;
  }
}
```
And use the monitor elsewhere
```
import { AppContext } from './app-context';

const app = new AppContext();

// app level report, using a topic of 'topic',
// and report data as the string 'hello'
app.monitor.report('topic', 'hello');
```

## Scoping the monitor
Monitors should be scoped to a specific context, for example a class or method within a class:
```
import { AppContext } from './app-context';

const app = new AppContext();
const testModuleMonitor = app.monitor.scopeTo(module); // scoped to node module

class Test {
  protected monitor = testModuleMonitor.scopeTo(this);

  tryIt() {
    // class scoped report
    this.monitor.report('enter-method', {/* data */ });

    // or scope to this method, so that 'tryIt' method
    // is captured as part of the report context
    const monitor = this.monitor.scopeTo(this.tryIt);
    monitor.report('enter-method');
  }
}
```
Scopes can only change in the following ways:
* _`root` => `module`_
* _`module` => `class` or `function`_
* _`class` => `method`_
* _`method` => `function`_
* _`function` => `function`_

## Creating a director
In order to take action on monitor events, you'll need to create a director:
```
import { Director, Scope } from 'scopemon';

// create a directory class extending from the base
// MyDirector will expect to receive data of type 'string'
export class MyDirector extends Director<string> {

  constructor() {
    // provide topics this director will listen for
    // in the constructor super call, as an array
    // this directory will listen only for 'test'
    super(['test']);
  }

  receive(topic: string, info: string, scope: Scope) {
    // receive reports and handle them here
    console.log(`new message from ${scope.path}: ${info}`);
  }
}
```
Next include the director in your root monitor. The second argument to Monitor accepts an array of directors that will be used to handle reports. Modify the first code example to include the director when creating the monitor:
```
this._monitor = new Monitor('my-app', [new MyDirector()]);
```

## API
### Monitor
#### Monitor constructor: new Monitor(from, directors)
Creates a new root monitor
* param `from` - a string value naming the root monitor
* param `directors` - an array of directors which will receive reports from the monitor
* returns - a new `Monitor` instance

Example usage:
```
const myMonitor = new Monitor('myApp', []);
```

### Monitor report method: monitor.report(topic, info)
Sends a report to listening directors
* param `topic` - a string value indicating the topic to report on
* param `info` - a user-defined value the provides information about the topic
* returns - `void`

Example usage:
```
monitor.report('log', 'something happened');
```

### Monitor scopeTo method: monitor.scopeTo(...context)
Creates a new monitor scoped to the provided context
* param `context` - a series of module, class instance, class method, or function handle
* returns - a new `Monitor` instance

Example usage:
```
const moduleMonitor = monitor.scopeTo(module); // inside a node module
const classMonitor = moduleMonitor.scopeTo(this); // inside a class

// alternatively if your modules typically only contain a single class
// you can scope directly from the root to a class:
const classMonitor = monitor.scopeTo(module, this);
```

### Director
#### Director constructor (abstract): super(topics)
Called from derived class to set the topics
* param `topics` - the topics the director will receive reports for
* return - `void`

Example usage:
```
constructor() {
  super(['topic1', 'topic2']);
}
```

#### Director receive method (abstract): director.receive(topic, info, scope)
Called when a monitor reports on a topic accepted by the director
* param `topic` - the string topic value
* param `into` - the user-defined report data
* param `scope` - the monitor scope
* returns - `void`

Example usage:
```
receive(topic: string, info: string, scope: Scope) {
  // receive reports and handle them here
  console.log(`new message from ${scope.path}: ${info}`);
}
```

### Scope
The scope received by a director has the following attributes:
* field `name` - the name of the scope, for example class name, method name, function name
* field `path` - the full scope path, for this scope and all ancestors, joined by '/'
* field `root` - the root scope
* field `parent` - the parent scope
* field `context` - the scope context, which contains the following attributes:
  * field `type` - the scope type of either `global`, `module`, `class`, `method`, or `function`
  * field `reference` - a reference to the module, class, method or function used when creating the scope

