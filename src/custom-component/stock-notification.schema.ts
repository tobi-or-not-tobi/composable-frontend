import { ContentComponentSchema } from '@spryker-oryx/experience';
import { ProductStockNotification } from './stock-notification.component';

export const productTitleSchema: ContentComponentSchema<ProductStockNotification> =
  {
    name: 'Stock notification DEMO',
    group: 'Product',
    options: {
      outOfStockThreshold: {
        type: 'number',
      },
    },
  };
