import React from 'react';

export default function Figure(props) {
  const { children, src, alt } = props;

  return (
    <figure>
      <img src={src} alt={alt} />
      {children &&
        <figcaption>
          {children}
        </figcaption>
      }
    </figure>
  );
}

Figure.propTypes = {
  children: React.PropTypes.node,
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
};
