import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, Fragment, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';

import {isMobile} from '../../config';
import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section
      className="border-t border-neutral-700 bg-neutral-800"
      maxWidthClassName="max-w-screen-2xl"
      sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        <div className="flex w-full flex-wrap justify-center">
          {portfolioItems.map((item, index) => {
            const {title, image} = item;
            return (
              <div className="w-1/2 p-3 md:w-1/3 lg:w-1/4" key={`${title}-${index}`}>
                <div
                  className={classNames(
                    'relative w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
                    // A text card fills the row height so cards of unequal text length still line up.
                    // An image card keeps its natural height, so the image is never stretched.
                    image ? 'h-max' : 'h-full',
                  )}>
                  {image ? (
                    <>
                      <Image alt={title} className="h-full w-full" placeholder="blur" src={image} />
                      <ItemOverlay item={item} />
                    </>
                  ) : (
                    <ItemCard item={item} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

/** Stack line: separators are added, and each entry is kept whole so it cannot break across lines. */
const TechList: FC<{tech: string | string[]}> = memo(({tech}) => (
  <p className="text-xs font-medium tracking-wide text-orange-400">
    {Array.isArray(tech)
      ? tech.map((entry, index) => (
          <Fragment key={entry}>
            {index > 0 && ' · '}
            <span className="whitespace-nowrap">{entry}</span>
          </Fragment>
        ))
      : tech}
  </p>
));

TechList.displayName = 'TechList';

const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {url, title, description, tech}}) => {
  const [mobile, setMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);
  useDetectOutsideClick(linkRef, () => setShowOverlay(false));

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (mobile && !showOverlay) {
        event.preventDefault();
        setShowOverlay(!showOverlay);
      }
    },
    [mobile, showOverlay],
  );

  return (
    <a
      className={classNames(
        'absolute inset-0 h-full w-full  bg-gray-900 transition-all duration-300',
        {'opacity-0 hover:opacity-80': !mobile},
        showOverlay ? 'opacity-80' : 'opacity-0',
      )}
      href={url}
      onClick={handleItemClick}
      ref={linkRef}
      rel="noopener noreferrer"
      target="_blank">
      <div className="relative h-full w-full p-4">
        <div className="flex h-full w-full flex-col gap-y-2 overflow-y-auto overscroll-contain">
          <h2 className="text-center font-bold text-white opacity-100">{title}</h2>
          <p className="text-xs text-white opacity-100 sm:text-sm">{description}</p>
          {tech && <TechList tech={tech} />}
        </div>
        <ArrowTopRightOnSquareIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
      </div>
    </a>
  );
});

/** Text-only card, used for a portfolio item that has no image to show. */
const ItemCard: FC<{item: PortfolioItem}> = memo(({item: {url, title, description, tech}}) => {
  // With no url the card is deliberately not a link: no dead anchor, and no arrow promising a
  // destination. Giving the item a url makes this same card clickable.
  if (url) {
    return (
      <a
        className="flex h-full w-full flex-col gap-y-2 bg-gray-900 p-4 transition-colors duration-300 hover:bg-gray-800"
        href={url}
        rel="noopener noreferrer"
        target="_blank">
        <h2 className="font-bold text-white">{title}</h2>
        <p className="text-xs text-white sm:text-sm">{description}</p>
        {/* The stack sits on the card's bottom edge so it lines up across cards whose text runs to
            different lengths. The arrow shares the row and rides the stack's last line. */}
        <div className="mt-auto flex w-full items-end gap-x-2">
          {tech && <TechList tech={tech} />}
          <ArrowTopRightOnSquareIcon className="ml-auto h-4 w-4 shrink-0 text-white" />
        </div>
      </a>
    );
  }
  return (
    <div className="flex h-full w-full flex-col gap-y-2 bg-gray-900 p-4">
      <h2 className="font-bold text-white">{title}</h2>
      <p className="text-xs text-white sm:text-sm">{description}</p>
      <div className="mt-auto flex w-full items-end gap-x-2">{tech && <TechList tech={tech} />}</div>
    </div>
  );
});

ItemCard.displayName = 'ItemCard';
