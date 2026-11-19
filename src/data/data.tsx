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
  title: 'Yik Tatt Ong | Infrastructure Engineer — AWS & Azure Certified',
  description:
    'Infrastructure engineer in Singapore with 12+ years running production systems, targeting cloud infrastructure and operations roles — AWS Certified Solutions Architect and CloudOps Engineer – Associate, Microsoft Certified: Azure Administrator Associate (AZ-104). Infrastructure as Code with Terraform and GitHub Actions OIDC deployments, a serverless AWS build, Layer 4/7 firewall and WAF policy across Palo Alto and Check Point, and least-privilege identity design across Microsoft Entra ID and Active Directory.',
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
        Infrastructure Engineer · AWS &amp; Azure Certified · Infrastructure as Code, Network Security &amp; Production
        Operations
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        AWS Certified CloudOps Engineer – Associate · AWS Certified Solutions Architect – Associate · Microsoft
        Certified: Azure Administrator Associate (AZ-104) · ITIL 4 Foundation
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I do the systems work myself — Entra ID, Active Directory and Group Policy troubleshooting, Intune-managed
        endpoints and a VMware-hosted server estate across a three-market APAC estate — and I still take the final
        Tier-3 escalation when something breaks. <strong>12+ years in enterprise IT</strong> across Singapore, Japan and
        South Korea, a 200-user estate, with production incident resolution, root-cause analysis and automation
        throughout.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        That operational history is what I bring to cloud. On AWS I built and run the delivery pipeline behind this site
        — S3 and CloudFront behind a custom Route 53 domain with ACM-managed TLS, released through GitHub Actions using
        OIDC role assumption so no access keys are stored, and hardened with WAF rules and least-privilege IAM. The whole
        stack is now managed as Terraform code: 20+ existing resources imported into remote state on HCP Terraform,
        authenticating through OIDC dynamic credentials rather than stored keys, with a second provider configuration in
        us-east-1 for CloudFront-scoped WAF.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Open to{' '}
        <strong>
          Cloud Infrastructure Engineer, Cloud Engineer, Cloud Operations Engineer and Senior Infrastructure Engineer
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
        repetitive work gets scripted. In October 2026 I passed Microsoft's Azure Administrator Associate (AZ-104),
        having added the AWS Solutions Architect and CloudOps Engineer associates earlier in the year alongside the
        role.
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
      text: [
        'AWS CloudOps Engineer – Associate',
        'AWS Solutions Architect – Associate',
        'Microsoft AZ-104',
        'ITIL 4 Foundation',
      ],
      Icon: ShieldCheckIcon,
    },
  ],
};

/**
 * Skills section
 * Mirrors the résumé Skills section in group order and wording.
 *
 * Group order is the target lane: cloud first, then the infrastructure
 * underneath it, with endpoint and modern workplace last. Order *within* a
 * group is not set here — SkillGroup ranks by level at render time, so `level`
 * is the only thing that orders a list. Levels reflect evidenced hands-on use,
 * not certification scope: the cloud services sit deliberately below the
 * identity and server skills even though their group leads the section.
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
      {name: 'Terraform — remote state, OIDC dynamic credentials', level: 5},
      {name: 'Git', level: 7},
      {name: 'GitHub Actions — OIDC Keyless Deployment', level: 7},
      {name: 'CI/CD Pipeline Design', level: 6},
    ],
  },
  {
    name: 'Networking & Security',
    skills: [
      {name: 'Next-Generation Firewall Policy (Palo Alto · Check Point)', level: 8},
      {name: 'Routing & Switching', level: 8},
      {name: 'VLANs & Network Segmentation', level: 8},
      {name: 'VPN (IPSec · WireGuard) & TCP/IP', level: 8},
      {name: 'Infrastructure Hardening', level: 8},
      {name: 'F5 Web Application Firewall (WAF)', level: 7},
    ],
  },
  {
    name: 'Containers, Virtualisation & Homelab',
    skills: [
      {name: 'Docker & Docker Compose', level: 8},
      {name: 'VMware vSphere — VM operations & guest troubleshooting', level: 8},
      {name: 'NetBox (IPAM)', level: 8},
      {name: 'Nginx Proxy Manager — reverse proxy & TLS', level: 8},
      {name: 'Proxmox VE', level: 7},
      {name: 'Technitium DNS Server', level: 7},
    ],
  },
  {
    name: 'Systems & Server Infrastructure',
    skills: [
      {name: 'Windows Server — administration, troubleshooting, standard build imaging, patch compliance', level: 9},
      {name: 'DNS & Server / Hardware Lifecycle Management', level: 8},
      {name: 'Linux — Docker Host Administration', level: 6},
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
    name: 'Operations, Automation & Observability',
    skills: [
      {name: 'Incident Escalation & Problem Management', level: 9},
      {name: 'PowerShell', level: 9},
      {name: 'PRTG — infrastructure, VM & network monitoring', level: 8},
      {name: 'Batch', level: 7},
      {name: 'Zabbix', level: 7},
      {name: 'Datadog — application logs & traces', level: 7},
      {name: 'Bash', level: 6},
    ],
  },
  {
    name: 'Endpoint & Modern Workplace',
    skills: [
      {name: 'Microsoft Intune', level: 9},
      {name: 'Device Compliance Baselines', level: 8},
      {name: 'Ivanti Endpoint Management', level: 8},
      {name: 'WSUS Patch Management', level: 8},
      {name: 'Microsoft 365 · Windows & macOS', level: 8},
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
    title: 'This site — serverless AWS stack, managed as Terraform',
    description:
      'Built and hardened this site myself: a Next.js static export in S3 behind CloudFront, on a custom Route 53 domain with ACM-managed TLS and direct bucket access blocked. Releases run through GitHub Actions using OIDC role assumption — no stored access keys — so each merge to main builds, syncs and invalidates the CDN. Hardened with AWS WAF rules and least-privilege IAM, plus a serverless contact form on Lambda and SNS. The whole running stack is now managed as Terraform: 20+ existing resources adopted into remote state on HCP Terraform rather than rebuilt, authenticating through OIDC dynamic credentials, with a second us-east-1 provider configuration for the CloudFront-scoped WAF Web ACL.',
    tech: ['Terraform', 'S3', 'CloudFront', 'Route 53', 'ACM', 'WAF', 'Lambda', 'SNS', 'GitHub Actions (OIDC)'],
    url: 'https://github.com/ongyiktatt/cloud-resume',
  },
  {
    title: 'Homelab — infrastructure as code, virtualisation and IPAM',
    description:
      'A self-hosted environment I run continuously, currently being brought under Terraform: virtual machines and containers defined as declarative configuration, with state and changes tracked in Git rather than built by hand, using the Proxmox provider. The platform underneath is Proxmox VE and a Docker host serving virtualised and containerised services, with Nginx Proxy Manager handling reverse proxy and TLS termination, NetBox as the source of truth for IP address management and device inventory, and Technitium as the internal DNS resolver. Kept deliberately documented rather than ad hoc.',
    tech: ['Proxmox VE', 'Terraform', 'Docker', 'NetBox (IPAM)', 'Nginx Proxy Manager', 'Technitium'],
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
 *
 * Certifications are strictly newest-to-oldest, in the same order and with the same
 * membership as the résumé PDF. Relevance ordering was tried and reverted: both
 * surfaces print a date beside every certificate, so an out-of-sequence list reads
 * as a mistake rather than a priority.
 *
 * MD-102 (endpoint) and Cloud Practitioner were trimmed from both surfaces on
 * 17 Nov 2026 — MD-102 is off-lane for cloud infrastructure/operations and CCP is
 * redundant beneath Solutions Architect. The Intune and endpoint claims they used to
 * back are made by the Work entries, not by the credential.
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
              Own the Singapore end-user computing estate hands-on — Microsoft Teams Rooms unified communications, patch
              compliance and device configuration standards
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
          Configured and troubleshot network security policy across <strong>Palo Alto and Check Point</strong>{' '}
          next-generation firewalls, with <strong>F5</strong> handling web application firewall (WAF) policy — covering
          rule review, change testing and fault isolation during incidents
        </li>
        <li>
          Administered <strong>Active Directory, Group Policy, WSUS patch compliance and the Ivanti endpoint platform</strong>{' '}
          across the corporate server and endpoint estate, alongside identity and access management across{' '}
          <strong>Microsoft Entra ID and Microsoft 365</strong> — least-privilege access control, user provisioning and
          group management
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