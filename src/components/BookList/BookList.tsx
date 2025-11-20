import type { Book } from '../../types';
import './BookList.css';
import BookItem from '../BookItem/BookItem';
import { useState } from 'react';

type BookListProps = {
  books: Book[];
  onAdd: (book: Book) => void;
};

const BookList = ({ books, onAdd }: BookListProps) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [validationError, setValidationError] = useState(false);

  const handleAddBook = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      setValidationError(true);
      return;
    }

    const newBook: Book = {
      title: newTitle,
      description: newDescription,
      image: newImageUrl || null,
    };

    onAdd(newBook);

    setValidationError(false);
    setNewTitle('');
    setNewDescription('');
    setNewImageUrl('');
  };

  return (
    <div className="app-container">
      <div className="add-book-form" role="form" aria-labelledby="add-book-form-title">
        <h3 id="add-book-form-title">Add a New Book</h3>

        <label htmlFor="book-title">Title*</label>
        <input
          id="book-title"
          type="text"
          placeholder="Book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <span></span>

        <label htmlFor="book-description">Description*</label>
        <textarea
          id="book-description"
          placeholder="Book description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
        <span></span>

        <label htmlFor="book-image">Image URL (optional)</label>
        <input
          id="book-image"
          type="text"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />

        <button className="add-btn" onClick={handleAddBook}>
          + Add New Book
        </button>
        <span className="validation-error">
          {validationError ? 'Make sure to fill in both required fields: Title and Description' : null}
        </span>
      </div>

      <div>
        <h3 className="book-list-title">Book Library</h3>
        <ul className="book-list">
          {books.map((book, index) => {
            const id = `${index}-${book.title}-${book.description}`;
            const { title, image, description } = book;
            return <BookItem key={id} id={id} title={title} description={description} imageUrl={image} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BookList;
