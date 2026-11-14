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
  title: 'Yik Tatt Ong | Infrastructure Engineer — Azure & AWS Certified',
  description:
    'Infrastructure engineer in Singapore with 12+ years across hybrid identity, Windows Server, networking and cloud platforms — Microsoft Certified: Azure Administrator Associate (AZ-104) and AWS Certified Solutions Architect – Associate, with PowerShell automation, CI/CD delivery and network security depth.',
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
        Infrastructure Engineer · Azure &amp; AWS Certified · Hybrid Identity, Automation &amp; Network Security
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Microsoft Certified: Azure Administrator Associate (AZ-104) · Microsoft 365 Certified: Endpoint Administrator
        Associate (MD-102) · AWS Certified Solutions Architect – Associate · AWS Certified CloudOps Engineer – Associate
        · AWS Certified Cloud Practitioner · ITIL 4 Foundation
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I do the systems work myself — Entra ID, Active Directory and Group Policy troubleshooting, Intune-managed
        endpoints, and a VMware-hosted server estate I use day to day — across a three-market APAC estate, and I still
        take the Tier-3 escalation when something breaks.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        <strong>12+ years in enterprise IT</strong> across Singapore and the APAC region — a 200-user estate spanning
        Singapore, Japan and South Korea, with production incident resolution, root-cause analysis and automation
        throughout. Currently building Terraform proficiency in a self-hosted lab.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Open to{' '}
        <strong>Cloud Engineer, Cloud Infrastructure Engineer, Senior Infrastructure Engineer and Systems Engineer</strong>{' '}
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
        What I bring to cloud and infrastructure engineering is the layer underneath it: Layer 4/7 policy across Palo
        Alto and Check Point firewalls, F5 web application firewall, VLAN segmentation and VPN design, and observability
        through PRTG, Zabbix and Datadog. A cloud engineer who can read a packet capture and explain a firewall rule is
        a different proposition from one who can't.
      </p>
      <p>
        I like problems that other people have given up on. Recurring escalations get root-caused rather than closed;
        repetitive work gets scripted. In October 2026 I passed Microsoft's Azure Administrator Associate (AZ-104) and
        Endpoint Administrator Associate (MD-102), having added three AWS certifications earlier in the year alongside
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
      text: ['Microsoft AZ-104 · MD-102', 'AWS SAA', 'CloudOps', 'Cloud Practitioner', 'ITIL 4 Foundation'],
      Icon: ShieldCheckIcon,
    },
  ],
};

/**
 * Skills section
 * Mirrors the resume Skills section token-for-token, in the same order.
 * Levels reflect evidenced hands-on use, not certification scope: cloud
 * services sit deliberately below the identity and server skills.
 */
export const skills: SkillGroup[] = [
  {
    name: 'Cloud Platforms — AWS',
    skills: [
      {name: 'S3 & CloudFront — static hosting, CDN distribution', level: 7},
      {name: 'Route 53 & ACM — DNS and TLS certificates', level: 6},
      {name: 'IAM — roles, policies, least privilege', level: 6},
      {name: 'AWS WAF', level: 5},
      {name: 'Lambda & SNS — serverless integrations', level: 5},
    ],
  },
  {
    name: 'Cloud Platforms — Microsoft Azure',
    skills: [
      {name: 'Microsoft Entra ID (Azure AD)', level: 9},
      {name: 'Conditional Access', level: 9},
      {name: 'RBAC & Least-Privilege Access Control', level: 7},
    ],
  },
  {
    name: 'Infrastructure as Code & Delivery',
    skills: [
      {name: 'Terraform (in progress)', level: 3},
      {name: 'Git', level: 7},
      {name: 'GitHub Actions — OIDC Keyless Deployment', level: 7},
      {name: 'CI/CD Pipeline Design', level: 6},
    ],
  },
  {
    name: 'Systems & Server Infrastructure',
    skills: [
      {name: 'Windows Server — administration, troubleshooting, standard build imaging, patch compliance', level: 9},
      {name: 'Linux — Docker Host Administration', level: 6},
      {name: 'VMware vSphere — VM Operations & Guest-Level Troubleshooting', level: 8},
      {name: 'DNS & Server / Hardware Lifecycle Management', level: 8},
    ],
  },
  {
    name: 'Identity & Directory Services',
    skills: [
      {name: 'Active Directory (AD DS)', level: 9},
      {name: 'Group Policy (GPO) — Administration & Troubleshooting', level: 9},
      {name: 'Microsoft Entra ID (Azure AD)', level: 9},
      {name: 'Identity Lifecycle Management', level: 8},
      {name: 'Least-Privilege Access Control', level: 8},
    ],
  },
  {
    name: 'Endpoint & Modern Workplace',
    skills: [
      {name: 'Microsoft Intune', level: 9},
      {name: 'Conditional Access', level: 9},
      {name: 'Device Compliance Baselines', level: 8},
      {name: 'Ivanti Endpoint Management', level: 8},
      {name: 'WSUS Patch Management', level: 8},
      {name: 'Microsoft 365 · Windows & macOS', level: 8},
    ],
  },
  {
    name: 'Networking & Security',
    skills: [
      {name: 'Next-Generation Firewall Policy (Palo Alto · Check Point)', level: 8},
      {name: 'F5 Web Application Firewall (WAF)', level: 7},
      {name: 'Routing & Switching', level: 8},
      {name: 'VLANs & Network Segmentation', level: 8},
      {name: 'VPN (IPSec · WireGuard) & TCP/IP', level: 8},
      {name: 'Infrastructure Hardening', level: 8},
    ],
  },
  {
    name: 'Containers & Homelab (self-hosted)',
    skills: [
      {name: 'Docker & Docker Compose', level: 8},
      {name: 'Proxmox VE', level: 7},
      {name: 'NetBox (IPAM)', level: 8},
      {name: 'Nginx Proxy Manager — reverse proxy & TLS', level: 8},
      {name: 'Technitium DNS Server', level: 7},
    ],
  },
  {
    name: 'Automation & Observability',
    skills: [
      {name: 'PowerShell', level: 9},
      {name: 'Bash', level: 6},
      {name: 'Batch', level: 7},
      {name: 'PRTG — infrastructure, VM & network monitoring', level: 8},
      {name: 'Zabbix', level: 7},
      {name: 'Datadog — application logs & traces', level: 7},
    ],
  },
];

/**
 * Portfolio section
 * The first two items mirror the resume's Selected Projects. The remaining
 * three are evidence behind claims made in the experience section.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'This site — serverless static delivery on AWS',
    description:
      'Built and hardened this site myself: a Next.js static export in S3 behind CloudFront, on a custom Route 53 domain with ACM-managed TLS and direct bucket access blocked. Releases run through GitHub Actions using OIDC role assumption — no stored access keys — so each merge to main builds, syncs and invalidates the CDN. Hardened with AWS WAF rules and least-privilege IAM, plus a serverless contact form on Lambda and SNS.',
    tech: ['S3', 'CloudFront', 'Route 53', 'ACM', 'WAF', 'Lambda', 'SNS', 'GitHub Actions (OIDC)'],
    url: 'https://github.com/ongyiktatt/cloud-resume',
  },
  {
    title: 'Homelab — virtualisation, IPAM and infrastructure as code',
    description:
      'A self-hosted environment I run continuously: virtualised and containerised services on Proxmox VE and a Docker host, Nginx Proxy Manager handling reverse proxy and TLS termination, NetBox as the source of truth for IP address management and device inventory, and Technitium as the internal DNS resolver. Kept deliberately documented rather than ad hoc. Currently extending provisioning into Terraform using the Proxmox and Docker providers — defining virtual machines and containers as declarative configuration with state and changes tracked in Git, rather than built by hand.',
    tech: ['Proxmox VE', 'Docker', 'Terraform (in progress)', 'NetBox (IPAM)', 'Nginx Proxy Manager', 'Technitium'],
  },
  {
    title: 'Tier-3 data centre SAN failure — major incident response',
    description:
      'A SAN failure at the Tier-3 co-location facility took production workloads offline. I owned the response as escalation point: working the recovery alongside the MSP that owned the SAN platform, holding stakeholder communication throughout, and driving restoration of service with minimal disruption. Infrastructure health across servers, VMs and network equipment was visible throughout via PRTG.',
    tech: ['Major Incident Response', 'MSP Coordination', 'Disaster Recovery', 'PRTG Monitoring'],
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
      'Built a diagnostics script (Batch) to scan client endpoints and extract hardware models, IP addresses and serial numbers — replacing manual asset tracking during rollout programmes, and forming the basis for the device-lifecycle discipline I have run since.',
    tech: ['Batch', 'Asset Discovery', 'Device Lifecycle Management'],
  },
];

/**
 * Resume section
 * Certifications ordered newest to oldest. Within the Oct 2026 tie, AZ-104 is
 * placed ahead of MD-102 because it matches the target role.
 */
export const certification: TimelineItem[] = [
  {
    date: 'October 2026',
    location: 'Microsoft',
    title: 'Azure Administrator Associate (AZ-104)',
    url: 'https://learn.microsoft.com/en-sg/users/yiktattong-4161/credentials/2f92fdf4519b60ad',
    compact: true,
    content: <></>,
  },
  {
    date: 'October 2026',
    location: 'Microsoft',
    title: 'Microsoft 365 Endpoint Administrator Associate (MD-102)',
    url: 'https://learn.microsoft.com/en-us/users/yiktattong-4161/credentials/ae5cff38fbbc119e',
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
              Apply <strong>problem management to recurring incident patterns</strong> — introducing proactive Zabbix
              monitoring for printers, Microsoft Teams Rooms systems and virtual machines, cutting recurring incident
              escalations by 20%
            </li>
            <li>
              Act as <strong>final technical escalation point across three markets</strong> — diagnosing faults directly
              alongside vendor-supplied engineers, and holding business stakeholder communication through to service
              restoration
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
              <strong>Developed PowerShell automation for Secure Boot certificate validation and language-pack
              deployment</strong>, cutting manual device setup time by 20%
            </li>
            <li>
              Owned <strong>end-to-end identity access lifecycles</strong> — user provisioning, Active Directory group
              management, least-privilege access and offboarding
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
          Partnered with Product Engineering on recurring defect trends from live deployments, feeding operating issues
          into product release planning
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
          <strong>Owned the response to a major incident</strong> in which a Tier-3 data centre SAN failure took
          production workloads offline — acting as escalation point, working the recovery alongside the MSP that owned
          the SAN platform, holding stakeholder communication and driving restoration of service with minimal
          disruption
        </li>
        <li>
          <strong>Led migration of core enterprise applications</strong> — including Microsoft Dynamics AX ERP and gaming
          systems — into Tier-3 co-location facilities as part of a <strong>S$2M digital transformation programme</strong>,
          with minimal production downtime
        </li>
        <li>
          Administered <strong>Active Directory, Group Policy, WSUS patch compliance and the Ivanti endpoint platform</strong>{' '}
          across the corporate server and endpoint estate — controlling user access and enforcing configuration standards
        </li>
        <li>
          Configured and troubleshot network security policy across <strong>Palo Alto and Check Point</strong>{' '}
          next-generation firewalls, with <strong>F5</strong> handling web application firewall (WAF) policy — covering
          rule review, change testing and fault isolation during incidents
        </li>
        <li>
          Administered identity and access management across <strong>Microsoft Entra ID and Microsoft 365</strong> —
          least-privilege access control, user provisioning and group management
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
          Managed outsourced IT vendors against SLA and availability commitments across 135 outlets —{' '}
          <strong>500+ self-order kiosks, 1,000 POS terminals and 2,000 kitchen display systems</strong>
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
          <strong>Wrote Batch automation scripts during the WannaCry ransomware outbreak</strong> — scanning 60+ retail
          sites for exposure, collating results to a central server for triage and prioritising patching of affected
          devices — and built a diagnostics script to extract hardware models, IP addresses and serial numbers from
          client endpoints
        </li>
        <li>
          Delivered on-site hardware deployment and maintenance for point-of-sale and kitchen display systems across new
          client site openings, and resolved incidents and service requests in ServiceNow
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