import type { Shop } from './../ShopList';

function randomType(): 'FRANCHISE' | 'REGULAR' {
  return Math.random() > 0.5 ? 'FRANCHISE' : 'REGULAR';
}

export const mockShops = (count: number = 1000): Shop[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    address:
      i % 2 === 0
        ? 'Jana Pawła 2 66-666, Kraków'
        : 'Oxford Street 00-001, Warsaw',
    imageUrl:
      'https://www.dotactiv.com/hs-fs/hubfs/Small%20Retailers_Shelf_PlaceHolder.jpg?width=300',
    type: randomType(),
  }));
};

// version // 1.0.0 Before Automation

// let idCounter = 1;
// export const mockShops: Shop[] = [
//   {
//     id: String(idCounter++),
//     address: 'Jana Pawła 2 66-666, Kraków',
//     imageUrl:
//       'https://www.dotactiv.com/hs-fs/hubfs/Small%20Retailers_Shelf_PlaceHolder.jpg?width=300&name=Small%20Retailers_Shelf_PlaceHolder.jpg',
//     type: 'FRANCHISE',
//   },
//   {
//     id: String(idCounter++),
//     address: 'Oxford Street 00-001, Warsaw',
//     imageUrl:
//       '',
//     type: 'REGULAR',
//   },
// ];
