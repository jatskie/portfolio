# jatskie.com Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a static-first personal portfolio for Jastinne Cesar Macalalad that can be deployed to Cloudflare Pages at `jatskie.com`.

**Architecture:** Use Astro for a fast static site, with content stored in typed local data modules and UI split into focused section components. Contact is static-friendly: form validation plus generated `mailto:` fallback, with a documented upgrade path for Cloudflare Pages Functions later.

**Tech Stack:** Astro, TypeScript, Vitest, vanilla CSS, static Cloudflare Pages deployment.

---

## File Map

- Create: `package.json` - npm scripts and dependencies.
- Create: `astro.config.mjs` - Astro static build config and canonical site URL.
- Create: `tsconfig.json` - strict TypeScript settings.
- Create: `vitest.config.ts` - unit test configuration.
- Create: `src/env.d.ts` - Astro type references.
- Create: `src/data/site.ts` - all approved portfolio content, proof points, services, case studies, and stack groups.
- Create: `src/data/site.test.ts` - content integrity tests.
- Create: `src/utils/contact.ts` - contact validation and `mailto:` generation.
- Create: `src/utils/contact.test.ts` - contact helper tests.
- Create: `src/layouts/BaseLayout.astro` - page shell, metadata, navigation, and footer.
- Create: `src/styles/global.css` - complete visual system and responsive styles.
- Create: `src/components/Hero.astro` - first viewport and primary CTAs.
- Create: `src/components/ProofStrip.astro` - credibility anchors.
- Create: `src/components/Services.astro` - build/rescue service sections.
- Create: `src/components/CaseStudies.astro` - selected and supporting work.
- Create: `src/components/Stack.astro` - grouped stack.
- Create: `src/components/About.astro` - concise origin story.
- Create: `src/components/Contact.astro` - static contact form and email fallback.
- Create: `src/pages/index.astro` - homepage assembly.
- Create: `src/pages/404.astro` - simple not-found page.
- Create: `public/favicon.svg` - minimal `JM` mark.
- Create: `public/robots.txt` - crawler instructions.
- Create: `public/_headers` - basic static security headers for Cloudflare Pages.
- Create: `docs/deployment/cloudflare-pages.md` - deploy and domain notes.
- Modify: `.gitignore` - add `.astro/`, `.wrangler/`, and local runtime files.

## Execution Notes

- Before visual implementation work, load `design-taste-frontend` and follow its audit and polish guidance.
- Before claiming completion, load `superpowers:verification-before-completion`.
- Do not add private client names, screenshots, source code, internal architecture, private metrics, or contact-enrichment data.
- If dependency installation fails because of network restrictions, rerun the install command with escalation approval.

---

### Task 1: Scaffold Astro Project Config

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/env.d.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create `package.json`**

Create `package.json` with this content:

```json
{
  "name": "jatskie-portfolio",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "build": "astro check && astro build",
    "preview": "astro preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/check": "latest",
    "astro": "latest",
    "typescript": "latest"
  },
  "devDependencies": {
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jatskie.com",
  output: "static"
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    globals: true
  }
});
```

- [ ] **Step 5: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 6: Update `.gitignore`**

Ensure `.gitignore` contains exactly these entries:

```gitignore
.superpowers/
node_modules/
dist/
.astro/
.wrangler/
.env
.env.*
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and npm reports packages installed without vulnerabilities that block local development.

- [ ] **Step 8: Commit scaffold**

Run:

```bash
git add .gitignore package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src/env.d.ts
git commit -m "chore: scaffold Astro portfolio"
```

Expected: Commit succeeds.

---

### Task 2: Add Typed Portfolio Content

**Files:**
- Create: `src/data/site.test.ts`
- Create: `src/data/site.ts`

- [ ] **Step 1: Write failing content tests**

Create `src/data/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { caseStudies, proofItems, services, SITE, stackGroups } from "./site";

describe("portfolio content", () => {
  it("uses the approved launch contact email", () => {
    expect(SITE.email).toBe("jace.macalalad@gmail.com");
  });

  it("keeps the primary positioning focused on systems and legacy rescue", () => {
    expect(SITE.tagline).toContain("Custom business systems");
    expect(SITE.tagline).toContain("legacy rescue");
    expect(SITE.tagline).toContain("firmware to frontend");
  });

  it("has the two approved service lanes", () => {
    expect(services.map((service) => service.id)).toEqual(["build", "rescue"]);
  });

  it("includes the required proof anchors", () => {
    const proofLabels = proofItems.map((item) => item.label);
    expect(proofLabels).toContain("UPDox");
    expect(proofLabels).toContain("Ignite Careers");
    expect(proofLabels).toContain("NEO self-service systems");
    expect(proofLabels).toContain("Iskomunidad / iskWiki");
  });

  it("keeps private client work anonymized", () => {
    const anonymized = caseStudies.find((item) => item.id === "anonymized-business-systems");
    expect(anonymized?.privacy).toBe("anonymized");
    expect(anonymized?.title.toLowerCase()).not.toContain("hotel name");
    expect(anonymized?.title.toLowerCase()).not.toContain("restaurant name");
  });

  it("represents firmware-to-frontend breadth in stack groups", () => {
    const stackText = stackGroups.flatMap((group) => group.items).join(" ");
    expect(stackText).toContain("C++");
    expect(stackText).toContain("PHP / Laravel");
    expect(stackText).toContain("Hardware integration");
    expect(stackText).toContain("TypeScript");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
npm test
```

Expected: FAIL because `src/data/site.ts` does not exist.

- [ ] **Step 3: Implement `src/data/site.ts`**

Create `src/data/site.ts`:

```ts
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
```

- [ ] **Step 4: Run content tests**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit content model**

Run:

```bash
git add src/data/site.ts src/data/site.test.ts
git commit -m "feat: add portfolio content model"
```

Expected: Commit succeeds.

---

### Task 3: Add Contact Form Logic

**Files:**
- Create: `src/utils/contact.test.ts`
- Create: `src/utils/contact.ts`

- [ ] **Step 1: Write failing contact tests**

Create `src/utils/contact.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildMailto, validateContact } from "./contact";

describe("contact helpers", () => {
  it("requires name, email, and message", () => {
    expect(validateContact({ name: "", email: "", projectType: "", budgetTimeline: "", message: "" })).toEqual({
      name: "Enter your name.",
      email: "Enter your email.",
      message: "Tell me a little about the project."
    });
  });

  it("rejects invalid email", () => {
    expect(validateContact({ name: "Sam", email: "not-email", projectType: "", budgetTimeline: "", message: "Help" })).toEqual({
      email: "Enter a valid email address."
    });
  });

  it("builds a mailto URL with encoded project details", () => {
    const mailto = buildMailto({
      name: "Sam Lee",
      email: "sam@example.com",
      projectType: "Legacy rescue",
      budgetTimeline: "Soon",
      message: "We inherited a Laravel app."
    });

    expect(mailto).toContain("mailto:jace.macalalad@gmail.com");
    expect(mailto).toContain("subject=Project%20enquiry%20from%20Sam%20Lee");
    expect(mailto).toContain("We%20inherited%20a%20Laravel%20app.");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
npm test
```

Expected: FAIL because `src/utils/contact.ts` does not exist.

- [ ] **Step 3: Implement `src/utils/contact.ts`**

Create `src/utils/contact.ts`:

```ts
import { SITE } from "../data/site";

export type ContactFormValues = {
  name: string;
  email: string;
  projectType: string;
  budgetTimeline: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email.";
  else if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Tell me a little about the project.";

  return errors;
}

export function buildMailto(values: ContactFormValues): string {
  const subject = `Project enquiry from ${values.name.trim() || "jatskie.com"}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Project type: ${values.projectType.trim() || "Not specified"}`,
    `Budget / timeline: ${values.budgetTimeline.trim() || "Not specified"}`,
    "",
    "Message:",
    values.message.trim()
  ].join("\n");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
```

- [ ] **Step 4: Run contact tests**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit contact logic**

Run:

```bash
git add src/utils/contact.ts src/utils/contact.test.ts
git commit -m "feat: add contact mailto helper"
```

Expected: Commit succeeds.

---

### Task 4: Add Base Layout and Global Visual System

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/styles/global.css`

- [ ] **Step 1: Load visual implementation skill**

Load `design-taste-frontend` before writing layout and CSS. Follow the skill's anti-generic design checks while keeping the approved "Operational Authority" direction.

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";
import { SITE } from "../data/site";

type Props = {
  title?: string;
  description?: string;
};

const {
  title = `${SITE.name} - Custom business systems and legacy rescue`,
  description = SITE.description
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site ?? "https://jatskie.com").toString();
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="theme-color" content="#101417" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content={SITE.domain} />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/" aria-label={`${SITE.name} home`}>
        <span class="brand-mark">JM</span>
        <span>
          <strong>{SITE.handle}</strong>
          <small>{SITE.location}</small>
        </span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        {SITE.nav.map((item) => <a href={item.href}>{item.label}</a>)}
      </nav>
    </header>
    <main id="main">
      <slot />
    </main>
    <footer class="site-footer">
      <p>Built for practical software, operational systems, and legacy rescue.</p>
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
    </footer>
  </body>
</html>
```

- [ ] **Step 3: Create `src/styles/global.css`**

```css
:root {
  color-scheme: dark;
  --bg: #101417;
  --bg-soft: #151b1f;
  --panel: #1b2328;
  --panel-strong: #222d33;
  --text: #f4f7ef;
  --muted: #aeb9ad;
  --line: rgba(244, 247, 239, 0.14);
  --accent: #d7ff63;
  --accent-2: #81d8d0;
  --danger: #ff8f70;
  --max: 1180px;
  --radius: 8px;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / 64px 64px,
    linear-gradient(0deg, rgba(255, 255, 255, 0.026) 1px, transparent 1px) 0 0 / 64px 64px,
    var(--bg);
  color: var(--text);
  line-height: 1.5;
}

a {
  color: inherit;
}

button,
input,
textarea,
select {
  font: inherit;
}

.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  transform: translateY(-140%);
  background: var(--accent);
  color: #101417;
  padding: 10px 12px;
  border-radius: 6px;
  font-weight: 800;
}

.skip-link:focus {
  transform: translateY(0);
}

.site-header,
.site-footer,
.section {
  width: min(var(--max), calc(100% - 32px));
  margin-inline: auto;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 78px;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 7px;
  background: var(--accent);
  color: #101417;
  font-weight: 900;
}

.brand strong,
.brand small {
  display: block;
}

.brand small,
.eyebrow,
.meta,
.muted {
  color: var(--muted);
}

.site-nav {
  display: flex;
  gap: 20px;
  font-size: 0.94rem;
}

.site-nav a {
  text-decoration: none;
  color: var(--muted);
}

.site-nav a:hover,
.site-nav a:focus {
  color: var(--text);
}

.section {
  padding: 88px 0;
}

.section-header {
  display: grid;
  gap: 12px;
  max-width: 760px;
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  font-weight: 800;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  letter-spacing: 0;
  line-height: 1.02;
}

h1 {
  max-width: 900px;
  font-size: clamp(3.2rem, 8vw, 7.8rem);
  margin-bottom: 24px;
}

h2 {
  font-size: clamp(2rem, 4vw, 4.2rem);
  margin-bottom: 0;
}

h3 {
  font-size: 1.25rem;
}

.lead {
  max-width: 680px;
  color: var(--muted);
  font-size: clamp(1.08rem, 2vw, 1.35rem);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border-radius: 7px;
  border: 1px solid var(--line);
  padding: 0 16px;
  text-decoration: none;
  font-weight: 800;
}

.button.primary {
  background: var(--accent);
  color: #101417;
  border-color: var(--accent);
}

.button.secondary {
  background: rgba(255, 255, 255, 0.04);
}

.grid {
  display: grid;
  gap: 16px;
}

.grid.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.panel {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025));
  padding: 22px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
}

.tag-list li {
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  padding: 6px 10px;
  font-size: 0.86rem;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--line);
  padding: 28px 0 40px;
  color: var(--muted);
}

.site-footer p {
  margin: 0;
}

@media (max-width: 820px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px 0;
  }

  .site-nav {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .section {
    padding: 64px 0;
  }

  .grid.two,
  .grid.three {
    grid-template-columns: 1fr;
  }

  .site-footer {
    flex-direction: column;
  }
}
```

- [ ] **Step 4: Run type check/build to find missing page error**

Run:

```bash
npm run build
```

Expected: FAIL because no `src/pages/index.astro` exists yet. This confirms the config is active.

- [ ] **Step 5: Commit layout shell**

Run:

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css
git commit -m "feat: add portfolio layout shell"
```

Expected: Commit succeeds.

---

### Task 5: Build Homepage Section Components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProofStrip.astro`
- Create: `src/components/Services.astro`
- Create: `src/components/CaseStudies.astro`
- Create: `src/components/Stack.astro`
- Create: `src/components/About.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { SITE } from "../data/site";
---

<section class="hero section">
  <p class="eyebrow">Operational systems engineer - {SITE.location}</p>
  <h1>{SITE.tagline}</h1>
  <p class="lead">{SITE.description}</p>
  <div class="button-row">
    <a class="button primary" href={SITE.primaryCta.href}>{SITE.primaryCta.label}</a>
    <a class="button secondary" href={SITE.secondaryCta.href}>{SITE.secondaryCta.label}</a>
  </div>
  <div class="hero-signal" aria-label="Engineering breadth">
    <span>C++</span>
    <span>Hardware integration</span>
    <span>Laravel</span>
    <span>TypeScript</span>
    <span>AWS</span>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/ProofStrip.astro`**

```astro
---
import { proofItems } from "../data/site";
---

<section class="proof-strip section" aria-label="Proof points">
  {proofItems.map((item) => (
    <article class="proof-item">
      <p class="eyebrow">{item.label}</p>
      <p>{item.detail}</p>
      {item.href && <a href={item.href} rel="noreferrer" target="_blank">Public reference</a>}
    </article>
  ))}
</section>
```

- [ ] **Step 3: Create `src/components/Services.astro`**

```astro
---
import { services } from "../data/site";
---

<section class="section" id="services">
  <div class="section-header">
    <p class="eyebrow">Services</p>
    <h2>Build what the business needs. Rescue what the business already depends on.</h2>
    <p class="lead">I work best where software is tied to real operations: bookings, enrolments, admin workflows, devices, reporting, and systems that have to keep earning trust.</p>
  </div>
  <div class="grid two">
    {services.map((service) => (
      <article class="panel service-card">
        <p class="eyebrow">0{services.indexOf(service) + 1}</p>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
        <ul>
          {service.bullets.map((bullet) => <li>{bullet}</li>)}
        </ul>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 4: Create `src/components/CaseStudies.astro`**

```astro
---
import { caseStudies, supportingWork } from "../data/site";
---

<section class="section" id="work">
  <div class="section-header">
    <p class="eyebrow">Selected work</p>
    <h2>Proof from collaboration platforms, recruitment systems, and anonymized business software.</h2>
    <p class="lead">Named where public, anonymized where commercial privacy matters.</p>
  </div>
  <div class="grid three case-grid">
    {caseStudies.map((item) => (
      <article class="panel case-card">
        <p class="eyebrow">{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <ul>
          {item.impact.map((impact) => <li>{impact}</li>)}
        </ul>
        <ul class="tag-list">
          {item.stack.map((tag) => <li>{tag}</li>)}
        </ul>
        {item.href && <a class="case-link" href={item.href} rel="noreferrer" target="_blank">View public reference</a>}
      </article>
    ))}
  </div>
  <div class="supporting-work">
    <p class="eyebrow">Additional proof</p>
    <div class="grid three">
      {supportingWork.map((item) => (
        <article>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          {item.href && <a href={item.href} rel="noreferrer" target="_blank">Reference</a>}
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Create `src/components/Stack.astro`**

```astro
---
import { stackGroups } from "../data/site";
---

<section class="section" id="stack">
  <div class="section-header">
    <p class="eyebrow">Stack</p>
    <h2>From firmware-adjacent constraints to the frontend interface people actually use.</h2>
  </div>
  <div class="grid two">
    {stackGroups.map((group) => (
      <article class="panel">
        <h3>{group.title}</h3>
        <p>{group.summary}</p>
        <ul class="tag-list">
          {group.items.map((item) => <li>{item}</li>)}
        </ul>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 6: Create `src/components/About.astro`**

```astro
---
import { SITE } from "../data/site";
---

<section class="section about-section">
  <div class="section-header">
    <p class="eyebrow">About {SITE.handle}</p>
    <h2>I fell in love with computers at 8. I still like the practical magic of making them useful.</h2>
    <p class="lead">That curiosity became a career across educational systems, collaboration platforms, recruitment technology, self-service systems, websites, booking flows, enrolment workflows, and hardware-integrated interfaces.</p>
  </div>
  <div class="panel">
    <p>Today I help small businesses and founders build software that fits how their operations really work, and I help rescue older systems that still matter but have become hard to change.</p>
  </div>
</section>
```

- [ ] **Step 7: Add component-specific CSS**

Append this to `src/styles/global.css`:

```css
.hero {
  min-height: calc(100vh - 78px);
  display: grid;
  align-content: center;
  padding-top: 52px;
}

.hero-signal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 760px;
  margin-top: 42px;
}

.hero-signal span {
  border: 1px solid var(--line);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  padding: 9px 11px;
}

.proof-strip {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1px;
  padding-top: 0;
}

.proof-item {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.035);
  padding: 16px;
  min-height: 170px;
}

.proof-item p:last-of-type {
  color: var(--muted);
  font-size: 0.92rem;
}

.proof-item a,
.case-link,
.supporting-work a {
  color: var(--accent);
  font-weight: 800;
  text-decoration: none;
}

.service-card ul,
.case-card ul:not(.tag-list) {
  display: grid;
  gap: 10px;
  padding-left: 18px;
  color: var(--muted);
}

.case-card {
  display: flex;
  flex-direction: column;
}

.case-link {
  margin-top: auto;
  padding-top: 20px;
}

.supporting-work {
  border-top: 1px solid var(--line);
  margin-top: 32px;
  padding-top: 32px;
}

.about-section .panel {
  max-width: 760px;
}

@media (max-width: 1080px) {
  .proof-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .hero {
    min-height: auto;
  }

  .proof-strip {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Commit components**

Run:

```bash
git add src/components src/styles/global.css
git commit -m "feat: add homepage portfolio sections"
```

Expected: Commit succeeds.

---

### Task 6: Add Contact Section Component

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create `src/components/Contact.astro`**

```astro
---
import { SITE } from "../data/site";
---

<section class="section contact-section" id="contact">
  <div class="section-header">
    <p class="eyebrow">Contact</p>
    <h2>Have a business system to build, modernize, or untangle?</h2>
    <p class="lead">Send a few details and your email client will open with a prefilled message. You can also email me directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
  </div>
  <form class="contact-form panel" id="contact-form" novalidate>
    <label>
      <span>Name</span>
      <input name="name" autocomplete="name" required />
      <small data-error-for="name"></small>
    </label>
    <label>
      <span>Email</span>
      <input name="email" type="email" autocomplete="email" required />
      <small data-error-for="email"></small>
    </label>
    <label>
      <span>Project type</span>
      <select name="projectType">
        <option value="">Select one</option>
        <option>Custom business system</option>
        <option>Legacy rescue / modernization</option>
        <option>Booking or enrolment workflow</option>
        <option>Hardware-integrated interface</option>
        <option>Technical leadership</option>
      </select>
    </label>
    <label>
      <span>Budget / timeline</span>
      <input name="budgetTimeline" placeholder="Example: this quarter, fixed scope, ongoing support" />
    </label>
    <label class="full">
      <span>Message</span>
      <textarea name="message" rows="6" required></textarea>
      <small data-error-for="message"></small>
    </label>
    <div class="form-actions">
      <button class="button primary" type="submit">Prepare email</button>
      <p class="form-status" id="contact-status" role="status" aria-live="polite"></p>
    </div>
  </form>
</section>

<script>
  import { buildMailto, hasContactErrors, validateContact } from "../utils/contact";

  const form = document.querySelector<HTMLFormElement>("#contact-form");
  const status = document.querySelector<HTMLElement>("#contact-status");

  function setError(field: string, message = "") {
    const node = document.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
    if (node) node.textContent = message;
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      budgetTimeline: String(formData.get("budgetTimeline") ?? ""),
      message: String(formData.get("message") ?? "")
    };
    const errors = validateContact(values);

    ["name", "email", "message"].forEach((field) => setError(field));

    if (hasContactErrors(errors)) {
      Object.entries(errors).forEach(([field, message]) => setError(field, message));
      if (status) status.textContent = "Please fix the highlighted fields.";
      return;
    }

    if (status) status.textContent = "Opening your email client. Your message will stay here if it does not open.";
    window.location.href = buildMailto(values);
  });
</script>
```

- [ ] **Step 2: Append contact CSS**

Append this to `src/styles/global.css`:

```css
.contact-section .lead a {
  color: var(--accent);
  font-weight: 800;
}

.contact-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  max-width: 860px;
}

.contact-form label {
  display: grid;
  gap: 8px;
}

.contact-form label.full,
.form-actions {
  grid-column: 1 / -1;
}

.contact-form span {
  color: var(--muted);
  font-size: 0.9rem;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: #0d1113;
  color: var(--text);
  padding: 12px;
}

.contact-form textarea {
  resize: vertical;
}

.contact-form small {
  min-height: 1.2em;
  color: var(--danger);
}

.form-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.form-status {
  margin: 0;
  color: var(--muted);
}

@media (max-width: 700px) {
  .contact-form {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Run contact tests**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 4: Commit contact section**

Run:

```bash
git add src/components/Contact.astro src/styles/global.css
git commit -m "feat: add static contact form"
```

Expected: Commit succeeds.

---

### Task 7: Assemble Pages and Static Assets

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/404.astro`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Create: `public/_headers`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
import About from "../components/About.astro";
import CaseStudies from "../components/CaseStudies.astro";
import Contact from "../components/Contact.astro";
import Hero from "../components/Hero.astro";
import ProofStrip from "../components/ProofStrip.astro";
import Services from "../components/Services.astro";
import Stack from "../components/Stack.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import { SITE } from "../data/site";
---

<BaseLayout title={`${SITE.name} - Custom systems and legacy rescue`} description={SITE.description}>
  <Hero />
  <ProofStrip />
  <Services />
  <CaseStudies />
  <Stack />
  <About />
  <Contact />
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Page not found - jatskie.com" description="The page could not be found.">
  <section class="section">
    <p class="eyebrow">404</p>
    <h1>That page is not part of the system.</h1>
    <p class="lead">Head back to the homepage to see services, selected work, and contact details.</p>
    <a class="button primary" href="/">Back to homepage</a>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="JM">
  <rect width="64" height="64" rx="10" fill="#d7ff63"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#101417">JM</text>
</svg>
```

- [ ] **Step 4: Create `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://jatskie.com/sitemap-index.xml
```

- [ ] **Step 5: Create `public/_headers`**

```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- [ ] **Step 6: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: tests PASS; build PASS and creates `dist/`.

- [ ] **Step 7: Commit pages and assets**

Run:

```bash
git add src/pages public
git commit -m "feat: assemble portfolio homepage"
```

Expected: Commit succeeds.

---

### Task 8: Verify and Polish Responsiveness

**Files:**
- Modify: `src/styles/global.css`
- Modify: components only if visual QA reveals concrete issues.

- [ ] **Step 1: Start dev server**

Run:

```bash
npm run dev
```

Expected: Astro dev server starts, usually at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Open in browser**

Use the Browser plugin if reachable. If the in-app browser cannot access localhost, use the default Windows browser after user approval.

Expected: homepage loads and shows the dark Operational Authority visual direction.

- [ ] **Step 3: Desktop visual checks**

At a desktop viewport around 1440px wide, verify:

- Hero headline is readable and does not overlap navigation.
- Proof strip has six stable cells.
- Service cards are balanced.
- Case-study cards do not overflow.
- Contact form labels, inputs, and errors fit their containers.

- [ ] **Step 4: Mobile visual checks**

At a mobile viewport around 390px wide, verify:

- Header stacks cleanly.
- Hero text remains readable.
- Proof items stack into one column.
- Cards and tag chips do not overflow.
- Contact form is one column.

- [ ] **Step 5: Fix concrete visual defects**

If text overflow, contrast, spacing, or hierarchy problems appear, edit only the affected CSS selectors in `src/styles/global.css`. Example fixes:

```css
@media (max-width: 420px) {
  h1 {
    font-size: 2.65rem;
  }

  .button {
    width: 100%;
  }
}
```

- [ ] **Step 6: Rebuild after polish**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit visual polish**

Run:

```bash
git add src/styles/global.css src/components
git commit -m "style: polish responsive portfolio layout"
```

Expected: Commit succeeds if files changed. If no files changed, skip the commit and note that no polish patch was needed.

---

### Task 9: Add Cloudflare Deployment Notes

**Files:**
- Create: `docs/deployment/cloudflare-pages.md`

- [ ] **Step 1: Create deployment docs**

Create `docs/deployment/cloudflare-pages.md`:

```md
# Cloudflare Pages Deployment

## Project

Site: `jatskie.com`
Build output: `dist`
Framework preset: Astro
Build command: `npm run build`

## GitHub

Connect the GitHub repository that contains this project to Cloudflare Pages.
Use the production branch selected for launch, usually `main`.

## Cloudflare Pages Settings

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: none required for first release
- Node version: use the Cloudflare default unless the build requires a newer version

## Custom Domain

1. In Cloudflare Pages, open the project.
2. Go to Custom domains.
3. Add `jatskie.com`.
4. Add `www.jatskie.com` if desired.
5. Follow Cloudflare's DNS prompts.
6. Verify HTTPS is active before sharing the site publicly.

## Contact Form Upgrade Path

The first release uses a static form that opens a prefilled email to
`jace.macalalad@gmail.com`.

Future upgrade:

- Cloudflare Pages Functions for form submission
- Cloudflare Turnstile for spam prevention
- Domain email or Cloudflare Email Routing
- Transactional email provider if direct delivery is needed
```

- [ ] **Step 2: Commit deployment docs**

Run:

```bash
git add docs/deployment/cloudflare-pages.md
git commit -m "docs: add Cloudflare Pages deployment notes"
```

Expected: Commit succeeds.

---

### Task 10: Final Verification

**Files:**
- No planned file edits unless verification reveals a concrete defect.

- [ ] **Step 1: Load completion verification skill**

Load `superpowers:verification-before-completion`.

- [ ] **Step 2: Run full verification**

Run:

```bash
npm test
npm run build
git status --short
```

Expected:

- `npm test` PASS.
- `npm run build` PASS.
- `git status --short` is empty or only shows intentional uncommitted artifacts that should not be committed.

- [ ] **Step 3: Check public-link policy**

Open `src/data/site.ts` and verify:

- Named links are only public proof points.
- Freelance hotel, restaurant, university, booking, and enrolment work remains anonymized.
- Employer work for NEO, Salmat, and MicroSourcing remains role/domain-based.
- No private phone numbers, private emails, internal screenshots, internal architecture, private metrics, or data-broker contact details are present.

- [ ] **Step 4: Final handoff**

Report:

- Local dev URL used for verification.
- Test/build commands and outcomes.
- Files changed.
- Deployment next steps for GitHub and Cloudflare Pages.
