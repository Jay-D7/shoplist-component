import { type ReactNode, useEffect, useState } from 'react';

import type { Shop } from './ShopList';
import { mockShops } from './utilities/mockShops';

type shopListWrapperProps = {
  children: (props: {
    shops: Shop[];
    loading: boolean;
    error: string | null;
  }) => ReactNode;
};

export const ShopListWrapper = ({ children }: shopListWrapperProps) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setShops(mockShops(1000)); // mockShops
        // Change the number to test the performance of list
        setLoading(false);
      } catch {
        setError('Failed to load shops.');
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="error-handler" aria-live="polite" role="status">
        <h2 className="handler-text">Loading shops...</h2>
      </section>
    );
  } else if (error === 'Failed to load shops.') {
    return (
      <section className="error-handler" aria-live="polite" role="alert">
        <h2 className="handler-text-error">{error}</h2>
      </section>
    );
  } else if (!shops.length) {
    return (
      <section className="error-handler" aria-live="polite" role="status">
        <h2 className="handler-text">No shops found.</h2>
      </section>
    );
  }

  return (
    <main className="shop-list-wrapper">
      {children({
        shops,
        loading,
        error,
      })}
    </main>
  );
};
