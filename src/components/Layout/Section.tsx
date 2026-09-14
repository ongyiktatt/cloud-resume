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
    /** Vertical padding. Defaults to the site-wide rhythm, so most sections need not set it. */
    paddingYClassName?: string;
  }>
> = memo(
  ({
    children,
    sectionId,
    noPadding = false,
    className,
    maxWidthClassName = 'max-w-screen-lg',
    paddingYClassName = 'py-16 md:py-24',
  }) => {
    return (
      <section
        className={classNames(className, !noPadding && 'px-4 lg:px-8', !noPadding && paddingYClassName)}
        id={sectionId}>
        <div className={noPadding ? undefined : classNames('mx-auto', maxWidthClassName)}>{children}</div>
      </section>
    );
  },
);

Section.displayName = 'Section';
export default Section;
