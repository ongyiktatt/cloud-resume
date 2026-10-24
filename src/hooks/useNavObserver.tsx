import {useEffect} from 'react';

import {SectionId} from '../data/data';

export const useNavObserver = (selectors: string, handler: (section: SectionId | null) => void) => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(selectors));
    const lastSection = sections[sections.length - 1];

    const update = () => {
      if (!lastSection) {
        return;
      }

      // The last section is usually shorter than the viewport, so the page can run out of scroll
      // before its top reaches the detection line. Without this rule a tall window left the
      // *previous* section highlighted at the bottom — clicking "Contact" kept "Portfolio" lit.
      const scrollable = document.documentElement.scrollHeight > window.innerHeight;
      const atBottom =
        scrollable && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;

      // A single detection line just below the fixed header, rather than a band judged by
      // intersection ratio: a section much taller than the band can never reach a given ratio, so
      // the very tall Resume section was never reported. Whichever section the line falls in wins.
      const line = window.innerHeight * 0.11;
      const current = atBottom
        ? lastSection
        : sections.find(section => {
            const {bottom, top} = section.getBoundingClientRect();
            return top <= line && bottom > line;
          });

      // The hero sits above the first section, so at the very top the line belongs to none of
      // them. Keep the last known section then, as before, instead of clearing the highlight.
      if (current) {
        handler(current.getAttribute('id') as SectionId);
      }
    };

    // Correct on mount too: a hash load or a restored scroll position emits no scroll event.
    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency here is the post content.
};
