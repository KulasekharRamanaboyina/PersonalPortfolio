import React from 'react';
import Image from 'next/image';
import { Project } from '../../constants/projects';
import GlassCard from './GlassCard';
import Button from './Button';
import { GithubIcon, GlobeIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <GlassCard hoverEffect className="flex flex-col h-full overflow-hidden border border-neutral-100 p-0 bg-white">
      {/* Image Container with zoom parallax on hover */}
      <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-neutral-100 group">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold font-body uppercase tracking-wider bg-neutral-100 text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h4 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">
          {project.title}
        </h4>

        {/* Description */}
        <p className="font-body text-xs md:text-sm text-neutral-500 mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 mt-auto">
          {project.liveUrl && project.liveUrl !== '#projects' && (
            <Button
              asLink
              href={project.liveUrl}
              target="_blank"
              variant="primary"
              className="flex-1 text-xs py-2 h-9"
              magneticStrength={0.1}
            >
              <GlobeIcon className="w-3.5 h-3.5 mr-1.5" /> Live
            </Button>
          )}
          <Button
            asLink
            href={project.githubUrl}
            target="_blank"
            variant="outline"
            className="flex-1 text-xs py-2 h-9"
            magneticStrength={0.1}
          >
            <GithubIcon className="w-3.5 h-3.5 mr-1.5" /> Code
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
