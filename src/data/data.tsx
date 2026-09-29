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
  title: 'Yik Tatt Ong | Service Delivery & End User Computing Manager',
  description:
    'Regional IT manager in Singapore with 12+ years in enterprise IT — service delivery and end user computing across Singapore, Japan and South Korea, with ITIL-aligned incident, change and problem management, vendor and SLA governance.',
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
        IT Manager, APAC · Service Delivery &amp; End User Computing · Multi-Country IT Operations
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        ITIL 4 Foundation · AWS Certified Solutions Architect – Associate · AWS Certified CloudOps Engineer – Associate ·
        AWS Certified Cloud Practitioner
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I run IT services for 200 users across Singapore, Japan and South Korea — vendor-delivered and ITIL-aligned,
        and I still do the hands-on work myself.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        <strong>12+ years in enterprise IT</strong> across Singapore and the APAC region — a 200-user estate and a
        S$100K regional budget across Singapore, Japan and South Korea, with vendor, SLA and service-performance
        accountability throughout.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Open to{' '}
        <strong>
          Service Delivery Manager, IT Service Manager, End User Computing Manager and IT Manager
        </strong>{' '}
        roles in Singapore. Available for interviews immediately; available to start January 2027.
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
        I've spent 12+ years running and supporting enterprise IT — a S$2M data centre migration into Tier-3
        co-location, and day-to-day service delivery for a 200-user estate across Singapore, Japan and South Korea.
      </p>
      <p>
        Most of it has been service management rather than tooling — coordinating major incidents, assessing change,
        and running monthly service reviews with our vendor service desk. At McDonald's that covered 135 outlets and a
        1,000-terminal POS estate.
      </p>
      <p>
        I'm comfortable on both sides: holding vendors to their SLAs and doing the technical work myself. I added three
        AWS certifications this year alongside the role.
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
      text: ['ITIL 4 Foundation', 'AWS SAA', 'CloudOps', 'Cloud Practitioner'],
      Icon: ShieldCheckIcon,
    },
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Service Delivery & Vendor Management',
    skills: [
      {name: 'Multi-Country IT Operations (SG · JP · KR)', level: 9},
      {name: 'Vendor Performance & SLA Compliance', level: 9},
      {name: 'Outsourced Service Delivery', level: 8},
      {name: 'IT Budget Ownership (S$100K)', level: 8},
      {name: 'Team Structuring & Capability Building', level: 8},
    ],
  },
  {
    name: 'IT Service Management',
    skills: [
      {name: 'Major Incident Coordination & Escalation', level: 9},
      {name: 'Problem Management & Root Cause', level: 9},
      {name: 'SLA & KPI Monitoring & Reporting', level: 8},
      {name: 'Change Assessment & Approval', level: 8},
      {name: 'ITIL 4 Foundation', level: 7},
    ],
  },
  {
    name: 'End User Computing & Identity',
    skills: [
      {name: 'Microsoft Intune & Device Compliance', level: 9},
      {name: 'Entra ID & Conditional Access', level: 9},
      {name: 'Active Directory & Group Policy', level: 8},
      {name: 'Endpoint Patching (WSUS · Ivanti)', level: 8},
      {name: 'Device Lifecycle & Asset Management', level: 8},
    ],
  },
  {
    name: 'Systems & Platforms',
    skills: [
      {name: 'Windows Server — Admin & Imaging', level: 8},
      {name: 'Windows · macOS · DNS', level: 8},
      {name: 'VMware vSphere (Administration)', level: 7},
      {name: 'Server & Hardware Lifecycle', level: 7},
      {name: 'PowerShell & Batch Automation', level: 9},
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Vulnerability triage automation — WannaCry response',
    description:
      'Wrote a Batch automation script during the WannaCry ransomware outbreak that scanned 60+ retail sites for exposure, collated results to a central server for triage, and prioritised patching of affected devices. The triage-and-prioritise pattern is the same one I applied years later to service desk workflows and proactive endpoint monitoring.',
    tech: ['Batch', 'Endpoint Patching', 'Risk-Based Prioritisation', 'Incident Response'],
  },
  {
    title: 'Endpoint asset discovery automation',
    description:
      'Built a diagnostics script (Batch) to scan client endpoints and extract hardware models, IP addresses and serial numbers — replacing manual asset tracking during rollouts, and forming the basis for the device-lifecycle and asset-management discipline I have run since.',
    tech: ['Batch', 'Asset Discovery', 'Device Lifecycle Management'],
  },
  {
    title: 'This site',
    description:
      'Built and hardened this site myself — static export served through a CDN with a WAF and least-privilege access, and released through an automated CI/CD pipeline. It is here as evidence of technical grounding rather than as the day job.',
    tech: ['Static Site Delivery', 'CDN', 'WAF', 'CI/CD', 'Least-Privilege Access'],
    url: 'https://github.com/ongyiktatt/cloud-resume',
  },
];

/**
 * Resume section
 */
export const certification: TimelineItem[] = [
  {
    date: 'May 2021',
    location: 'ITIL',
    title: 'ITIL 4 Foundation',
    url: 'https://www.peoplecert.org/for-corporations/certificate-verification-service',
    compact: true,
    content: <span className="block text-center md:text-left">Credential ID: GR671273878OY</span>,
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
              budget, vendor performance and SLA compliance — and direct vendor-supplied engineers in Japan and South
              Korea against response and resolution targets
            </li>
            <li>
              <strong>Own regional incident escalation across three markets</strong>, coordinating vendor engineers and
              holding communication with business stakeholders through to service restoration
            </li>
            <li>
              Apply <strong>problem management to recurring incident patterns</strong> — introducing proactive endpoint
              monitoring and redesigning service desk workflows to cut recurring incident escalations by 20%
            </li>
            <li>
              <strong>Govern change for regional IT initiatives</strong> across Singapore, Japan and South Korea —
              validating readiness, piloting locally and sequencing deployments to avoid business disruption
            </li>
            <li>
              Continue to own Singapore end-user computing hands-on — Active Directory and Group Policy administration,
              unified communications including Microsoft Teams Rooms, and patch compliance
            </li>
            <li>
              Remain <strong>technically hands-on at manager level</strong> — troubleshooting Windows Server and
              VMware-hosted workloads and resolving systemic issues through structured root-cause analysis
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
              <strong>Microsoft Intune, Microsoft Entra ID, Group Policy and Conditional Access</strong>
            </li>
            <li>
              <strong>Built PowerShell automation to validate Secure Boot certificates and deploy language packs</strong>,
              cutting manual device setup time by 20%
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
          Designed and delivered technical training that built <strong>independent troubleshooting capability</strong>{' '}
          across the team, reducing reliance on escalation
        </li>
        <li>
          Partnered with Product Engineering on recurring defect trends from live deployments, feeding operating issues
          into product release planning
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
          <strong>Directed the response to a major incident</strong> in which a Tier-3 data centre SAN failure took
          production workloads offline — coordinating recovery across vendors, holding stakeholder communication and
          driving restoration of service
        </li>
        <li>
          <strong>Held change approval authority</strong> for infrastructure changes — assessing risk, impact and
          readiness, and scheduling implementation windows to avoid service disruption
        </li>
        <li>
          Administered Active Directory and Group Policy for the corporate environment, and managed{' '}
          <strong>WSUS patch deployment</strong> across the server and endpoint estate alongside the{' '}
          <strong>Ivanti endpoint management</strong> estate
        </li>
        <li>
          Administered identity and access management across <strong>Microsoft Entra ID and Microsoft 365</strong> —
          least-privilege access control, user provisioning and group management
        </li>
        <li>
          Governed corporate IT hardware leasing lifecycles, asset discovery and deployment schedules across an
          enterprise fleet of 300+ connected devices within a <strong>S$100K dedicated budget line</strong>
        </li>
        <li>
          Served as final escalation owner for systemic infrastructure issues, supervising outsourced desktop support
          vendors against agreed service levels
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
          Managed outsourced IT vendors against SLA and availability commitments across{' '}
          <strong>135 restaurant outlets</strong> — <strong>500+ self-order kiosks, 1,000 POS terminals and 2,000
          kitchen display systems</strong>
        </li>
        <li>
          <strong>Ran monthly service reviews with the outsourced vendor service desk</strong> and reported service desk
          performance to management — holding vendors to agreed SLAs and translating incident and request trends into
          prioritised service improvements
        </li>
        <li>
          <strong>Reviewed service tickets to identify recurring causes and applied permanent fixes</strong> to stop
          issues recurring rather than closing them repeatedly
        </li>
        <li>
          <strong>Engaged 135 restaurant outlets monthly</strong> to surface technology pain points before they
          escalated, feeding findings into the service improvement backlog
        </li>
        <li>
          Administered Active Directory and Group Policy across the corporate estate, controlling user access and
          enforcing device configuration standards
        </li>
        <li>
          Led hardware staging, configuration and readiness for the{' '}
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
          <strong>Wrote a Batch automation script during the WannaCry ransomware outbreak</strong> — scanning 60+ retail
          sites for exposure, collating results to a central server for triage, and prioritising patching of affected
          devices
        </li>
        <li>
          <strong>Logged, tracked and resolved incidents and service requests in ServiceNow</strong>, building the
          ITIL-aligned service management discipline applied in later roles
        </li>
        <li>
          Delivered on-site hardware deployment and maintenance for{' '}
          <strong>point-of-sale and kitchen display systems</strong> across new client site openings, including
          McDonald's Singapore outlets
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