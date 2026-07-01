'use client';

import React from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useCursor } from '../../providers/CursorProvider';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  magnetic?: boolean;
  magneticStrength?: number;
  asLink?: boolean;
  href?: string;
  download?: boolean | string;
  target?: string;
}

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      magnetic = true,
      magneticStrength = 0.25,
      asLink = false,
      href,
      download,
      target,
      ...props
    },
    ref
  ) => {
    // If magnetic is true, initialize hook. Otherwise, pass a dummy or bypass.
    const internalRef = useMagnetic<any>(magnetic ? magneticStrength : 0);
    const { setCursorType } = useCursor();

    const baseStyles =
      'inline-flex items-center justify-center font-body font-medium transition-all duration-300 rounded-full select-none cursor-pointer';

    const variantStyles = {
      primary:
        'bg-navy text-white hover:bg-black px-7 py-3.5 text-sm sm:text-base border border-navy hover:border-black shadow-sm',
      secondary:
        'bg-[#0F0F0F] text-white hover:bg-navy px-7 py-3.5 text-sm sm:text-base border border-[#0F0F0F] hover:border-navy',
      outline:
        'bg-transparent text-foreground hover:text-white hover:bg-navy px-7 py-3.5 text-sm sm:text-base border border-neutral-200 hover:border-navy',
      ghost:
        'bg-transparent text-foreground hover:bg-neutral-50 px-5 py-2.5 text-sm sm:text-base',
    };

    const handleMouseEnter = () => {
      setCursorType('magnetic');
    };

    const handleMouseLeave = () => {
      setCursorType('default');
    };

    const renderProps = {
      ref: magnetic ? internalRef : ref,
      className: cn(baseStyles, variantStyles[variant], className),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };

    if (asLink && href) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          {...(renderProps as any)}
          {...(props as any)}
        >
          {children}
        </a>
      );
    }

    return (
      <button {...renderProps} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
