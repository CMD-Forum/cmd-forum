import { unstable_flag as flag } from '@vercel/flags/next';
 
export const showDevelopmentWarning = flag({
  key: 'show-development-warning',
  decide: () => true,
});

export const enableSettings = flag({
    key: 'enable-settings',
    decide: () => true,
});

export const enableHomepage = flag({
    key: 'enable-homepage',
    decide: () => true,
});

export const enableMaintenanceBanner = flag({
    key: 'enable-maintenance-banner',
    decide: () => false,
});