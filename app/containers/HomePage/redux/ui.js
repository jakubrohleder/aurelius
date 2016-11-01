import { fromJS } from 'immutable';

const HIDE_MENU = 'ui/HIDE_MENU';
const TOGGLE_FS_BROWSER = 'ui/TOGGLE_FS_BROWSER';
const FOCUS_DIRECTION = 'ui/FOCUS_DIRECTION';

const initialState = fromJS({
  showFs: true,
  showMenu: true,
  focus: 'initial',
  previousFocus: 'initial',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FOCUS_DIRECTION: {
      if (state.focus === 'initial' && action.direction === 'center') {
        return state;
      }

      if (state.focus === action.direction) {
        return state.set('previousFocus', state.get('focus')).set('focus', 'center');
      }

      return state.set('previousFocus', state.get('focus')).set('focus', action.direction);
    }
    case TOGGLE_FS_BROWSER: {
      return state.update('showFs', (showFs) => !showFs);
    }
    case HIDE_MENU: {
      return state.set('showMenu', false);
    }
    default: return state;
  }
}

export function hideMenu() {
  return {
    type: HIDE_MENU,
  };
}

export function toggleFsBrowser() {
  return {
    type: TOGGLE_FS_BROWSER,
  };
}


export function changeFocus(direction) {
  return {
    type: FOCUS_DIRECTION,
    direction,
  };
}
