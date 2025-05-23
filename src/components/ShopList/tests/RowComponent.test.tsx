import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';

import { RowComponent } from '../RowComponent';

const shop = {
  id: '42',
  address: 'Main St 123, TestCity',
  imageUrl: 'shop.jpg',
  type: 'FRANCHISE' as const,
};

describe('RowComponent', () => {
  it('renders shop info', () => {
    render(<RowComponent shop={shop} />);
    const item = screen.getByTestId('shop-item');
    // Only check the visible address in the <p>
    expect(
      within(item).getByText(/main st 123/i, { selector: 'p' })
    ).toBeInTheDocument();
    expect(screen.getByText(/id: 42/i)).toBeInTheDocument();
    expect(screen.getByText(/franchise/i)).toBeInTheDocument();
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<RowComponent shop={shop} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', shop.imageUrl);
    expect(img).toHaveAttribute('alt', expect.stringContaining('Main St 123'));
  });
});
