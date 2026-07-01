import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-panel rounded-2xl p-6 transition-all duration-500',
        hoverEffect && 'hover:scale-[1.02] hover:shadow-lg hover:border-navy/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
