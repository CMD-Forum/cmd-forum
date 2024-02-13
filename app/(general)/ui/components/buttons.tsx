import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-normal text-sm text-white',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white'
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
});
 
export default function Button( className: any, title: string ) {

    return (

        <button className={className}>
            { title }
        </button>

    );

}
