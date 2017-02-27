import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { bootloader } from '@angularclass/hmr';

import { TappsModule } from './tapps/tapps.module';

/* Global Styles */
import './styles/index.css';

if (process.env.ENV === 'production') {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(TappsModule);
}

// Boot on document ready
bootloader(main);