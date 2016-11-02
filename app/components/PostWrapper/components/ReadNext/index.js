import React from 'react'
import styles from './styles'
import { include as includes } from 'underscore.string'
import find from 'lodash/find'
import PostPreview from '../PostPreview'

export default function ReadNext (props) {
  const { pages, post } = props
  const { readNext } = post
  let nextPost
  if (readNext) {
    nextPost = find(pages, (page) =>
      includes(page.path, readNext)
    )
  }
  if (!nextPost) {
    return null
  } else {
    nextPost = find(pages, (page) =>
      includes(page.path, readNext.slice(1, -1))
    )

    return (
      <div>
        <h6 className={styles.header}>
          Czytaj więcej:
        </h6>
        <PostPreview post={nextPost} readNext />
      </div>
    )
  }
}

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}
