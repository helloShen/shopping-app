import Product from './Product';

interface Purchase {
  product: Product,
  count: number,
};

export type PurchaseListAction =
  | {type: string, data: Purchase}
  | {type: string, data: number}
  | {type: string, data: null};

export type PurchaseListReducer =
  (purchaseList: Purchase[], action: PurchaseListAction) => Purchase[];

export const purchaseListReducer: PurchaseListReducer =
(purchaseList, action) => {
  switch (action.type) {
    case 'add':
      let data = action.data as Purchase;
      let hasItem = false;
      const result = purchaseList.map((purchase) => {
        if (purchase.product.id === data.product.id) {
          hasItem = true;
          return {
            product: purchase.product,
            count: purchase.count + data.count,
          };
        }
        return purchase;
      });
      return (hasItem) ? result : [...purchaseList, data];
    case 'remove':
      data = action.data as Purchase;
      return purchaseList.map((purchase) => {
        if (purchase.product.id === data.product.id) {
          return {
            product: purchase.product,
            count: purchase.count - data.count,
          };
        }
        return purchase;
      }).filter((purchase) => purchase.count > 0);
    case 'removeItem':
      const id = action.data as number;
      return purchaseList.filter((purchase) => purchase.product.id !== id);
    case 'removeAll':
      return [];
    default:
      throw new Error();
  }
};

export default Purchase;
