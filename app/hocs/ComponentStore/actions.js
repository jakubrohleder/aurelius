import {
  INITIALIZE,
  UPDATE,
  DESTROY,
} from './constants';

export function initialize(componentName, payload = {}) {
  return {
    type: INITIALIZE,
    componentName,
    payload,
  };
}

export function update(componentName, payload, filters, deep = false) {
  return {
    type: UPDATE,
    componentName,
    payload,
    deep
  };
}

export function destroy(componentName) {
  return {
    type: DESTROY,
    componentName,
  };
}
