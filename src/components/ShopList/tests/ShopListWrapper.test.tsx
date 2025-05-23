import { beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

describe('ShopListWrapper', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('shows loading state', async () => {
    const { ShopListWrapper } = await import('../ShopListWrapper');
    render(<ShopListWrapper>{() => null}</ShopListWrapper>);
    expect(screen.getByText(/loading shops/i)).toBeInTheDocument();
  });

  it('shows shops after loading', async () => {
    const { ShopListWrapper } = await import('../ShopListWrapper');
    render(
      <ShopListWrapper>
        {({ shops }) => <div>Loaded {shops.length} shops</div>}
      </ShopListWrapper>
    );
    await waitFor(
      () => {
        expect(screen.getByText(/loaded 1000 shops/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('shows empty state if no shops', async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.doMock('../utilities/mockShops', () => ({
      mockShops: () => [],
    }));
    const { ShopListWrapper: EmptyWrapper } = await import(
      '../ShopListWrapper'
    );
    render(
      <EmptyWrapper>
        {({ shops }) => <div>Loaded {shops.length} shops</div>}
      </EmptyWrapper>
    );
    await waitFor(
      () => {
        expect(screen.getByText(/no shops found/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    vi.unmock('../utilities/mockShops');
  });

  it('shows error state if mockShops throws', async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.doMock('../utilities/mockShops', () => ({
      mockShops: () => {
        throw new Error('fail');
      },
    }));
    const { ShopListWrapper: ErrorWrapper } = await import(
      '../ShopListWrapper'
    );
    render(<ErrorWrapper>{() => null}</ErrorWrapper>);
    await waitFor(
      () => {
        expect(screen.getByText(/failed to load shops/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    vi.unmock('../utilities/mockShops');
  });
});
