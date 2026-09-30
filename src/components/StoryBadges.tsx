import React from 'react';
import { LU_LABELS, STORY_TYPE_LABELS } from '../lib/stories';
import type { StoryTypeCode } from '../types';

export const TypeBadge: React.FC<{ type: StoryTypeCode }> = ({ type }) => (
  <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#eaf0fa] text-[#2b4d87] border border-[#3762AB]/30">
    {STORY_TYPE_LABELS[type]}
  </span>
);

export const LuBadges: React.FC<{ lus: number[] }> = ({ lus }) =>
  lus.length === 0 ? null : (
    <>
      {lus.map((lu) => (
        <span
          key={lu}
          title={`LU${lu} ${LU_LABELS[lu] ?? ''}`.trim()}
          className="px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#121D2F] text-white"
        >
          LU{lu}
        </span>
      ))}
    </>
  );
