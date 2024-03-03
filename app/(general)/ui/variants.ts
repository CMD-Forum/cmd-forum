import { tv } from 'tailwind-variants';

export const button = tv({
    base: 'navlink',
    variants: {
        type: {
            'normal': '',
            'full': 'navlink-full',
            'ghost': 'navlink-ghost',
            'destructive': 'navlink-destructive',
            'success': 'navlink-success',
            'sidebar': 'navlink-sidebar'
        },
        size: {
            'normal': '',
            'small': 'navlink-small',
        }
    },
    defaultVariants: {
      type: 'normal',
      size: 'normal',
    }
});
   