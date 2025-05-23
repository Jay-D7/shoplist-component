import { useEffect } from 'react';

import type { Shop } from './ShopList';
import { parseAddress } from './utilities/parseAddress';

type RowComponentProps = {
  shop: Shop;
  style?: React.CSSProperties;
};

export const RowComponent = ({ shop, style }: RowComponentProps) => {
  const { street, city } = parseAddress(shop.address);
  // Test parseAddress runs in the browser and check if React.window working
  // For debugging or analytics
  useEffect(() => {
    // console.log(parseAddress('Oxford street 66-666, London'));
  }, []);

  return (
    <li
      key={shop.id}
      style={style}
      className="shop-card"
      data-testid="shop-item"
      aria-labelledby={`shop-title-${shop.id}`}
      tabIndex={0}
      role="listitem"
    >
      {shop.imageUrl && (
        <figure className="shop-figure">
          <img
            src={shop.imageUrl}
            alt={`Shop at ${street}, ${city}`}
            className="shop-image"
            loading="lazy"
            // <Suspense> is not needed for image lazy loading. current approach (react-window already virtualizes this list) is optimal for performance and user experience.
          />
          <figcaption id={`shop-title-${shop.id}`} className="sr-only">
            {`${street}, ${city}`}
          </figcaption>
        </figure>
      )}
      <div className="w-full">
        <div className="mb-2 flex justify-between">
          <span className="shop-id">ID: {shop.id}</span>
          <span
            className={`shop-type ${
              shop.type === 'FRANCHISE'
                ? 'shop-type-franchise'
                : 'shop-type-regular'
            }`}
          >
            {shop.type}
          </span>
        </div>
        <p className="shop-address">{`${street}, ${city}`}</p>
        <button
          className="shop-button"
          aria-label={`Add shop ${shop.id} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};
