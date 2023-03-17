import { appBuilder } from '@spryker-oryx/core';
import { b2cFeatures } from '@spryker-oryx/presets';
import { storefrontTheme } from '@spryker-oryx/themes';
import { productStockNotification } from './custom-component/stock-notification.def';
export const app = appBuilder()
  .withEnvironment(import.meta.env)
  .withFeature(b2cFeatures)
  .withTheme(storefrontTheme)

  // some custom theme colors
  .withTheme({
    name: 'demo',
    designTokens: [{ color: { primary: { 300: 'hotpink' } } }],
  })

  .withComponents([productStockNotification])

  .create();
