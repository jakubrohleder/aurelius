import { fromJS } from 'immutable';
import frontMatter from 'front-matter';
import { addFile } from './fileSystem';

const SET_CONTENT = 'editor/SET_CONTENT';
const SET_META_KEY = 'editor/SET_META_KEY';
const RESET_DOCUMENT = 'editor/RESET_DOCUMENT';
const LOAD = 'editor/LOAD';

// import initialContent from 'raw!../md/components.md';
// import initialContent from 'raw!../md/markdown.md';

const initialState = fromJS({
  content: '',
  meta: {
    title: '',
    date: '',
  },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT: {
      return state.set('content', action.content);
    }
    case SET_META_KEY: {
      return state.setIn(['meta', action.key], action.value);
    }
    case RESET_DOCUMENT: {
      return state.set('content', '').set('meta', fromJS({}));
    }
    case LOAD: {
      return state.set('content', action.content).set('meta', action.meta);
    }
    default: return state;
  }
}

export function setContent(content) {
  return {
    type: SET_CONTENT,
    content,
  };
}

export function setMetaKey(key, value) {
  return {
    type: SET_META_KEY,
    key,
    value,
  };
}

export function resetDocument() {
  return {
    type: RESET_DOCUMENT,
  };
}

export function loadDocument(content, meta) {
  return {
    type: LOAD,
    content,
    meta,
  };
}

export function loadDocumentFromZip(zip) {
  return (dispatch) => {
    Object.values(zip.files).forEach((file) => {
      if (file.dir) return;
      if (file.name.startsWith('__MACOSX')) return;
      if (file.name.endsWith('.md')) {
        file.async('string').then((content) => {
          const meta = frontMatter(content);
          dispatch(loadDocument(meta.body, fromJS(meta.attributes)));
        });
      }

      // TODO dry
      if (file.name.endsWith('.jpg')) {
        file.async('uint8array').then((buffer) => {
          const blob = new Blob([buffer], { type: 'image/jpg' });

          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch(addFile(file.name, reader.result));
          };

          reader.readAsDataURL(blob);
        });
      }

      if (file.name.endsWith('.png')) {
        file.async('uint8array').then((buffer) => {
          const blob = new Blob([buffer], { type: 'image/png' });

          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch(addFile(file.name, reader.result));
          };

          reader.readAsDataURL(blob);
        });
      }
    });
  };
}
