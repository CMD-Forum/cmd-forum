import { unstable_flag as flag } from '@vercel/flags/next';
 
export const showDevelopmentWarning = flag({
  key: 'showDevelopmentWarning',
  decide: () => true,
});

export const enableSettings = flag({
    key: 'enableSettings',
    decide: () => true,
});

export const enableHomepage = flag({
    key: 'enableHomepage',
    decide: () => false,
});

export const enableMaintenanceBanner = flag({
    key: 'enableMaintenanceBanner',
    decide: () => false,
});