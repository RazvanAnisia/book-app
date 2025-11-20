import { useState } from 'react';
import './BookItem.css';
import fallbackImage from '../../assets/fallback.jpg';

type BookItemProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

const BookItem = ({ title, description, imageUrl, id }: BookItemProps) => {
  const [descriptionVisible, setDescriptionVisible] = useState(true);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  return (
    <li className="book-item">
      {imageLoadFailed ? (
        <div className="image-error" role="img" aria-label="Image not available">
          Image url is incorrect or failed to load
        </div>
      ) : (
        <img
          className="book-image"
          src={imageUrl || fallbackImage}
          alt={title}
          onError={() => {
            setImageLoadFailed(true);
          }}
        />
      )}

      <div>
        <h4 className="book-title">{title}</h4>
        {descriptionVisible && (
          <p id={id} className="book-description">
            {description}
          </p>
        )}
        <button
          className="toggle-btn"
          aria-expanded={descriptionVisible}
          aria-controls={id}
          onClick={() => setDescriptionVisible(!descriptionVisible)}>
          {descriptionVisible ? 'Hide description' : 'Show description'}
        </button>
      </div>
    </li>
  );
};

export default BookItem;
