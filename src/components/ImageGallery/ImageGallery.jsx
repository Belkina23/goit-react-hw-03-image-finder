import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';

function ImageGallery({ items }) {
  return (
    <ul>
      {items.map(image => (
        <ImageGalleryItem
          src={image.webformatURL}
          alt={image.tags}
          largeImageUrl={image.largeImageURL}
          key={image.id}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: propTypes.array,
}; 

export default ImageGallery;