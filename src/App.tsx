import { useState } from 'react';
import './App.css';
import bookData from './data/books-data.json';
import BookList from './components/BookList';
import type { Book } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>(bookData);

  return <BookList books={books} />;
}

export default App;
