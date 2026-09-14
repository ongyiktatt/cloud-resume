import classNames from 'classnames';
import {FC, memo} from 'react';

import {TimelineItem} from '../../../data/dataDef';

const TimelineItemComponent: FC<{item: TimelineItem}> = memo(({item}) => {
  const {title, date, location, content, url, roles, compact} = item;
  return (
    // A compact entry (a certification) is a single line with no body, so it gets far less
    // breathing room than an entry carrying bullet points.
    <div className={classNames('flex flex-col text-center last:pb-0 md:text-left', compact ? 'pb-3' : 'pb-8')}>
      <div className={classNames('flex flex-col', compact ? 'pb-2' : 'pb-4')}>
        <h2 className="text-xl font-bold">
          {url ? (
            <a className="hover:underline" href={url} rel="noopener noreferrer" target="_blank">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <div className="flex items-center justify-center gap-x-2 md:justify-start">
          <span className="flex-1 text-sm font-medium italic sm:flex-none">{location}</span>
          <span>•</span>
          <span className="flex-1 text-sm sm:flex-none">{date}</span>
        </div>
      </div>
      {roles ? (
        <div className="flex flex-col gap-y-6">
          {roles.map((role, index) => (
            <div className="flex flex-col gap-y-2" key={`${role.title}-${index}`}>
              <div className="flex flex-col">
                <h3 className="text-base font-bold">{role.title}</h3>
                <span className="text-sm italic">{role.date}</span>
              </div>
              <div className="text-left">{role.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-left">{content}</div>
      )}
    </div>
  );
});

TimelineItemComponent.displayName = 'TimelineItem';
export default TimelineItemComponent;
