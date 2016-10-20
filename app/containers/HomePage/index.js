/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PostWrapper from 'components/PostWrapper';
import EditorInput from 'components/EditorInput';
import EditorPreview from 'components/EditorPreview';
import * as Typography from 'components/Typography';
import ComponentStore from 'hocs/ComponentStore';
import packToZip from 'utils/packToZip';
import MetaInputText from 'components/MetaInputs/Text';
import MetaInputDateTime from 'components/MetaInputs/DateTime';
import MetaInputImage from 'components/MetaInputs/Image';

import styles from './styles.css';
import Footer from './components/Footer';
import initialContent from 'raw!./md/components.md';
// import initialContent from 'raw!./md/markdown.md';

const metaInputs = [
  {
    Component: (props) => <MetaInputText {...props} name="title" />,
    name: 'Title',
  },
  {
    Component: (props) => <MetaInputText {...props} name="author" />,
    name: 'Author',
  },
  {
    Component: (props) => <MetaInputDateTime {...props} name="date" />,
    name: 'Date',
  },
  {
    Component: (props) => <MetaInputImage {...props} name="cover" />,
    name: 'Cover',
  },
  {
    Component: (props) => <MetaInputImage {...props} name="photo" />,
    name: 'Photo',
  },
  {
    Component: (props) => <MetaInputText {...props} name="path" />,
    name: 'Path',
  },
  {
    Component: (props) => <MetaInputText {...props} name="readNext" />,
    name: 'Read next',
  },
];

class HomePage extends React.Component {
  static propTypes = {
    updateState: React.PropTypes.func.isRequired,
    content: React.PropTypes.string.isRequired,
    fs: React.PropTypes.object.isRequired,
  }

  state = {
    showFs: true,
  }

  handleChangeText = (content) => {
    this.props.updateState({
      content,
    });
  }

  handleAddImage = ({ file, path }) => {
    const { fs, updateState } = this.props;

    updateState({
      fs: {
        ...fs,
        [file.name]: {
          file,
          path,
        },
      },
    });
  }

  handleRemoveImage = (name) => {
    const { fs, updateState } = this.props;
    const { [name]: oldFile, ...newFs } = fs; // eslint-disable-line no-unused-vars

    updateState({
      fs: newFs,
    });
  }

  handleEditImage = (name, { file, path }) => {
    const { fs, updateState } = this.props;
    const { [name]: oldFile, ...newFs } = fs; // eslint-disable-line no-unused-vars
    newFs[file.name] = { file, path };

    updateState({
      fs: newFs,
    });
  }

  handleDownload = () => {
    const { content, fs } = this.props;

    packToZip(content, fs);
  }

  render() {
    const { content, fs } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <EditorInput
            content={content}
            onChange={this.handleChangeText}
            onChangeImage={this.handleAddImage}
            metaInputs={metaInputs}
          />
          <EditorPreview content={content} fs={fs} components={Typography} wrapper={PostWrapper} />
        </div>

        <Footer
          fs={fs}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          handleEditImage={this.handleEditImage}
          handleDownload={this.handleDownload}
        />
      </div>
    );
  }
}

export default ComponentStore(
  () => ({
    content: initialContent,
    fs: {
      t1: {
        path: 'http://placehold.it/350x150',
      },
      t2: {
        path: 'http://placehold.it/350x150',
      },
      t3: {
        path: 'http://placehold.it/350x150',
      },
      t4: {
        path: 'http://placehold.it/350x150',
      },
      t5: {
        path: 'http://placehold.it/350x150',
      },
      t6: {
        path: 'http://placehold.it/350x150',
      },
    },
  })
)(HomePage);
