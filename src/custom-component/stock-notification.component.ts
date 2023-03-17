import { ProductMixin, Product } from '@spryker-oryx/product';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { resolve } from '@spryker-oryx/di';
import { asyncState, valueType, i18n } from '@spryker-oryx/utilities';
import { map, Observable } from 'rxjs';
import { CartService, CartEntry } from '@spryker-oryx/cart';
import { StockNotificationOptions } from './stock-notification.model';
import { ContentMixin, defaultOptions } from '@spryker-oryx/experience';

@defaultOptions({
  outOfStockThreshold: 5,
})
export class ProductStockNotification extends ProductMixin(
  ContentMixin<StockNotificationOptions>(LitElement)
) {
  protected cartService = resolve(CartService);

  @asyncState()
  protected max = valueType(this.calcMax());

  protected render(): TemplateResult | void {
    if (!this.max) return;

    const { outOfStockThreshold } = this.componentOptions ?? {};

    if (this.max < outOfStockThreshold) {
      return html`${i18n('cart.out-of-stock')}`;
    }

    return html`${i18n('cart.<max>-in-stock', { max: this.max })}`;
  }

  protected calcMax(): Observable<Number | undefined> {
    return this.cartService.getEntries().pipe(
      map((entries) => {
        const cumulatedEntryCount = entries
          .filter((entry) => entry.sku === this.product?.sku)
          .map((entry) => entry.quantity)
          .reduce((a: number, b) => a + b, 0);
        return this.product?.availability?.quantity
          ? this.product?.availability?.quantity - cumulatedEntryCount
          : undefined;
      })
    );
  }
}
