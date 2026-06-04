export type ProofItem = {
  label: string;
  detail: string;
  href?: string;
};

export type Service = {
  id: "build" | "rescue";
  title: string;
  summary: string;
  bullets: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  impact: string[];
  stack: string[];
  href?: string;
  privacy: "public" | "anonymized" | "role-based";
};

export type StackGroup = {
  title: string;
  summary: string;
  items: string[];
};

export const SITE = {
  name: "Jastinne Cesar Macalalad",
  handle: "jatskie",
  domain: "jatskie.com",
  email: "jace.macalalad@gmail.com",
  location: "Victoria, Australia",
  tagline: "Custom business systems, legacy rescue, and practical software from firmware to frontend.",
  description:
    "I build custom web apps, operational systems, and maintainable software for small businesses and founders who need things to actually work.",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" }
  ],
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See selected work", href: "#work" }
} as const;

export const proofItems: ProofItem[] = [
  {
    label: "UPDox",
    detail: "Past developer on document collaboration and workflow systems for UP Diliman.",
    href: "https://iskomunidad.upd.edu.ph/index.php?title=UPDox"
  },
  {
    label: "Ignite Careers",
    detail: "Recruitment technology leadership and operational systems experience."
  },
  {
    label: "NEO self-service systems",
    detail: "Experience around self-service technology, hardware-adjacent interfaces, and operations.",
    href: "https://au.linkedin.com/company/neo-solutions-australia"
  },
  {
    label: "Iskomunidad / iskWiki",
    detail: "Credited for design/customization and developer work on UP Diliman's community wiki.",
    href: "https://iskomunidad.upd.edu.ph/index.php?title=Iskomunidad%3AAbout"
  },
  {
    label: "UP Diliman learning objects",
    detail: "Developer credits across interactive educational modules.",
    href: "https://ilc.upd.edu.ph/portfolio/market-supply-learning-object/"
  },
  {
    label: "Google Cloud credential",
    detail: "Best of Next '22 credential listed publicly on LinkedIn.",
    href: "https://au.linkedin.com/in/jatskie"
  }
];

export const services: Service[] = [
  {
    id: "build",
    title: "Build custom business systems",
    summary:
      "Turn manual workflows, disconnected tools, and business-specific requirements into software your team can rely on.",
    bullets: [
      "Custom web apps and admin portals",
      "Booking, enrolment, and workflow systems",
      "Dashboards, reporting, and operational tools",
      "Integrations between websites, platforms, and business processes"
    ]
  },
  {
    id: "rescue",
    title: "Rescue and modernize legacy software",
    summary:
      "Stabilize inherited systems, simplify painful workflows, and modernize code without losing the business knowledge inside it.",
    bullets: [
      "Inherited codebase assessment and cleanup",
      "Deployment, hosting, and maintainability improvements",
      "Legacy feature modernization",
      "Practical plans for teams that need progress without drama"
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "updox",
    title: "UPDox document collaboration systems",
    eyebrow: "Public university systems",
    summary:
      "Past developer work on UP Diliman document collaboration and workflow infrastructure, where reliability, access, and process mattered.",
    impact: [
      "Supported document collaboration and versioned file workflows",
      "Worked in an environment with university users, permissions, and operational constraints",
      "Publicly listed as a past developer on the UPDox project"
    ],
    stack: ["Alfresco-style document systems", "Web collaboration", "Workflow systems"],
    href: "https://iskomunidad.upd.edu.ph/index.php?title=UPDox",
    privacy: "public"
  },
  {
    id: "ignite-careers",
    title: "Ignite Careers recruitment technology",
    eyebrow: "Operational technology leadership",
    summary:
      "Technology leadership experience in recruitment operations, where process clarity, business visibility, and system reliability matter.",
    impact: [
      "Worked across business operations and technology decisions",
      "Supported systems serving recruitment workflows",
      "Relevant proof for founders who need senior technical judgment"
    ],
    stack: ["Business systems", "Recruitment operations", "Technical leadership"],
    privacy: "role-based"
  },
  {
    id: "anonymized-business-systems",
    title: "Booking, enrolment, and operational systems",
    eyebrow: "Anonymized freelance work",
    summary:
      "Private client systems for hotels, restaurants, universities, and small businesses, anonymized to protect commercial details.",
    impact: [
      "Booking and enquiry flows for customer-facing websites",
      "Admin tools for managing operational data",
      "University website and enrolment workflow support"
    ],
    stack: ["PHP / Laravel", "WordPress", "JavaScript", "SQL", "AWS"],
    privacy: "anonymized"
  }
];

export const supportingWork: CaseStudy[] = [
  {
    id: "iskwiki",
    title: "Iskomunidad / iskWiki",
    eyebrow: "Public collaboration platform",
    summary:
      "Developer and design/customization credits on a UP Diliman community wiki and collaboration platform.",
    impact: [
      "Publicly credited for design and customization",
      "Connected collaboration, content, permissions, and university workflows"
    ],
    stack: ["MediaWiki-style systems", "Content platforms", "Permissions"],
    href: "https://iskomunidad.upd.edu.ph/index.php?title=Iskomunidad%3AAbout",
    privacy: "public"
  },
  {
    id: "learning-objects",
    title: "UP Diliman interactive learning objects",
    eyebrow: "Educational software",
    summary:
      "Developer credits across interactive modules for economics, science, language, and other learning contexts.",
    impact: [
      "Built educational software with instructional teams",
      "Translated subject matter into interactive learning experiences"
    ],
    stack: ["Interactive learning", "Frontend interfaces", "Content systems"],
    href: "https://ilc.upd.edu.ph/portfolio/market-supply-learning-object/",
    privacy: "public"
  },
  {
    id: "employer-systems",
    title: "NEO, Salmat, and MicroSourcing experience",
    eyebrow: "Role-based experience",
    summary:
      "Employer work is presented by domain and role only, without exposing private clients, internal architecture, or non-public metrics.",
    impact: [
      "Self-service and hardware-adjacent systems",
      "Operational software and support contexts",
      "Cross-functional engineering in real business environments"
    ],
    stack: ["Hardware integration", "Operational platforms", "Business systems"],
    privacy: "role-based"
  }
];

export const stackGroups: StackGroup[] = [
  {
    title: "Systems and hardware",
    summary: "For projects where software meets devices, kiosks, POS-style flows, or firmware-adjacent constraints.",
    items: ["C++", "Hardware integration", "Firmware-adjacent development", "Kiosk and POS-style interfaces"]
  },
  {
    title: "Web and product",
    summary: "For custom business applications, admin tools, booking flows, and modern frontend interfaces.",
    items: ["PHP / Laravel", "JavaScript", "TypeScript", "Node.js", "WordPress"]
  },
  {
    title: "Learning and content platforms",
    summary: "For structured content, educational workflows, and collaboration platforms.",
    items: ["Moodle", "MediaWiki-style systems", "Content management", "Document workflows"]
  },
  {
    title: "Cloud and infrastructure",
    summary: "For deployment, modernization, maintainability, and practical production operations.",
    items: ["AWS", "Cloudflare", "Linux/server operations", "Static and dynamic hosting"]
  }
];
