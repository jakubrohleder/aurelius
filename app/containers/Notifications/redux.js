import { fromJS } from 'immutable';

const ADD_NOTIFICATION = 'notifications/ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'notifications/REMOVE_NOTIFICATION';

const initialState = fromJS([]);
let nextId = 1;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return state.push({
        text: action.text,
        id: action.id,
      });
    }

    case REMOVE_NOTIFICATION: {
      return state.filterNot((notification) => notification.id === action.id);
    }

    default: return state;
  }
}

export function show(text, timeout) {
  return (dispatch) => {
    const newId = nextId;
    nextId += 1;
    dispatch({
      type: ADD_NOTIFICATION,
      text,
      id: newId,
    });

    if (timeout) {
      setTimeout(() => dispatch(remove(newId)), timeout);
    }
  };
}

export function remove(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id,
  };
}
