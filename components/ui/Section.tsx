import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  bg?: 'white' | 'mesh';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  bg = 'white',
  ...props
}) => {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-20 md:py-28 lg:py-36 overflow-hidden',
        bg === 'mesh' && 'mesh-gradient',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
