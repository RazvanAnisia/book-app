import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('Displays books and inputs to add a new book', () => {
    it('displays headings and all 30 books', () => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(30);

      expect(screen.getByRole('heading', { name: 'Add a New Book', level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Book Library', level: 3 })).toBeInTheDocument();

      expect(screen.getByLabelText('Title*')).toBeInTheDocument();
      expect(screen.getByLabelText('Description*')).toBeInTheDocument();
      expect(screen.getByLabelText('Image URL (optional)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '+ Add New Book' })).toBeInTheDocument();
    });
  });

  describe('Adding a new book', () => {
    it('displays validation message if Title and Description input are not filled when trying to add a book', async () => {
      const initialBookCount = screen.getAllByRole('listitem').length;
      const addButton = screen.getByRole('button', { name: '+ Add New Book' });

      await userEvent.click(addButton);
      const validation = await screen.findByText(/make sure to fill in both required fields/i);
      expect(validation).toBeInTheDocument();

      const afterCount = screen.getAllByRole('listitem').length;
      expect(afterCount).toBe(initialBookCount);
    });

    it('adds the book to the list after filling all inputs including a valid image url', async () => {
      const validImageUrl =
        'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
      const initialBookCount = screen.getAllByRole('listitem').length;

      const titleInput = screen.getByLabelText('Title*');
      const descInput = screen.getByLabelText('Description*');
      const imageInput = screen.getByLabelText('Image URL (optional)');
      const addButton = screen.getByRole('button', { name: '+ Add New Book' });

      await userEvent.type(titleInput, 'My Test Book');
      await userEvent.type(descInput, 'A test description.');
      await userEvent.type(imageInput, validImageUrl);

      await userEvent.click(addButton);

      expect(screen.getAllByRole('listitem').length).toBe(initialBookCount + 1);

      const newTitleHeading = screen.getByRole('heading', { name: 'My Test Book', level: 4 });
      expect(newTitleHeading).toBeInTheDocument();

      const addedItem = newTitleHeading.closest('li')!;
      const img = within(addedItem).getByRole('img');
      expect(img.getAttribute('src')).toBe(validImageUrl);
    });

    it('displays image error text after load error if the image url is invalid', async () => {
      const initialBookCount = screen.getAllByRole('listitem').length;

      const titleInput = screen.getByLabelText('Title*');
      const descInput = screen.getByLabelText('Description*');
      const imageInput = screen.getByLabelText('Image URL (optional)');
      const addButton = screen.getByRole('button', { name: '+ Add New Book' });

      await userEvent.type(titleInput, 'Bad Image Book');
      await userEvent.type(descInput, 'Has a broken image url.');
      await userEvent.type(imageInput, 'https://example.com/does-not-exist.jpg');

      await userEvent.click(addButton);

      expect(screen.getAllByRole('listitem').length).toBe(initialBookCount + 1);

      const newTitleHeading = screen.getByRole('heading', { name: 'Bad Image Book', level: 4 });
      const addedItem = newTitleHeading.closest('li')!;
      const img = within(addedItem).getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img.getAttribute('src')).toBe('https://example.com/does-not-exist.jpg');

      // simulate image load error
      fireEvent.error(img);
      expect(screen.getByText(/image url is incorrect or failed to load/i)).toBeInTheDocument();
    });
  });
});
