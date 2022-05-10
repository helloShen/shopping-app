import Product from './Product';

interface Purchase {
  product: Product,
  count: number,
};

export type PurchaseListAction =
  {type: string, data: Purchase};

export type PurchaseListReducer =
  (purchaseList: Purchase[], action: PurchaseListAction) => Purchase[];

export const purchaseListReducer: PurchaseListReducer =
(purchaseList, action) => {
  switch (action.type) {
    case 'add':
      let hasItem = false;
      const result = purchaseList.map((purchase) => {
        if (purchase.product.id === action.data.product.id) {
          hasItem = true;
          return {
            product: purchase.product,
            count: purchase.count + action.data.count,
          };
        }
        return purchase;
      });
      return (hasItem) ? result : [...purchaseList, action.data];
    case 'remove':
      return purchaseList.map((purchase) => {
        if (purchase.product.id === action.data.product.id) {
          return {
            product: purchase.product,
            count: purchase.count - action.data.count,
          };
        }
        return purchase;
      }).filter((purchase) => purchase.count > 0);
    default:
      throw new Error();
  }
};

export default Purchase;
