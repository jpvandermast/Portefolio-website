import React from 'react';
import { Link } from 'react-router';
import { ImageIcon } from 'lucide-react';
import type { StoryOverviewItem } from '../types';
import { publicUrl } from '../lib/stories';
import { LuBadges, TypeBadge } from './StoryBadges';

export const StoryCard: React.FC<{ story: StoryOverviewItem }> = ({ story }) => (
  <Link
    to={`/stories/${story.slug}`}
    className="group block bg-[#f6f7f8] rounded-[6px] border border-[#e4e7ea] overflow-hidden hover:border-[#3762AB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762AB]"
  >
    <div className="aspect-[16/9] bg-[#e4e7ea] flex items-center justify-center">
      {story.klein_pad ? (
        <img
          src={publicUrl(story.klein_pad)}
          alt={story.klein_alt ?? ''}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ) : (
        <ImageIcon className="w-8 h-8 text-[#9aa6b2]" aria-hidden="true" />
      )}
    </div>
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <TypeBadge type={story.type} />
        <LuBadges lus={story.lus} />
      </div>
      <h5 className="text-[15px] font-bold text-[#121D2F] leading-snug mb-1.5 group-hover:text-[#3762AB]">
        {story.titel}
      </h5>
      <p className="text-[13px] text-[#4a5b6b] leading-relaxed">{story.korte_versie}</p>
    </div>
  </Link>
);
