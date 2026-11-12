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
  title: 'Yik Tatt Ong | Senior Infrastructure Engineer',
  description:
    'Senior infrastructure engineer in Singapore with 12+ years across Windows Server, Active Directory, identity, endpoint management and cloud platforms — hands-on across a three-market APAC estate, with PowerShell automation, infrastructure monitoring and root-cause discipline.',
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
        Senior Infrastructure Engineer · Windows Server, Identity &amp; Endpoint · Hybrid Cloud (Azure / AWS Certified)
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Microsoft 365 Certified: Endpoint Administrator Associate (MD-102) · Microsoft Certified: Azure Administrator
        Associate (AZ-104) · AWS Certified Solutions Architect – Associate · AWS Certified CloudOps Engineer – Associate
        · AWS Certified Cloud Practitioner · ITIL 4 Foundation
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I do the systems work myself — Windows Server, Active Directory, Entra ID and Intune endpoints, Group Policy
        troubleshooting, and a VMware-hosted server estate I use day to day — across a three-market APAC estate, and I
        still take the Tier-3 escalation when something breaks.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        <strong>12+ years in enterprise IT</strong> across Singapore and the APAC region — a 200-user estate spanning
        Singapore, Japan and South Korea, with production incident resolution, root-cause analysis and automation
        throughout.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Open to{' '}
        <strong>Senior Infrastructure Engineer, Systems Engineer, Technical Lead and Platform / Cloud Engineer</strong>{' '}
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
        I've spent 12+ years administering and supporting enterprise systems — a S$2M data centre migration into Tier-3
        co-location, and day-to-day hands-on care of a 200-user estate across Singapore, Japan and South Korea.
      </p>
      <p>
        My strength is depth rather than headcount. As the sole internal IT resource in the Singapore regional office, I
        handle the Windows Server troubleshooting, Group Policy and Active Directory work, Entra ID and Intune endpoint
        management, and day-to-day work on a VMware-hosted server estate — then escalate and coordinate vendors when a
        problem runs past what I can fix alone. The manager titles I've held were mostly administrative; the systems
        work never went away.
      </p>
      <p>
        I like problems that other people have given up on. Recurring escalations get root-caused rather than closed;
        repetitive work gets scripted. In October 2026 I passed Microsoft's Endpoint Administrator Associate (MD-102)
        and Azure Administrator Associate (AZ-104), having added three AWS certifications earlier in the year alongside
        the role.
      </p>
      <p>Off the clock: cameras, hi-fi audio, and a homelab that's never quite finished.</p>
    </>
  ),
  aboutItems: [
    {label: 'Location', text: 'Singapore', Icon: MapIcon},
    {label: 'Education', text: 'Temasek Polytechnic', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Wargaming Asia', Icon: BuildingOffice2Icon},
    {
      label: 'Certifications',
      text: ['Microsoft MD-102 · AZ-104', 'AWS SAA', 'CloudOps', 'Cloud Practitioner', 'ITIL 4 Foundation'],
      Icon: ShieldCheckIcon,
    },
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Systems & Server Infrastructure',
    skills: [
      {name: 'Windows Server — Admin, Imaging & Troubleshooting', level: 9},
      {name: 'VMware vSphere — VM Operations & Guest Troubleshooting', level: 8},
      {name: 'DNS & Server Lifecycle Management', level: 8},
      {name: 'Capacity & Performance Tuning', level: 7},
    ],
  },
  {
    name: 'Identity & Directory Services',
    skills: [
      {name: 'Active Directory (AD DS)', level: 9},
      {name: 'Group Policy (GPO) — Administration & Troubleshooting', level: 9},
      {name: 'Microsoft Entra ID & Conditional Access', level: 9},
      {name: 'Identity Lifecycle & Least Privilege', level: 8},
      {name: 'Authentication & Access Troubleshooting', level: 8},
    ],
  },
  {
    name: 'Endpoint & Modern Workplace',
    skills: [
      {name: 'Microsoft Intune & Device Compliance', level: 9},
      {name: 'Ivanti Endpoint Management', level: 8},
      {name: 'WSUS Patch Management', level: 8},
      {name: 'Device Lifecycle & Asset Management', level: 8},
      {name: 'Microsoft 365 · Teams Rooms', level: 8},
    ],
  },
  {
    name: 'Networking & Security',
    skills: [
      {name: 'Next-Generation Firewall Policy (Palo Alto · Check Point)', level: 8},
      {name: 'F5 Web Application Firewall (WAF)', level: 7},
      {name: 'Routing, Switching & VLAN Segmentation', level: 8},
      {name: 'VPN (IPSec · WireGuard) & TCP/IP', level: 8},
      {name: 'Infrastructure Hardening & Patch Remediation', level: 8},
    ],
  },
  {
    name: 'Automation, Scripting & Observability',
    skills: [
      {name: 'PowerShell & Batch Automation', level: 9},
      {name: 'Infrastructure Monitoring (PRTG · Zabbix)', level: 8},
      {name: 'Application Observability (Datadog logs & traces)', level: 7},
      {name: 'AI-Assisted Script Development & Debugging', level: 8},
      {name: 'Root-Cause Analysis & Permanent Fixes', level: 9},
    ],
  },
  {
    name: 'Containers & Homelab (self-hosted)',
    skills: [
      {name: 'Docker & Docker Compose', level: 8},
      {name: 'Proxmox VE', level: 7},
      {name: 'NetBox (IPAM) & Device Inventory', level: 8},
      {name: 'Nginx Proxy Manager (Reverse Proxy · TLS)', level: 8},
      {name: 'Technitium DNS Server', level: 7},
    ],
  },
  {
    name: 'Technical Service Management',
    skills: [
      {name: 'Major Incident Response & Technical Escalation', level: 9},
      {name: 'Problem Documentation & Root-Cause Discipline', level: 9},
      {name: 'Change Risk Assessment & Rollback Planning', level: 8},
      {name: 'Ticket Triage & Fault Isolation', level: 8},
      {name: 'ServiceNow · Jira · ITIL 4 Foundation', level: 7},
      {name: 'Vendor Service Reviews & SLA Compliance', level: 8},
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Access control platform replacement — vendor-led, end to end',
    description:
      'Replaced an unsupported Singapore access control system with one carrying proper audit trails: scoped requirements, evaluated vendors, made the recommendation with trade-offs stated, ran the deployment around a live office so nobody was locked out, and handed it into BAU. I still administer the access control server today — patching, access database and exception handling.',
    tech: ['Vendor Selection', 'Physical Security Integration', 'Server Administration', 'Deployment & Handover'],
  },
  {
    title: 'Tier-3 data centre SAN failure — major incident response',
    description:
      'A SAN failure at the Tier-3 co-location facility took production workloads offline. I owned the technical response: working the recovery alongside the MSP that owned the SAN platform, coordinating across vendors, holding stakeholder communication throughout, and driving restoration of service with minimal disruption. Infrastructure health across servers, VMs and network gear was visible throughout via PRTG.',
    tech: ['Major Incident Response', 'MSP Coordination', 'Disaster Recovery', 'PRTG Monitoring'],
  },
  {
    title: 'Homelab — container host, IPAM and internal DNS',
    description:
      'A self-hosted environment I run continuously: Docker host with Compose-defined service stacks, Nginx Proxy Manager handling reverse proxy and TLS termination, NetBox as the source of truth for IP address management and device inventory, and Technitium as the internal DNS resolver. Kept deliberately documented rather than ad hoc — addressing, naming and service exposure all recorded.',
    tech: ['Docker', 'NetBox (IPAM)', 'Nginx Proxy Manager', 'Technitium DNS'],
  },
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
 * Certifications ordered newest to oldest.
 */
export const certification: TimelineItem[] = [
  {
    date: 'October 2026',
    location: 'Microsoft',
    title: 'Microsoft 365 Endpoint Administrator Associate (MD-102)',
    url: 'https://learn.microsoft.com/en-us/users/yiktattong-4161/credentials/ae5cff38fbbc119e',
    compact: true,
    content: <></>,
  },
  {
    date: 'October 2026',
    location: 'Microsoft',
    title: 'Azure Administrator Associate (AZ-104)',
    url: 'https://learn.microsoft.com/en-sg/users/yiktattong-4161/credentials/2f92fdf4519b60ad',
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
              <strong>Sole internal IT resource for Singapore, Japan and South Korea</strong> — personally hands-on
              across the entire regional estate rather than directing a team, covering Windows Server, Active Directory
              and Group Policy troubleshooting, a VMware-hosted server estate and endpoint management across all three
              markets
            </li>
            <li>
              Own the Singapore end-user computing estate hands-on — <strong>Active Directory and Group Policy
              troubleshooting</strong>, Microsoft Teams Rooms unified communications, patch compliance and device
              configuration standards
            </li>
            <li>
              Led <strong>vendor selection, quotation, deployment and ongoing server maintenance</strong> for the
              Singapore access control platform — replacing an unsupported system with one carrying proper audit
              trails, and retaining hands-on ownership of the access control server
            </li>
            <li>
              Resolve systemic technical issues through <strong>structured root-cause analysis</strong> — troubleshooting
              Windows Server directly rather than escalating to third parties
            </li>
            <li>
              Apply <strong>problem management to recurring incident patterns</strong> — introducing proactive Zabbix
              monitoring for printers, Teams Rooms systems and virtual machines, cutting recurring incident escalations
              by 20%
            </li>
            <li>
              Act as final technical escalation point across three markets — diagnosing faults directly alongside
              vendor-supplied engineers, and holding business stakeholder communication through to service restoration
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
              <strong>Built PowerShell automation to validate Secure Boot certificates and deploy language packs</strong>{' '}
              — using AI-assisted development to accelerate script authoring and debugging — cutting manual device
              setup time by 20%
            </li>
            <li>
              Owned end-to-end identity access lifecycles — user provisioning, Active Directory group management,
              least-privilege access and offboarding
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    date: 'June 2022 - February 2023',
    location: 'TabSquare',
    title: 'Operations Manager',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          <strong>Diagnosed production product defects using Datadog</strong> — correlating application logs and traces
          to isolate root cause across live client deployments, replacing guesswork with evidence-led fault isolation
        </li>
        <li>
          <strong>Standardised end-to-end client deployment and onboarding workflows</strong> across an 8-person
          operation — separating deployment work from reactive maintenance and cutting client deployment time by 20%
        </li>
        <li>
          Designed and delivered <strong>technical training on IP networking, OS virtualisation and database
          fundamentals</strong>, building independent troubleshooting capability and reducing reliance on escalation
        </li>
        <li>
          Partnered with Product Engineering on recurring defect trends from live deployments, feeding operating issues
          into product release planning
        </li>
        <li>
          Transferred day-to-day ownership to autonomous team leads while retaining <strong>technical authority over
          escalations</strong>, lifting client onboarding capacity by 40%
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
          <strong>Owned the response to a major incident</strong> in which a Tier-3 data centre SAN failure took
          production workloads offline — acting as escalation point, working the recovery alongside the MSP that owned
          the SAN platform, holding stakeholder communication and driving restoration of service with minimal
          disruption
        </li>
        <li>
          <strong>Led data centre migration as part of a S$2M digital transformation</strong>, moving core enterprise
          applications — including Microsoft Dynamics AX ERP and gaming systems — into Tier-3 co-location facilities
          with minimal production downtime
        </li>
        <li>
          Administered <strong>Active Directory and Group Policy</strong> for the corporate environment — controlling user
          access and enforcing configuration standards across the estate
        </li>
        <li>
          <strong>Monitored infrastructure health with PRTG</strong> across physical servers, virtual machines and
          networking equipment — working sensor alerts and threshold breaches through to resolution during incident
          triage
        </li>
        <li>
          Managed <strong>WSUS patch deployment</strong> across the server and endpoint estate, and administered the{' '}
          <strong>Ivanti endpoint management</strong> platform
        </li>
        <li>
          Configured and troubleshot network security policy across <strong>Palo Alto and Check Point</strong>
          next-generation firewalls, with <strong>F5</strong> handling web application firewall (WAF) policy — covering
          rule review, change testing and fault isolation during incidents
        </li>
        <li>
          Administered identity and access management across <strong>Microsoft Entra ID and Microsoft 365</strong> —
          least-privilege access control, user provisioning and group management
        </li>
        <li>
          Held <strong>change approval authority</strong> for infrastructure changes — reviewing technical risk, rollback
          plans and readiness, and scheduling implementation windows to avoid service disruption
        </li>
        <li>
          Governed corporate IT hardware leasing lifecycles, asset discovery and deployment schedules across an
          enterprise fleet of 300+ connected devices within a <strong>S$100K dedicated budget line</strong>
        </li>
        <li>
          Served as <strong>final technical escalation point</strong> for systemic infrastructure issues, and supervised
          outsourced desktop support vendors against agreed service levels
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
          Administered <strong>Active Directory and Group Policy</strong> across the corporate estate, controlling user
          access and enforcing device configuration standards across <strong>135 restaurant outlets</strong>
        </li>
        <li>
          Led hardware staging, configuration and network readiness for the{' '}
          <strong>nationwide rollout of the McDonald's App</strong> across 135 outlets
        </li>
        <li>
          <strong>Reviewed service tickets to identify recurring technical causes and applied permanent fixes</strong>{' '}
          rather than closing the same issue repeatedly
        </li>
        <li>
          Managed outsourced IT vendors against SLA and availability commitments across 135 outlets —{' '}
          <strong>500+ self-order kiosks, 1,000 POS terminals and 2,000 kitchen display systems</strong>
        </li>
        <li>
          Ran monthly service reviews with the outsourced vendor service desk and reported service desk performance to
          management — translating incident and request trends into prioritised technical improvements
        </li>
        <li>
          <strong>Engaged 135 restaurant outlets monthly</strong> to surface technology pain points before they
          escalated, feeding findings into the service improvement backlog
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
          <strong>Built a diagnostics script (Batch) to scan client endpoints</strong> and extract hardware models, IP
          addresses and serial numbers — replacing manual asset tracking during rollout programmes
        </li>
        <li>
          Delivered on-site hardware deployment and maintenance for{' '}
          <strong>point-of-sale and kitchen display systems</strong> across new client site openings, including
          McDonald's Singapore outlets
        </li>
        <li>
          <strong>Logged, tracked and resolved incidents and service requests in ServiceNow</strong>, building the
          ITIL-aligned service management discipline applied in later roles
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