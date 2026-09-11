import {useEffect} from 'react';

import {SectionId} from '../data/data';

export const useNavObserver = (selectors: string, handler: (section: SectionId | null) => void) => {
  useEffect(() => {
    // Get all sections
    const headings = document.querySelectorAll(selectors);

    // Create the IntersectionObserver API.
    //
    // The root is narrowed to a thin band just below the fixed header, and any overlap counts
    // (threshold 0). Using a ratio threshold instead breaks sections taller than the band: a
    // section much taller than the band can never reach a given ratio, so e.g. the very tall
    // Resume section never reported as intersecting in either scroll direction.
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handler(entry.target.getAttribute('id') as SectionId);
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -88% 0px',
        threshold: 0,
      },
    );

    // Observe all the Sections
    headings.forEach(section => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency here is the post content.
};
