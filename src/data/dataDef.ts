import {StaticImageData} from 'next/image';
import {FC, ForwardRefExoticComponent, SVGProps} from 'react';

import {IconProps} from '../components/Icon/Icon';

export interface HomepageMeta {
  title: string;
  description: string;
  ogImageUrl?: string;
  twitterCardType?: 'summary' | 'summary_large';
  twitterTitle?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterDomain?: string;
  twitterUrl?: string;
  twitterDescription?: string;
  twitterImageUrl?: string;
}

/**
 * Hero section
 */
export interface Hero {
  imageSrc: string;
  name: string;
  description: JSX.Element;
  actions: HeroActionItem[];
}

interface HeroActionItem {
  href: string;
  text: string;
  primary?: boolean;
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/**
 * About section
 */
export interface About {
  profileImageSrc?: string;
  description: JSX.Element;
  aboutItems: AboutItem[];
}

export interface AboutItem {
  label: string;
  /**
   * A single value, or a list. A list renders as one wrapping line with `·` between
   * entries and each entry kept whole, so a phrase like "ITIL 4 Foundation" never breaks
   * across two lines. Use a list rather than a `·`-joined string: the separators cannot be
   * mistyped, and the browser gets no break opportunity inside an entry.
   */
  text: string | string[];
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/**
 * Stat section
 */
export interface Stat {
  title: string;
  value: number;
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/**
 * Skills section
 */

export interface Skill {
  name: string;
  level: number;
  max?: number;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

/**
 * Portfolio section
 */
export interface PortfolioItem {
  title: string;
  description: string;
  /** Optional: without a url the card is not a link and shows no external-link arrow. */
  url?: string;
  /** Optional: an item with no image renders as a text-only card. */
  image?: string | StaticImageData;
  /**
   * Optional stack line, rendered under the description. A list gets `·` separators added and
   * each entry is kept whole, so a name like "MikroTik (RouterOS)" cannot break across lines.
   */
  tech?: string | string[];
}

/**
 * Resume section
 */
export interface TimelineRole {
  title: string;
  date: string;
  content: JSX.Element;
}

export interface TimelineItem {
  date: string;
  location: string;
  title: string;
  url?: string;
  /** The entry body, for an entry that is a single role. */
  content?: JSX.Element;
  /**
   * Roles held at one organisation, most recent first. Renders instead of `content`, and makes
   * `title` the organisation — so a promotion reads as one continuous period with progression
   * rather than as two separate jobs.
   */
  roles?: TimelineRole[];
}

/**
 * Contact section
 */
export interface ContactSection {
  headerText?: string;
  description?: string;
  items: ContactItem[];
}

export const ContactType = {
  Email: 'Email',
  Phone: 'Phone',
  Location: 'Location',
  Github: 'Github',
  LinkedIn: 'LinkedIn',
  Facebook: 'Facebook',
  Twitter: 'Twitter',
  Instagram: 'Instagram',
} as const;

export type ContactType = (typeof ContactType)[keyof typeof ContactType];

export interface ContactItem {
  type: ContactType;
  text: string;
  href?: string;
}

export interface ContactValue {
  Icon: FC<IconProps> | ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
  srLabel: string;
}

/**
 * Social items
 */
export interface Social {
  label: string;
  Icon: FC<IconProps>;
  href: string;
}
