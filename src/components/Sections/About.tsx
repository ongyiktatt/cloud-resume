import classNames from 'classnames';
import Image from 'next/image';
import {FC, Fragment, memo} from 'react';

import {aboutData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  const {profileImageSrc, description, aboutItems} = aboutData;
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.About}>
      <div className={classNames('grid grid-cols-1 gap-y-4', {'md:grid-cols-4': !!profileImageSrc})}>
        {!!profileImageSrc && (
          <div className="col-span-1 flex justify-center md:justify-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32">
              <Image alt="about-me-image" className="h-full w-full object-cover" src={profileImageSrc} />
            </div>
          </div>
        )}
        <div className={classNames('col-span-1 flex flex-col gap-y-6', {'md:col-span-3': !!profileImageSrc})}>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-bold text-white">About me</h2>
            <div className="prose prose-sm text-gray-300 sm:prose-base">{description}</div>
          </div>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            {aboutItems.map(({label, text, Icon}, idx) => (
              <li className="col-span-1 flex items-start gap-x-2" key={idx}>
                {Icon && <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white" />}
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white">{label}</div>
                  <div className="text-sm text-gray-300">
                    {Array.isArray(text)
                      ? text.map((entry, entryIndex) => (
                          <Fragment key={entry}>
                            {entryIndex > 0 && ' · '}
                            <span className="whitespace-nowrap">{entry}</span>
                          </Fragment>
                        ))
                      : text}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
