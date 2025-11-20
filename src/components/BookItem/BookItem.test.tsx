import { render, screen } from '@testing-library/react';
import BookItem from './BookItem';
import fallbackImage from '../../assets/fallback.jpg';
import userEvent from '@testing-library/user-event';

const title = 'The Lord of the Rings';
const description = 'A sweeping fantasy epic about the fight against an ancient evil and the power of friendship.';
const imageUrl = 'https://images.gr-assets.com/books/1566425108l/33.jpg';

describe('Book Item', () => {
  it('displays the book title as h4 , description and image if provided', () => {
    render(<BookItem title={title} description={description} imageUrl={imageUrl} id="1" />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(title);
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
  });

  it('uses the fallback image if no image url is provided', () => {
    render(<BookItem title={title} description={description} imageUrl={null} id="1" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', fallbackImage);
  });

  it('allows the user to toggle the description on and off', async () => {
    render(<BookItem title={title} description={description} imageUrl={imageUrl} id="1" />);

    const toggle = screen.getByRole('button', { name: 'Hide description' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(description)).toBeInTheDocument();

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(description)).not.toBeInTheDocument();

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
