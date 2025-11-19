import type { Book } from '../types';

type BookListProps = {
  books: Book[];
};

const BookList = ({ books }: BookListProps) => {
  return books.map((book) => <li>{book.title}</li>);
};

export default BookList;
