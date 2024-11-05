import React from 'react';

interface VerticalDividerProps extends React.ComponentProps<'div'> {
  className?: string;
}

export function VerticalDivider({ className, ...props }: VerticalDividerProps) {
  return <div className={`border-l border-border-color h-[calc(100%-32px)] my-4 ${className ?? ''}`} {...props} />;
}
