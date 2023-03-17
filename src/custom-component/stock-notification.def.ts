import { componentDef } from '@spryker-oryx/core';

export const productStockNotification = componentDef({
  name: 'product-stock-notification',
  impl: () =>
    import('./stock-notification.component').then(
      (m) => m.ProductStockNotification
    ),
  schema: () =>
    import('./stock-notification.schema').then((m) => m.productTitleSchema),
});
