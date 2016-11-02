import React from 'react'
import styles from './styles.scss'

export default function Bio(props) {
  const { author } = props

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <img src={`/${author.photo}`} alt={author.name} />
        </div>
        <div className={styles.aboutWrapper}>
          <h4>{author.name}</h4>
          <p className={styles.about}>
            {author.about}
          </p>
        </div>
      </div>
    </div>
  )
}

Bio.propTypes = {
  author: React.PropTypes.object.isRequired,
}
