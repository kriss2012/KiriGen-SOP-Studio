import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40',
        variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-600',
        variant === 'secondary' && 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        variant === 'ghost' && 'text-gray-600 hover:bg-gray-50',
        className,
      )}
      {...props}
    />
  );
}
