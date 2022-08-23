import PropTypes from 'prop-types';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onModal }) => {
  const { largeImageURL, webformatURL, tags } = image;
  return (
    <li className={s.Item} onClick={() => onModal(largeImageURL)}>
      <img className={s.Image} src={webformatURL} alt={tags} />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModal: PropTypes.func.isRequired,
};
