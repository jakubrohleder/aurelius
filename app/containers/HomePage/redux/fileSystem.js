import { fromJS } from 'immutable';

const ADD_FILE = 'fileSystem/ADD_FILE';
const REMOVE_FILE = 'fileSystem/REMOVE_FILE';
const MOVE_FILE = 'fileSystem/MOVE_FILE';
const CLEAR = 'fileSystem/CLEAR';

const initialState = fromJS({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FILE: {
      const path = action.dir ? `${action.dir}/${action.name}` : action.name;
      return state.set(path, action.src);
    }

    case REMOVE_FILE: {
      return state.delete(action.name);
    }

    case MOVE_FILE: {
      const file = state.get(action.oldName);

      return state.delete(action.oldName).set(action.newName, file);
    }

    case CLEAR: {
      return fromJS({});
    }

    default: return state;
  }
}

export function addFile(name, src, dir) {
  return {
    type: ADD_FILE,
    name,
    src,
    dir,
  };
}

export function removeFile(name) {
  return {
    type: REMOVE_FILE,
    name,
  };
}

export function clearFileSystem() {
  return {
    type: CLEAR,
  };
}

export function moveFile(oldName, newName) {
  return {
    type: REMOVE_FILE,
    oldName,
    newName,
  };
}
