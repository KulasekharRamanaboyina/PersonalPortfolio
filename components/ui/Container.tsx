import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
