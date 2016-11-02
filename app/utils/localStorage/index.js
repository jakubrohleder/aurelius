import initialContent from 'raw!./initialContent.raw';

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // pass
  }
}

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return JSON.parse(initialContent);
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}
