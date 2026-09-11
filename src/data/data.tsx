import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  // SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
// import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
// import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
// import TwitterIcon from '../components/Icon/TwitterIcon';
import heroImage from '../images/header-background.jpg';
// import porfolioImage1 from '../images/portfolio/portfolio-1.jpg';
// import porfolioImage2 from '../images/portfolio/portfolio-2.jpg';
// import porfolioImage3 from '../images/portfolio/portfolio-3.jpg';
// import porfolioImage4 from '../images/portfolio/portfolio-4.jpg';
// import porfolioImage5 from '../images/portfolio/portfolio-5.jpg';
// import porfolioImage6 from '../images/portfolio/portfolio-6.jpg';
// import porfolioImage7 from '../images/portfolio/portfolio-7.jpg';
// import porfolioImage8 from '../images/portfolio/portfolio-8.jpg';
// import porfolioImage9 from '../images/portfolio/portfolio-9.jpg';
// import porfolioImage10 from '../images/portfolio/portfolio-10.jpg';
// import porfolioImage11 from '../images/portfolio/portfolio-11.jpg';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

const currentYear = new Date().getFullYear();
const yearOfBirth = 1995;
/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Yik Tatt Ong - IT Manager, APAC',
  description: "",
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
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Yik Tatt Ong.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        <strong className='text-stone-100'>IT Operations Leader with 10+ years</strong> across multi-country enterprise environments, now building hands-on cloud infrastructure expertise through <strong className='text-stone-100'>AWS Solutions Architect and CloudOps certifications</strong> and self-directed <strong className='text-stone-100'>Terraform and Git</strong> projects.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Looking to bring proven operational rigor and stakeholder communication to a <strong className='text-stone-100'>Cloud Infrastructure Engineering role</strong>, available from January 2027.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
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
  description: `What started as managing IT operations across Singapore, South Korea, and Japan grew into a genuine curiosity for how modern infrastructure gets built — leading me to spend the past year earning AWS certifications and building hands-on Terraform projects in my own homelab. I'm now looking to bring that same operational discipline to a Cloud Infrastructure Engineering role. Outside of work, I'm usually tinkering with my homelab, exploring photography, or nerding out over hi-fi audio gear.`,
  aboutItems: [
    {label: 'Location', text: 'Singapore', Icon: MapIcon},
    {label: 'Age', text: String(currentYear - yearOfBirth), Icon: CalendarIcon},
    {label: 'Nationality', text: 'Malaysian, Singapore PR', Icon: FlagIcon},
    // {label: 'Interests', text: 'Motorcycles, Muay Thai, Banjos', Icon: SparklesIcon},
    {label: 'Study', text: 'Temasek Polytechnic', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Wargaming.net', Icon: BuildingOffice2Icon},  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Cloud',
    skills: [
      {
        name: 'AWS(VPC, EC2, S3, IAM, Route 53)',
        level: 8,
      },
      {
        name: 'Azure(VMs, Storage Accounts, Front Door, VNet, Entra ID)',
        level: 7
      }
    ]
  },
  {
    name: 'Infrastructure',
    skills: [
      {
        name: 'Docker',
        level: 9,
      },
      {
        name: 'Terraform',
        level: 8,
      },
    ]
  },
  {
    name: 'Networking',
    skills: [
      {
        name: 'TCP/IP',
        level: 10,
      },
      {
        name: 'DNS',
        level: 10,
      },
      {
        name: 'Routing',
        level: 10,
      }
    ]
  },
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'Chinese(Mandarin)',
        level: 10,
      },
    ],
  },

];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  // {
  //   title: 'Project title 1',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage1,
  // },
  // {
  //   title: 'Project title 2',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage2,
  // },
  // {
  //   title: 'Project title 3',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage3,
  // },
  // {
  //   title: 'Project title 4',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage4,
  // },
  // {
  //   title: 'Project title 5',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage5,
  // },
  // {
  //   title: 'Project title 6',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage6,
  // },
  // {
  //   title: 'Project title 7',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage7,
  // },
  // {
  //   title: 'Project title 8',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage8,
  // },
  // {
  //   title: 'Project title 9',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage9,
  // },
  // {
  //   title: 'Project title 10',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage10,
  // },
  // {
  //   title: 'Project title 11',
  //   description: 'Give a short description of your project here.',
  //   url: 'https://reactresume.com',
  //   image: porfolioImage11,
  // },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const certification: TimelineItem[] = [
  {
    date: 'August 2026',
    location: 'AWS',
    title: 'AWS Certified CloudOps Engineer - Associate',
    url: 'https://www.credly.com/badges/209df12d-e120-4509-ad16-6c4d6fa05ca8/linked_in_profile',
    content: <></>
  },
  {
    date: 'July 2026',
    location: 'AWS',
    title: 'AWS Certified Solutions Architect - Associate',
    url: 'https://www.credly.com/badges/b03143a4-ab95-45ea-93f4-068addd79ec6/linked_in_profile',
    content: <></>
  },
  {
    date: 'May 2026',
    location: 'AWS',
    title: 'AWS Certified Cloud Practitioner',
    url: 'https://www.credly.com/badges/46c9f759-e3bc-42ae-8cab-73fd6da6f8ac/linked_in_profile',
    content: <></>
  },
  {
    date: 'May 2021',
    location: 'ITIL',
    title: 'ITIL 4 Foundation',
    url: 'https://www.peoplecert.org/for-corporations/certificate-verification-service',
    content: <>Credential ID: GR671273878OY</>
  },
];
export const education: TimelineItem[] = [
  {
    date: 'October 2022',
    location: 'Temasek Polytechnic, Singapore',
    title: 'Diploma in Infocomm and Digital Media',
    content: <></>
  },
];


export const experience: TimelineItem[] = [
  {
    date: 'February 2023 - Present',
    location: 'Wargaming.net',
    title: 'IT Manager, APAC',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li><strong className='text-stone-0'>Built PowerShell automation to validate Secure Boot certificates and deploy language packs</strong>, cutting manual device setup time by 20%</li>
        <li>Owned regional IT operations end-to-end — <strong className='text-stone-0'>S$100K annual budget</strong>, vendor SLAs, and infrastructure across 200+ users in three countries</li>
        <li>Secured a multi-OS environment with <strong className='text-stone-0'>Microsoft Intune, Entra ID, and Conditional Access</strong>, managing endpoint compliance and identity lifecycle at scale</li>
        <li>Led pilot testing and regional rollout of global IT initiatives, validating infrastructure changes before deployment across all three markets</li>
        <li><strong className='text-stone-0'>Redesigned service desk workflows and introduced proactive endpoint monitoring</strong>, cutting recurring incident escalations by 20%</li>
        <li>Managed office network infrastructure and unified communications, including Microsoft Teams Rooms deployment</li>
      </ul>
    ),
  },
  {
    date: 'June 2022 - February 2023',
    location: 'Tabsquare.ai',
    title: 'Operations Manager, Deployment and Support',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li><strong className='text-stone-0'>Restructured an 8-person support team into two specialized units</strong> — Project Delivery and Technical Support — separating deployment work from reactive maintenance, improving deployment speed by 20%</li>
        <li><strong className='text-stone-0'>Standardized end-to-end client onboarding and transferred ownership to autonomous team leads</strong>, cutting leadership escalations by 20% while increasing onboarding capacity by 40%</li>
        <li>Partnered with Product Engineering on deployment feedback and recurring defect trends, directly informing product improvements and release planning</li>
        <li>Designed and delivered technical training in <strong className='text-stone-0'>IP networking, OS virtualization, and database fundamentals</strong>, building the team's ability to troubleshoot independently</li>
      </ul>
    ),
  },
  {
    date: 'May 2021 - June 2022',
    location: 'SAFRA',
    title: 'IT Infrastructure Lead',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li><strong className='text-stone-0'>Led data center migrations as part of a $2M digital transformation</strong>, moving core enterprise applications — including Microsoft Dynamics AX ERP and gaming systems — into Tier-3 co-location facilities with minimal downtime</li>
        <li>Configured and troubleshot hybrid network security perimeters, managing <strong className='text-stone-0'>Layer 4/7 stateful filtering across F5 WAF, Palo Alto, and Check Point Next-Gen Firewalls</strong></li>
        <li>Administered identity and access management across <strong className='text-stone-0'>Microsoft Entra ID, Microsoft 365, and AWS IAM</strong> — user provisioning, group management, and access control</li>
        <li>Managed a <strong className='text-stone-0'>$100K annual operating budget</strong> covering Office 365 configuration and hardware fleet maintenance</li>
        <li>Served as final Tier-3 escalation owner for systemic server and infrastructure issues, supervising outsourced desktop support vendors</li>
      </ul>
    ),
  },
  {
    date: 'December 2017 - May 2021',
    location: 'McDonald\'s Singapore',
    title: 'IT Consultant II, Restaurant Technology',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li><strong className='text-stone-0'>Integrated GrabFood and Foodpanda with the POS system to automate order processing</strong> improving kitchen fulfillment speed by 60% and contributing to a 25% increase in digital sales</li>
        <li>Managed outsourced IT vendors across <strong className='text-stone-0'>135 restaurant outlets</strong>, ensuring SLA compliance and operational support for <strong className='text-stone-0'>500+ self-order kiosks, 1,000 POS terminals, and 2,000 kitchen display systems</strong></li>
        <li>Led hardware staging, configuration, and network readiness for the <strong className='text-stone-0'>nationwide rollout of the McDonald's App</strong> across all 135 outlets</li>
      </ul>
    ),
  },
  {
    date: 'December 2013 - December 2017',
    location: 'Systems Design',
    title: 'Computer Technician',
    content: (
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li><strong className='text-stone-0'>Built a diagnostics script (Batch) to scan client endpoints</strong> and extract hardware models, IP addresses, and serial numbers — replacing manual asset tracking during rollouts</li>
        <li>Staged and configured servers for customer deployments, alongside edge hardware including <strong className='text-stone-0'>Cisco routers, switches, and wireless access points</strong></li>
      </ul>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    // {
    //   name: 'John Doe',
    //   text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
    //   image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    // },
    // {
    //   name: 'Jane Doe',
    //   text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
    //   image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    // },
    // {
    //   name: 'Someone else',
    //   text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
    //   image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    // },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'ytong95@gmail.com',
      href: 'mailto:ytong95@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Singapore',
      // href: 'https://www.google.ca/maps/place/Victoria,+BC/@48.4262362,-123.376775,14z',
    },
    // {
    //   type: ContactType.Instagram,
    //   text: '@tbakerx',
    //   href: 'https://www.instagram.com/tbakerx/',
    // },
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
  // { label: 'Stack Overflow', Icon: StackOverflowIcon, href: 'https://stackoverflow.com/users/8553186/tim-baker' },
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/ongyiktatt/'},
  // { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/reactresume/' },  // { label: 'Twitter', Icon: TwitterIcon, href: 'https://twitter.com/TimBakerx' },
];
