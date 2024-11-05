import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Simplify } from '../utils.ts';

const select = tv({
  slots: {
    wrapper: 'flex flex-col gap-2',
    label: 'text-sm text-text-primary font-sans',
    select: [
      'w-full',
      'rounded',
      'transition-all duration-200',
      'text-text-primary bg-white',
      'cursor-pointer',
      'focus:outline-none focus:border-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'appearance-none', // Remove default arrow
      "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDYgMTEgMSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]",
    ],
  },
  variants: {
    size: {
      sm: {
        select: 'py-2 px-3 text-sm pr-6',
      },
      md: {
        select: 'py-3 px-4 text-base pr-10',
      },
      lg: {
        select: 'py-4 px-8 text-lg font-light pr-12',
      },
    },
    variant: {
      outlined: {
        select: 'border border-border-color',
      },
      flat: {
        select: 'border-none pl-0 text-gray-500',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outlined',
  },
});

type BaseProps = VariantProps<typeof select> & {
  label?: string;
  className?: string;
  children: React.ReactNode;
};

type Props = Simplify<BaseProps & Omit<React.ComponentProps<'select'>, keyof BaseProps>>;

export function Select({ size, label, className, variant, children, ...rest }: Props) {
  const { wrapper, label: labelClass, select: selectClass } = select({ size, variant });

  return (
    <div className={wrapper({ className })}>
      {label && <label className={labelClass()}>{label}</label>}
      <select className={selectClass()} {...rest}>
        {children}
      </select>
    </div>
  );
}
