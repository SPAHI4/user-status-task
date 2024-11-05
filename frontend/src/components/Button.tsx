import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';
import { Simplify } from '../utils.ts';

const button = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded',
    'transition-all duration-200',
    'hover:brightness-110 active:brightness-90',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  variants: {
    variant: {
      contained: 'bg-primary text-white',
      outlined: 'bg-transparent border border-primary text-primary',
    },
    size: {
      sm: 'text-sm font-normal py-2 px-3 gap-2',
      md: 'text-lg font-semibold py-2 px-6 gap-2',
      lg: 'text-xl font-semibold py-3 px-6 gap-3',
    },
  },
  defaultVariants: {
    variant: 'contained',
    size: 'md',
  },
});

type BaseProps = VariantProps<typeof button> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
};

type Props = Simplify<BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button(props: Props) {
  const { children, variant, size, loading = false, loadingText = 'Loading...', icon, ...rest } = props;

  return (
    <button disabled={loading} className={button({ variant, size })} {...rest}>
      {loading ? (
        loadingText
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
}
