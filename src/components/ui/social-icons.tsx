'use client';

import { cn } from '@/lib/utils';
import { Icons } from '@/icons';

interface SocialIconsProps {
  className?: string;
  email?: string;
  github?: string;
  wordpress?: string;
  codepen?: string;
  linkedin?: string;
  website?: string;
}

export function SocialIcons({
  className,
  email,
  github,
  wordpress,
  codepen,
  linkedin,
  website,
}: SocialIconsProps) {
  const iconClass =
    'relative group border border-gray-400 dark:border-white dark:hover:border-gray-300 rounded-full p-3 hover:border-gray-600 dark:hover:border-gray-300 hover:text-current transition-colors cursor-pointer';

  return (
    <div className={cn('flex gap-4 items-center', className)}>
      {github && (
        <a
          href={github}
          className={iconClass}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Icons.github className="w-6 h-6" />
          <span className="tooltip-text absolute left-0 -translate-x-0 -bottom-10 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-50 transition-opacity whitespace-nowrap">
            {github}
          </span>
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="LinkedIn"
        >
          <Icons.linkedin className="w-6 h-6" />
          <span className="tooltip-text absolute left-0 -translate-x-0 -bottom-10 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-50 transition-opacity whitespace-nowrap">
            {linkedin}
          </span>
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Personal Website"
        >
          <Icons.browser className="w-6 h-6" />
          <span className="tooltip-text absolute left-0 -translate-x-0 -bottom-10 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-50 transition-opacity whitespace-nowrap">
            {website}
          </span>
        </a>
      )}
    </div>
  );
}
