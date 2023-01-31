import propTypes from 'prop-types';
import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    largeImageUrl: propTypes.string.isRequired,
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li>
        <img src={src} alt={alt} />
      </li>
    );
  }
}

  export default ImageGalleryItem; 