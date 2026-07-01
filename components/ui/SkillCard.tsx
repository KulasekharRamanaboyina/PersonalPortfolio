import React from 'react';
import GlassCard from './GlassCard';

interface SkillCardProps {
  name: string;
  icon?: React.ReactNode;
}

export const SkillCard: React.FC<SkillCardProps> = ({ name, icon }) => {
  return (
    <GlassCard
      hoverEffect={false}
      className="flex items-center gap-4 py-4 px-6 border border-neutral-100 bg-white hover:border-navy/30 hover:-translate-y-[6px] hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(11,61,145,0.15)] transition-all duration-300 ease-out"
    >
      {icon && (
        <div className="text-navy w-5 h-5 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      )}
      <span className="font-heading font-semibold text-xs sm:text-sm md:text-base text-foreground tracking-wider uppercase">
        {name}
      </span>
    </GlassCard>
  );
};

export default SkillCard;
