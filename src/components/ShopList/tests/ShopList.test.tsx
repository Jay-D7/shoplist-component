import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ShopList } from '../ShopList';

const shops: {
  id: string;
  address: string;
  imageUrl: string;
  type: 'FRANCHISE' | 'REGULAR';
}[] = [
  { id: '1', address: 'Test Address 1', imageUrl: '', type: 'FRANCHISE' },
  { id: '2', address: 'Test Address 2', imageUrl: '', type: 'REGULAR' },
];

describe('ShopList', () => {
  it('renders the grid container', () => {
    render(
      <div style={{ height: 400, width: 1200 }}>
        <ShopList shops={shops} />
      </div>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders an empty grid when shops is empty', () => {
    render(
      <div style={{ height: 400, width: 1200 }}>
        <ShopList shops={[]} />
      </div>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
