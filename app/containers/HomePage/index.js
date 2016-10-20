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
import ImageInput from 'components/ImageInput';
import * as Typography from 'components/Typography';
import styles from './styles.css';
import initialContent from 'raw!./index.md';
import ComponentStore from 'hocs/ComponentStore';
import packToZip from 'utils/packToZip';
import Button from 'components/Button';
import MetaInputText from 'components/MetaInputs/Text';
import MetaInputDateTime from 'components/MetaInputs/DateTime';
import MetaInputImage from 'components/MetaInputs/Image';

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

  handleChangeText = (content) => {
    this.props.updateState({
      content,
    });
  }

  handleChangeImage = ({ file, path }) => {
    const { fs } = this.props;

    this.props.updateState({
      fs: {
        ...fs,
        [file.name]: {
          file,
          path,
        },
      },
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
        <div className={styles.nav}>
          <Button>
            <ImageInput onChange={this.handleChangeImage} />
          </Button>
          <Button onClick={this.handleDownload}>Download</Button>
        </div>
        <div className={styles.content}>
          <EditorInput
            content={content}
            onChange={this.handleChangeText}
            onChangeImage={this.handleChangeImage}
            metaInputs={metaInputs}
          />
          <EditorPreview content={content} fs={fs} components={Typography} wrapper={PostWrapper} />
        </div>
      </div>
    );
  }
}

export default ComponentStore(
  () => ({
    content: initialContent,
    fs: {},
  })
)(HomePage);
