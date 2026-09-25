import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  MapIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/header-background.jpg';
import profilepic from '../images/profilepic.jpg';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Yik Tatt Ong | IT Manager, APAC — Regional IT Operations',
  description:
    'Regional IT manager in Singapore with 12+ years in enterprise IT — multi-country operations across Singapore, Japan and South Korea, vendor and SLA governance, identity and hybrid-cloud oversight.',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: 'Yik Tatt Ong',
  description: (
    <>
      <p className="text-lg font-semibold text-orange-400 sm:text-xl lg:text-2xl">
        IT Manager, APAC · Regional IT Operations · Infrastructure, Identity &amp; Cloud Governance
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        AWS Certified Solutions Architect – Associate · AWS Certified CloudOps Engineer – Associate · AWS Certified
        Cloud Practitioner · ITIL 4 Foundation
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I keep enterprise infrastructure up — on-prem, in co-location, and in AWS — then automate the parts that
        shouldn't need a human.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        <strong>12+ years in enterprise IT</strong> across Singapore and the APAC region — multi-country operations for
        200 users, a S$100K regional budget, and vendor and SLA accountability across three markets.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Open to <strong>IT Manager, IT Infrastructure Manager and IT Operations Manager</strong> roles in Singapore.
        Available for interviews immediately; available to start January 2027.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/Resume_Ong%20Yik%20Tatt.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: (
    <>
      <p>
        I've spent 12+ years keeping enterprise infrastructure running — data centre migrations into Tier-3 co-location
        under a S$2M programme, and regional IT operations for 200 users across Singapore, Japan and South Korea.
      </p>
      <p>Three AWS certifications in 2026, studied alongside my current role.</p>
      <p>
        This site runs on the stack I built and hardened — S3 and CloudFront behind a WAF, released by GitHub Actions
        with OIDC and no stored access keys.
      </p>
      <p>Off the clock: cameras, hi-fi audio, and tinkering with the homelab.</p>
    </>
  ),
  aboutItems: [
    {label: 'Location', text: 'Singapore', Icon: MapIcon},
    {label: 'Education', text: 'Temasek Polytechnic', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Wargaming Asia', Icon: BuildingOffice2Icon},
    {
      label: 'Certifications',
      text: ['AWS SAA', 'CloudOps', 'Cloud Practitioner', 'ITIL 4 Foundation'],
      Icon: ShieldCheckIcon,
    },
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Leadership & Regional Delivery',
    skills: [
      {
        name: 'Multi-Country IT Operations (SG · JP · KR)',
        level: 9,
      },
      {
        name: 'IT Budget Ownership (S$100K opex)',
        level: 8,
      },
      {
        name: 'Team Structuring & Capability Building',
        level: 8,
      },
      {
        name: 'ITIL 4 Service Management',
        level: 8,
      },
    ],
  },
  {
    name: 'Vendor & SLA Governance',
    skills: [
      {
        name: 'Vendor Performance & SLA Compliance',
        level: 9,
      },
      {
        name: 'Contract, Renewal & Escalation Management',
        level: 8,
      },
      {
        name: 'Outsourced Service Delivery',
        level: 9,
      },
      {
        name: 'Stakeholder Management',
        level: 8,
      },
    ],
  },
  {
    name: 'Identity & Access Management',
    skills: [
      {
        name: 'Microsoft Entra ID (Azure AD)',
        level: 9,
      },
      {
        name: 'Microsoft Intune',
        level: 9,
      },
      {
        name: 'Conditional Access',
        level: 8,
      },
      {
        name: 'Microsoft 365',
        level: 8,
      },
      {
        name: 'AWS IAM',
        level: 7,
      },
    ],
  },
  {
    name: 'Cloud & Infrastructure Oversight',
    skills: [
      {
        name: 'AWS (VPC, EC2, S3, Route 53)',
        level: 8,
      },
      {
        name: 'AWS Serverless & Edge (Lambda, CloudFront, WAF)',
        level: 7,
      },
      {
        name: 'Least-Privilege & Compliance Baselines',
        level: 8,
      },
      {
        name: 'Release Credential Hygiene (OIDC, no stored keys)',
        level: 8,
      },
    ],
  },
  {
    name: 'Networking & Security',
    skills: [
      {
        name: 'TCP/IP & DNS',
        level: 9,
      },
      {
        name: 'Routing & Switching',
        level: 8,
      },
      {
        name: 'VLANs & Network Segmentation',
        level: 8,
      },
      {
        name: 'Firewall Administration (F5, Palo Alto, Check Point)',
        level: 8,
      },
      {
        name: 'MikroTik (RouterOS) & WireGuard VPN',
        level: 8,
      },
    ],
  },
  {
    name: 'Systems, Automation & Scripting',
    skills: [
      {
        name: 'Windows · macOS · Linux (Debian)',
        level: 8,
      },
      {
        name: 'Docker & Proxmox VE',
        level: 8,
      },
      {
        name: 'PowerShell',
        level: 9,
      },
      {
        name: 'Git & GitHub Actions',
        level: 8,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Portfolio site on AWS (this site)',
    description:
      'Built and hardened this site on AWS: static export on S3 + CloudFront behind a WAF, released by GitHub Actions with OIDC role assumption so no long-lived access keys exist in the delivery path, plus a serverless Lambda + SNS contact form.',
    tech: ['S3', 'CloudFront', 'WAF', 'Lambda', 'SNS', 'GitHub Actions (OIDC)'],
    url: 'https://github.com/ongyiktatt/cloud-resume',
  },
  {
    title: 'Virtualisation & Networking Homelab',
    description:
      'Multi-site lab on Proxmox VE: Debian VMs and containerised workloads, MikroTik routing with VLAN segmentation and WireGuard tunnels, plus self-hosted DNS and remote access — where I validate network and infrastructure changes before they matter.',
    tech: ['Proxmox VE', 'Debian', 'Docker', 'MikroTik (RouterOS)', 'WireGuard', 'VLANs'],
  },
];

/**
 * Resume section
 */
export const certification: TimelineItem[] = [
  {
    date: 'August 2026',
    location: 'AWS',
    title: 'AWS Certified CloudOps Engineer - Associate',
    url: 'https://www.credly.com/badges/209df12d-e120-4509-ad16-6c4d6fa05ca8/linked_in_profile',
    compact: true,
    content: <></>,
  },
  {
    date: 'July 2026',
    location: 'AWS',
    title: 'AWS Certified Solutions Architect - Associate',
    url: 'https://www.credly.com/badges/b03143a4-ab95-45ea-93f4-068addd79ec6/linked_in_profile',
    compact: true,
    content: <></>,
  },
  {
    date: 'May 2026',
    location: 'AWS',
    title: 'AWS Certified Cloud Practitioner',
    url: 'https://www.credly.com/badges/46c9f759-e3bc-42ae-8cab-73fd6da6f8ac/linked_in_profile',
    compact: true,
    content: <></>,
  },
  {
    // Optional. Keep only if you are comfortable showing an in-progress credential
    // on a public page. It is labelled clearly and carries no verification link.
    date: 'In progress',
    location: 'Microsoft',
    title: 'Azure Administrator Associate (AZ-104)',
    compact: true,
    content: <></>,
  },
  {
    date: 'May 2021',
    location: 'ITIL',
    title: 'ITIL 4 Foundation',
    url: 'https://www.peoplecert.org/for-corporations/certificate-verification-service',
    compact: true,
    content: <span className="block text-center md:text-left">Credential ID: GR671273878OY</span>,
  },
];

export const education: TimelineItem[] = [
  {
    date: 'September 2020 - October 2022',
    location: 'Temasek Polytechnic, Singapore',
    title: 'Diploma in Infocomm and Digital Media',
    content: <></>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'February 2023 - December 2026',
    location: 'Singapore',
    title: 'Wargaming Asia',
    roles: [
      {
        title: 'IT Manager, APAC',
        date: 'May 2025 - December 2026',
        content: (
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li>
              Own regional IT operations across Singapore, Japan and South Korea as the{' '}
              <strong>sole internal IT resource in the Singapore regional office</strong> — S$100K annual operating
              budget, vendor performance and SLA compliance
            </li>
            <li>
              <strong>Direct vendor-supplied engineers in Japan and South Korea</strong> — setting work priorities,
              reviewing weekly service metrics and holding response and resolution targets across separate vendor
              ecosystems
            </li>
            <li>
              Remain hands-on in Singapore: endpoint compliance, identity and access management, network and unified
              communications
            </li>
            <li>
              Lead local validation, pilot deployment and regional rollout of global IT initiatives for 200 users across
              three markets
            </li>
            <li>
              <strong>Redesigned service desk workflows and introduced proactive endpoint monitoring</strong>, cutting
              recurring incident escalations by 20%
              {/* TODO: convert to absolute figure, e.g. "from X to Y tickets per month" */}
            </li>
          </ul>
        ),
      },
      {
        title: 'IT Specialist, APAC',
        date: 'February 2023 - May 2025',
        content: (
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li>
              Administered endpoint compliance and configuration baselines for a mixed Windows and macOS fleet using{' '}
              <strong>Microsoft Intune, Microsoft Entra ID and Conditional Access</strong>
            </li>
            <li>
              <strong>Built PowerShell automation to validate Secure Boot certificates and deploy language packs</strong>,
              cutting manual device setup time by 20%
              {/* TODO: convert to absolute figure, e.g. "from X to Y minutes per device" */}
            </li>
            <li>
              Owned end-to-end identity access lifecycles — user provisioning, group management, least-privilege access
              and offboarding
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    date: 'June 2022 - February 2023',
    location: 'Tabsquare.ai',
    title: 'Operations Manager',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          <strong>Restructured an 8-person support team into two specialised units</strong> — Project Delivery and
          Technical Support — separating deployment work from reactive maintenance and cutting client deployment time by
          20%
        </li>
        <li>
          <strong>Standardised end-to-end client onboarding and transferred ownership to autonomous team leads</strong>,
          lifting client onboarding capacity by 40%
        </li>
        <li>
          Partnered with Product Engineering on deployment feedback and recurring defect trends, feeding live operating
          issues into product release planning
        </li>
        <li>
          Designed and delivered technical training in{' '}
          <strong>IP networking, OS virtualisation and database fundamentals</strong>
        </li>
      </ul>
    ),
  },
  {
    date: 'May 2021 - June 2022 (Contract)',
    location: 'SAFRA',
    title: 'IT Infrastructure Lead',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          <strong>Led data centre migration as part of a S$2M digital transformation</strong>, moving core enterprise
          applications — including Microsoft Dynamics AX ERP and gaming systems — into Tier-3 co-location facilities
          with minimal production downtime
        </li>
        <li>
          Administered identity and access management across{' '}
          <strong>Microsoft Entra ID, Microsoft 365 and AWS IAM</strong> — least-privilege access control, user
          provisioning and group management
        </li>
        <li>
          Directed a <strong>S$100K dedicated budget line</strong> covering Microsoft 365 platform configuration,
          hardware fleet maintenance and repairs
        </li>
        <li>
          Governed corporate IT hardware leasing lifecycles, asset discovery and deployment schedules across an
          enterprise fleet of 300+ connected devices
        </li>
        <li>
          Served as final escalation owner for systemic infrastructure issues, supervising outsourced desktop support
          vendors against agreed service levels
        </li>
        <li>
          Configured and troubleshot hybrid network security perimeters across F5 WAF, Palo Alto and Check Point
          next-gen firewalls, including Layer 4/7 stateful filtering
        </li>
      </ul>
    ),
  },
  {
    date: 'December 2017 - May 2021',
    location: "McDonald's Singapore",
    title: 'IT Consultant II',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          Managed outsourced IT vendors across <strong>135 restaurant outlets</strong>, ensuring SLA compliance and
          operational support for{' '}
          <strong>500+ self-order kiosks, 1,000 POS terminals and 2,000 kitchen display systems</strong>
        </li>
        <li>
          <strong>Integrated GrabFood and Foodpanda with the POS system to automate order processing</strong>, improving
          kitchen fulfilment speed by 60% and contributing to a 25% increase in digital sales
        </li>
        <li>
          Led hardware staging, configuration and network readiness for the{' '}
          <strong>nationwide rollout of the McDonald's App</strong> across the full outlet estate
        </li>
      </ul>
    ),
  },
  {
    date: 'December 2013 - December 2017',
    location: 'Systems Design',
    title: 'IT Field Technician',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          Staged and configured servers for customer deployments, alongside edge hardware including{' '}
          <strong>Cisco routers, switches and wireless access points</strong>
        </li>
        <li>
          Installed and maintained point-of-sale servers and kitchen display hardware across new client site openings,
          including <strong>McDonald's Singapore outlets</strong>
        </li>
        <li>
          <strong>Built a diagnostics script (Batch) to scan client endpoints</strong> and extract hardware models, IP
          addresses and serial numbers — replacing manual asset tracking during rollouts
        </li>
      </ul>
    ),
  },
];

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  items: [
    {
      type: ContactType.Email,
      text: 'ytong95@gmail.com',
      href: 'mailto:ytong95@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Singapore',
    },
    {
      type: ContactType.Github,
      text: 'ongyiktatt',
      href: 'https://github.com/ongyiktatt',
    },
    {
      type: ContactType.LinkedIn,
      text: 'ongyiktatt',
      href: 'https://www.linkedin.com/in/ongyiktatt/',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/ongyiktatt'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/ongyiktatt/'},
];