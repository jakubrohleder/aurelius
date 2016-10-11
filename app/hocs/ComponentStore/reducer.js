import { Map } from 'immutable';

import {
  INITIALIZE,
  UPDATE,
  DESTROY,
  INITIALIZED_SYMBOL,
} from './constants';

const initialState = Map({});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE: {
      if (state.getIn([action.componentName, INITIALIZED_SYMBOL])) return state;
      const componentState = state.get(action.componentName) || Map({});

      return state.set(
        action.componentName,
        componentState.merge(action.payload).set(INITIALIZED_SYMBOL, true)
      );
    }

    case UPDATE: {
      if (!state.has(action.componentName)) {
        console.warn('You try to update store that does not exist', action.componentName);
        return state;
      }

      return state.update(
        action.componentName, (value) => (action.deep ? value.mergeDeep(action.payload) : value.merge(action.payload))
      );
    }

    case DESTROY: {
      if (!state.has(action.componentName)) {
        console.warn('You try to destroy store that does not exist', action.componentName);
        return state;
      }
      return state.delete(action.componentName);
    }

    default:
      return state;
  }
}
