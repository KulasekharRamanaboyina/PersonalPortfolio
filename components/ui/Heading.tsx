import React from 'react';
import { cn } from '../../lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className,
  ...props
}) => {
  const Tag = `h${level}` as const;

  const styles = {
    1: 'font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground leading-[1.05]',
    2: 'font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight',
    3: 'font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-snug',
    4: 'font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground',
    5: 'font-heading text-lg sm:text-xl font-medium tracking-tight text-foreground',
    6: 'font-heading text-base font-medium tracking-tight text-foreground',
  };

  return (
    <Tag className={cn(styles[level], className)} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
