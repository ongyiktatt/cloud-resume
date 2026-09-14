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
  title: 'Yik Tatt Ong | IT Manager → Cloud Infrastructure Engineer',
  description: 'Yik Tatt Ong | IT Manager → Cloud Infrastructure Engineer',
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
        Cloud Infrastructure Engineer · Hybrid Cloud · Identity &amp; Automation
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
        <strong className="text-stone-100">12+ years in enterprise IT</strong> across Singapore and the APAC region,
        now building on AWS with Terraform and keyless CI/CD.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Open to <strong className="text-stone-100">Cloud Engineer and Infrastructure Engineer</strong> roles in
        Singapore. Available for interviews immediately; available to start January 2027.
      </p>
    </>
  ),
  actions: [
    {
      // Percent-encoded because the published file is "Resume_Ong Yik Tatt.pdf";
      // it is generated from resume/resume.tex.
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
      <p>
        That taught me what production demands. I've since turned it outward — three AWS certifications in 2026, plus a
        live stack this site runs on: S3 and CloudFront behind WAF, deployed by GitHub Actions with OIDC and no stored
        access keys.
      </p>
      <p>
        What I'm building toward is the overlap: infrastructure I've run in production, defined as code I can review,
        version and roll back.
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
    name: 'Cloud Platforms',
    skills: [
      {
        name: 'AWS Compute & Networking (VPC, EC2, S3, Route 53)',
        level: 8,
      },
      {
        name: 'AWS Serverless & Edge (Lambda, CloudFront, WAF)',
        level: 7,
      },
      {
        name: 'Microsoft Azure (VMs, VNet)',
        level: 7,
      },
    ],
  },
  {
    name: 'Infrastructure as Code & CI/CD',
    skills: [
      {
        name: 'Terraform',
        level: 8,
      },
      {
        name: 'GitHub Actions (OIDC keyless deployment)',
        level: 8,
      },
      {
        name: 'Git',
        level: 7,
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
    name: 'Systems & Virtualisation',
    skills: [
      {
        name: 'Docker',
        level: 8,
      },
      {
        name: 'Proxmox VE',
        level: 8,
      },
      {
        name: 'Linux (Debian)',
        level: 7,
      },
    ],
  },
  {
    name: 'Automation & Scripting',
    skills: [
      {
        name: 'PowerShell',
        level: 9,
      },
      {
        name: 'Bash',
        level: 7,
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
      'Next.js site shipped end-to-end on AWS: static export on S3 + CloudFront behind a WAF, keyless deploys via GitHub Actions OIDC, and a serverless Lambda + SNS contact form that emails me on submit.',
    tech: ['S3', 'CloudFront', 'WAF', 'Lambda', 'SNS', 'GitHub Actions (OIDC)'],
    url: 'https://github.com/ongyiktatt/cloud-resume',
  },
  {
    title: 'Virtualisation & Networking Homelab',
    description:
      'Multi-site lab on Proxmox VE: Debian VMs and containerised workloads, MikroTik routing with VLAN segmentation and WireGuard tunnels, plus self-hosted DNS and remote access. Where I validate network and infrastructure patterns before they matter.',
    tech: ['Proxmox VE', 'Debian', 'Docker', 'MikroTik (RouterOS)', 'WireGuard', 'VLANs'],
  },
];

/**
 * Resume section -- TODO: Standardise resume contact format or offer MDX
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
    // Two roles at one employer, so the promotion reads as a progression rather than two jobs.
    roles: [
      {
        title: 'IT Manager, APAC',
        date: 'May 2025 - December 2026',
        content: (
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li>
              Owned regional IT operations end-to-end — <strong className="text-stone-0">S$100K annual budget</strong>,
              vendor SLAs, and infrastructure across 200 users in three countries
            </li>
            <li>
              Led pilot testing and regional rollout of global IT initiatives, validating infrastructure changes before
              deployment across all three markets
            </li>
            <li>
              <strong className="text-stone-0">
                Redesigned service desk workflows and introduced proactive endpoint monitoring
              </strong>
              , cutting recurring incident escalations by 20%
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
              <strong className="text-stone-0">
                Built PowerShell automation to validate Secure Boot certificates and deploy language packs
              </strong>
              , cutting manual device setup time by 20%
              {/* TODO: convert to absolute figure, e.g. "from X to Y minutes per device" */}
            </li>
            <li>
              Secured a multi-OS environment with{' '}
              <strong className="text-stone-0">Microsoft Intune, Entra ID, and Conditional Access</strong>, managing
              endpoint compliance and identity lifecycle at scale
            </li>
            <li>
              Managed office network infrastructure and unified communications, including Microsoft Teams Rooms
              deployment
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
          <strong className="text-stone-0">Restructured an 8-person support team into two specialised units</strong> —
          Project Delivery and Technical Support — separating deployment work from reactive maintenance, improving
          deployment speed by 20%
        </li>
        <li>
          <strong className="text-stone-0">
            Standardised end-to-end client onboarding and transferred ownership to autonomous team leads
          </strong>
          , cutting leadership escalations by 20% while increasing onboarding capacity by 40%
          {/* TODO: convert to absolute figure, e.g. "from X to Y escalations per month" */}
        </li>
        <li>
          Partnered with Product Engineering on deployment feedback and recurring defect trends, directly informing
          product improvements and release planning
        </li>
        <li>
          Designed and delivered technical training in{' '}
          <strong className="text-stone-0">IP networking, OS virtualisation, and database fundamentals</strong>,
          building the team's ability to troubleshoot independently
        </li>
      </ul>
    ),
  },
  {
    date: 'May 2021 - June 2022',
    location: 'SAFRA',
    title: 'IT Infrastructure Lead',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          <strong className="text-stone-0">Led data centre migrations as part of a $2M digital transformation</strong>,
          moving core enterprise applications — including Microsoft Dynamics AX ERP and gaming systems — into Tier-3
          co-location facilities with minimal downtime
        </li>
        <li>
          Configured and troubleshot hybrid network security perimeters, managing{' '}
          <strong className="text-stone-0">
            Layer 4/7 stateful filtering across F5 WAF, Palo Alto, and Check Point Next-Gen Firewalls
          </strong>
        </li>
        <li>
          Administered identity and access management across{' '}
          <strong className="text-stone-0">Microsoft Entra ID, Microsoft 365, and AWS IAM</strong> — user provisioning,
          group management, and access control
        </li>
        <li>
          Managed a <strong className="text-stone-0">$100K annual operating budget</strong> covering Office 365
          configuration and hardware fleet maintenance
        </li>
        <li>
          Served as final Tier-3 escalation owner for systemic server and infrastructure issues, supervising outsourced
          desktop support vendors
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
          <strong className="text-stone-0">
            Integrated GrabFood and Foodpanda with the POS system to automate order processing
          </strong>{' '}
          improving kitchen fulfilment speed by 60% and contributing to a 25% increase in digital sales
        </li>
        <li>
          Managed outsourced IT vendors across <strong className="text-stone-0">135 restaurant outlets</strong>,
          ensuring SLA compliance and operational support for{' '}
          <strong className="text-stone-0">
            500+ self-order kiosks, 1,000 POS terminals, and 2,000 kitchen display systems
          </strong>
        </li>
        <li>
          Led hardware staging, configuration, and network readiness for the{' '}
          <strong className="text-stone-0">nationwide rollout of the McDonald's App</strong> across all 135 outlets
        </li>
      </ul>
    ),
  },
  {
    date: 'December 2013 - December 2017',
    location: 'Systems Design',
    title: 'Computer Technician',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          <strong className="text-stone-0">Built a diagnostics script (Batch) to scan client endpoints</strong> and
          extract hardware models, IP addresses, and serial numbers — replacing manual asset tracking during rollouts
        </li>
        <li>
          Staged and configured servers for customer deployments, alongside edge hardware including{' '}
          <strong className="text-stone-0">Cisco routers, switches, and wireless access points</strong>
        </li>
        <li>
          Installed and maintained point-of-sale servers and kitchen display hardware across new corporate client
          accounts
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
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/ongyiktatt'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/ongyiktatt/'},
];
