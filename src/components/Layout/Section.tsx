import classNames from 'classnames';
import {FC, memo, PropsWithChildren} from 'react';

import {SectionId} from '../../data/data';

const Section: FC<
  PropsWithChildren<{
    sectionId: SectionId;
    sectionTitle?: string;
    noPadding?: boolean;
    className?: string;
    maxWidthClassName?: string;
  }>
> = memo(({children, sectionId, noPadding = false, className, maxWidthClassName = 'max-w-screen-lg'}) => {
  return (
    <section className={classNames(className, {'px-4 py-16 md:py-24 lg:px-8': !noPadding})} id={sectionId}>
      <div className={noPadding ? undefined : classNames('mx-auto', maxWidthClassName)}>{children}</div>
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
