import ava, { TestInterface } from 'ava';
import { Monitor } from '../dist';
import { Thing, func } from './helpers';

const test = ava as TestInterface<{
}>;

test.beforeEach(assert => {
  assert.context = {
  };
});

test('can report from a function', async assert => {
  func();
  assert.pass();
});

test('can report from a class', async assert => {
  let thing = new Thing();
  thing.testSync();
  await thing.testAsync();
  assert.pass();
});
