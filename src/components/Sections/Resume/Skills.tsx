import {CSSProperties, FC, memo, PropsWithChildren, useEffect, useMemo, useRef, useState} from 'react';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  return (
    <div className="flex flex-col">
      <span className="text-center text-lg font-bold">{name}</span>
      <div className="flex flex-col gap-y-2">
        {skills.map((skill, index) => (
          <Skill key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
});

SkillGroup.displayName = 'SkillGroup';

export const Skill: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name, level, max = 10} = skill;
  const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);
  const trackRef = useRef<HTMLDivElement>(null);
  // The bar starts empty and fills the first time its track scrolls into view, so the fill is the
  // first thing drawn rather than a reset from full width. It stays filled once triggered.
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    // Nothing to observe, or no observer available: show the finished bar.
    if (!track || typeof IntersectionObserver === 'undefined') {
      setFilled(true);
      return;
    }
    // A reduced-motion preference means no animation, so jump straight to the finished bar.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFilled(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setFilled(true);
          observer.disconnect();
        }
      },
      {threshold: 0.5},
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // --skill-fill drives the rendered width, while --skill-level always holds the real level so the
  // stylesheet can fall back to it when scripting is disabled.
  const barStyle = useMemo(
    () =>
      ({
        '--skill-fill': filled ? `${percentage}%` : '0%',
        '--skill-level': `${percentage}%`,
      }) as CSSProperties,
    [filled, percentage],
  );

  return (
    <div className="flex flex-col">
      <span className="ml-2 text-sm font-medium">{name}</span>
      <div className="h-5 w-full overflow-hidden rounded-full bg-neutral-300" ref={trackRef}>
        <div
          className="h-full w-[var(--skill-fill)] rounded-full bg-orange-400 transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          data-skill-bar=""
          style={barStyle}
        />
      </div>
    </div>
  );
});

Skill.displayName = 'Skill';
