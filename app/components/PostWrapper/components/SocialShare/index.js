import React from 'react'
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share'

import styles from './styles.scss'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
} = ShareButtons

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
} = ShareCounts

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const PinterestIcon = generateShareIcon('pinterest')

export default function SocialShare(props) {
  const { url, title, image } = props

  return (
    <div className={styles.wrapper}>
      <div className={styles.shareWrapper}>
        <FacebookShareButton
          url={url}
          title={title}
          className={styles.shareButton}
        >
          <FacebookIcon
            size={32}
            round
          />
        </FacebookShareButton>

        <FacebookShareCount
          url={url}
          className={styles.shareCount}
        >
          {count => count}
        </FacebookShareCount>
      </div>

      <div className={styles.shareWrapper}>
        <TwitterShareButton
          url={url}
          title={title}
          className={styles.shareButton}
        >
          <TwitterIcon
            size={32}
            round
          />
        </TwitterShareButton>

        <div className={styles.shareCount}>
          &nbsp;
        </div>
      </div>

      <div className={styles.shareWrapper}>
        <GooglePlusShareButton
          url={url}
          className={styles.shareButton}
        >
          <GooglePlusIcon
            size={32}
            round
          />
        </GooglePlusShareButton>

        <GooglePlusShareCount
          url={url}
          className={styles.shareCount}
        >
          {count => count}
        </GooglePlusShareCount>
      </div>

      <div className={styles.shareWrapper}>
        <LinkedinShareButton
          url={url}
          title={title}
          windowWidth={750}
          windowHeight={600}
          className={styles.shareButton}
        >
          <LinkedinIcon
            size={32}
            round
          />
        </LinkedinShareButton>

        <LinkedinShareCount
          url={url}
          className={styles.shareCount}
        >
          {count => count}
        </LinkedinShareCount>
      </div>

      <div className={styles.shareWrapper}>
        <PinterestShareButton
          url={String(window.location)}
          media={image}
          windowWidth={1000}
          windowHeight={730}
          className={styles.shareButton}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>

        <PinterestShareCount
          url={String(window.location)}
          className={styles.shareCount}
        />
      </div>
    </div>
  )
}

SocialShare.propTypes = {
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
}
