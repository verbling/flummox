/**
 * Used for simulating actions on stores when testing.
 *
 */
'use strict';

exports.__esModule = true;
exports.simulateAction = simulateAction;
exports.simulateActionAsync = simulateActionAsync;

function simulateAction(store, action, body) {
  var actionId = ensureActionId(action);
  store.handler({ actionId: actionId, body: body });
}

/**
 * Used for simulating asynchronous actions on stores when testing.
 *
 * asyncAction must be one of the following: begin, success or failure.
 *
 * When simulating the 'begin' action, all arguments after 'begin' will
 * be passed to the action handler in the store.
 *
 * @example
 *
 * TestUtils.simulateActionAsync(store, 'actionId', 'begin', 'arg1', 'arg2');
 * TestUtils.simulateActionAsync(store, 'actionId', 'success', { foo: 'bar' });
 * TestUtils.simulateActionAsync(store, 'actionId', 'failure', new Error('action failed'));
 */

function simulateActionAsync(store, action, asyncAction) {
  var actionId = ensureActionId(action);
  var payload = {
    actionId: actionId, async: asyncAction
  };

  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  switch (asyncAction) {
    case 'begin':
      if (args.length) {
        payload.actionArgs = args;
      }
      break;
    case 'success':
      payload.body = args[0];
      break;
    case 'failure':
      payload.error = args[0];
      break;
    default:
      throw new Error('asyncAction must be one of: begin, success or failure');
  }

  store.handler(payload);
}

function ensureActionId(actionOrActionId) {
  return typeof actionOrActionId === 'function' ? actionOrActionId._id : actionOrActionId;
}
