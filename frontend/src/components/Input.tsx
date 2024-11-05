import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';
import { Simplify } from '../utils.ts';

const input = tv({
  slots: {
    wrapper: 'flex flex-col gap-2',
    label: 'text-sm font-sans text-text-primary',
    inputWrapper: 'relative flex items-center',
    icon: 'absolute flex items-center text-gray-placeholder pointer-events-none',
    input: [
      'w-full',
      'transition-all duration-200',
      'disabled:cursor-not-allowed',
      'placeholder:text-gray-placeholder',
      ' focus:outline-none focus:border-primary',
    ],
  },
  variants: {
    size: {
      sm: {
        input: 'text-base py-2 px-3',
        icon: 'left-3',
      },
      md: {
        input: 'text-lg py-3 px-6',
        icon: 'left-6',
      },
      lg: {
        input: 'text-xl py-4 px-8',
        icon: 'left-8',
      },
    },
    variant: {
      outlined: {
        input: 'border border-border-color rounded',
      },
      flat: {
        input: 'border-none font-light',
      },
    },
    hasIcon: {
      true: {},
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      hasIcon: true,
      class: {
        input: 'pl-8',
      },
    },
    {
      size: 'md',
      hasIcon: true,
      class: {
        input: 'pl-14',
      },
    },
    {
      size: 'lg',
      hasIcon: true,
      class: {
        input: 'pl-20',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outlined',
  },
});

type InputVariants = VariantProps<typeof input>;

type BaseProps = Omit<InputVariants, 'hasIcon'> & {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
};

type Props = Simplify<BaseProps & Omit<React.ComponentProps<'input'>, keyof BaseProps>>;

export function Input({ size, icon, label, variant, className, ...rest }: Props) {
  const {
    wrapper,
    label: labelClass,
    inputWrapper,
    icon: iconClass,
    input: inputClass,
  } = input({
    size,
    variant,
    hasIcon: !!icon,
  });

  return (
    <div className={wrapper({ className })}>
      {label && <label className={labelClass()}>{label}</label>}
      <div className={inputWrapper()}>
        {icon && <div className={iconClass()}>{icon}</div>}
        <input className={inputClass()} {...rest} />
      </div>
    </div>
  );
}
