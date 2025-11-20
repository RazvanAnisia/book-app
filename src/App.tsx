import { useState } from 'react';
import './App.css';
import bookData from './data/books-data.json';
import BookList from './components/BookList/BookList';
import type { Book } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>(bookData);

  const addBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  return <BookList books={books} onAdd={addBook} />;
}

export default App;
