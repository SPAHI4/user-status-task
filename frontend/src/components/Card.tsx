import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return <div className={`bg-white rounded shadow-lg ${className ?? ''}`}>{children}</div>;
}
