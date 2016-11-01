import { combineReducers } from 'redux';
import editor, * as editorActions from './editor';
import fs, * as fileSystemActions from './fileSystem';
import ui, * as uiActions from './ui';

export const reducer = combineReducers({
  editor,
  fs,
  ui,
});

export const actions = {
  ...editorActions,
  ...fileSystemActions,
  ...uiActions,
};
