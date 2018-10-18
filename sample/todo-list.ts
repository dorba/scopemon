import { Monitor } from '../lib/reporting/monitor';

// define some data interfaces to work against
// ----

interface TodoListItem {
  name: string;
  resolved: boolean;
}

interface TodoList {
  name: string;
  items: TodoListItem[];
}

// define types representing the valid topics
// ----

type TodoListTopic =
  'CreateTodoList' |
  'DeleteTodoList';

type TodoListItemTopic =
  'CreateTodoItem' |
  'DeleteTodoItem' |
  'ResolveTodoItem' |
  'ReopenTodoItem';

type TodoTopic = TodoListTopic | TodoListItemTopic;

// describe how each topic maps an info type
// ----

type TopicInfo<T> =
  'CreateTodoList' extends T ? { name: string } :
  'DeleteTodoList' extends T ? { list: TodoList } :
  'CreateTodoItem' extends T ? { list: TodoList, name: string } :
  ('DeleteTodoItem'
    | 'ResolveTodoItem'
    | 'ReopenTodoItem'
  ) extends T ? { list: TodoList, name: string } :
  never;

// define an in// monitor.report('wrong'); // => error: 'wrong' is not assignableterface which enforces your reporting constraints
// ----

/**
 * Represents a monitor which operates with the todo list scope
 */
export interface TodoMonitor<T extends string, U = TopicInfo<T>> {

  /**
 * Creates a new monitor within the specified scope
 * @param context the context to scope to
 */
  scopeTo: (...contexts: any[]) => TodoMonitor<T, U>;

  /**
 * Reports new information
 * @param topic the topic to report on
 * @param info information about the topic
 */
  report: <Topic extends T, Info extends TopicInfo<Topic>>(topic: Topic, info?: Info) => void;
}

// create an instance of the monitor, assiging the interface
// ----

let monitor: TodoMonitor<TodoTopic> = new Monitor('todo-list', []);

// try it out
// ----

monitor.report('CreateTodoList', { name: 'Test' });
monitor.report('CreateTodoItem', { list: null, name: 'Item 1' });
