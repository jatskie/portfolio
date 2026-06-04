# jatskie.com Portfolio Design

Date: 2026-06-04

## Objective

Build a personal portfolio website for Jastinne Cesar Macalalad at `jatskie.com`.
The site should showcase Jastinne as a senior software engineer who builds practical
business software, modernizes legacy systems, and can work across the stack from
firmware and hardware integration through backend systems and frontend interfaces.

The commercial goal is to generate freelance enquiries from Australian small
businesses, founders, and companies with operational/self-service software needs.

## Public Research

The site may use these public proof points:

- LinkedIn profile for Jastinne Cesar Macalalad: https://au.linkedin.com/in/jatskie
- Iskomunidad about page, which credits Jastinne with design/customization and as
  developer of iskWiki: https://iskomunidad.upd.edu.ph/index.php?title=Iskomunidad%3AAbout
- Flipbooks on iskWiki, which lists Jastinne as a past developer:
  https://iskomunidad.upd.edu.ph/index.php/Flipbooks_on_iskwiki
- UPDox page, which lists Jastinne as a past developer:
  https://iskomunidad.upd.edu.ph/index.php?title=UPDox
- UP Diliman Interactive Learning Center learning objects, including Market Supply:
  https://ilc.upd.edu.ph/portfolio/market-supply-learning-object/
- NEO Self Service Solutions LinkedIn company page, which publicly lists Jastinne
  among employees and describes NEO's self-service technology work:
  https://au.linkedin.com/company/neo-solutions-australia

Data-broker/contact-enrichment pages were found during research but must not be used
for contact details, personal data, or claims beyond general role validation.

## Audience

Primary audience:

- Australian small businesses that need custom web apps, booking systems, admin
  tools, enrolment workflows, operational systems, or legacy modernization.

Secondary audience:

- Founders who need senior engineering judgment without hiring a full-time CTO.
- Companies building or maintaining self-service, kiosk, POS-adjacent, or
  hardware-integrated operational systems.

## Positioning

Core positioning:

> Custom business systems, legacy rescue, and practical software from firmware to frontend.

The site should feel technically authoritative, commercially clear, and personal
enough to be memorable. Jastinne's "fell in love with computers at 8" story is a
human proof point, not the whole narrative. The main message is that Jastinne builds
software that makes real operations work better.

## Visual Direction

Use the "Operational Authority" direction as the visual base:

- Dark, sharp, system-oriented first impression.
- Precise typography and restrained technical visual language.
- No generic SaaS landing-page look.
- Strong contrast with one crisp accent color.
- UI should feel engineered, not decorative.

The visual tone should still be approachable for small businesses. Avoid making the
site feel like a cyber/security product or an abstract developer portfolio.

## Homepage Structure

The homepage is the primary selling page.

1. Hero
   - Prominent name: Jastinne Cesar Macalalad.
   - Positioning headline focused on custom systems and legacy rescue.
   - Short supporting copy that mentions practical software, business operations,
     and firmware-to-frontend breadth.
   - Primary CTA: start a project.
   - Secondary CTA: see selected work.

2. Proof strip
   - UPDox.
   - Ignite Careers.
   - NEO self-service systems.
   - Iskomunidad / iskWiki.
   - UP Diliman learning objects.
   - Google Cloud credential, if included from LinkedIn.

3. Services
   - Build: custom web apps, booking systems, enrolment systems, admin tools,
     dashboards, integrations, and workflow software.
   - Rescue: stabilize inherited codebases, simplify messy workflows, modernize
     old systems, improve deployment, and make systems maintainable.

4. Selected work
   - UPDox / collaboration and document workflows.
   - Ignite Careers / recruitment technology leadership.
   - Anonymized booking, enrolment, hotel/restaurant, and business systems.
   - Supporting proof: Iskomunidad/iskWiki, UP learning objects, NEO, Salmat,
     MicroSourcing, and other experience where safe.

5. Stack
   - Systems and hardware: C++, firmware-adjacent work, hardware integration,
     kiosk/POS-style interfaces.
   - Web and product: PHP/Laravel, JavaScript, TypeScript, Node.js, WordPress.
   - Learning and content platforms: Moodle, MediaWiki-style systems.
   - Cloud and infrastructure: AWS, Cloudflare, server operations where relevant.

6. About
   - Concise personal story: computers since age 8.
   - Emphasize long-running builder mindset and practical engineering judgment.

7. Contact
   - Contact form UI plus visible email fallback.
   - Launch email: `jace.macalalad@gmail.com`.
   - The email address should be easy to replace with a domain email later.

## Case Study Policy

Use named case studies only where the work is already public or Jastinne has
permission to name it.

Use anonymized case studies for hotel, restaurant, booking, university enrolment,
and other freelance/commercial client work unless explicit permission is granted.

For employer-related work at NEO, Salmat, or MicroSourcing:

- It is acceptable to name the employer if the relationship is public.
- Describe work by role, domain, and type of system.
- Do not disclose client names, private screenshots, internal architecture, source
  code, non-public metrics, credentials, or commercially sensitive details.

## Technical Approach

Build a static-first site deployable to Cloudflare Pages.

Recommended implementation options for planning:

- Astro for a content-focused static portfolio with excellent performance.
- Vite/React if component interactivity becomes important.

The design favors Astro unless implementation planning discovers a strong reason to
choose React. The first release does not need a database, CMS, user accounts, or a
server-rendered backend.

## Content Model

Store site content in simple local files or typed data modules:

- Services.
- Case studies.
- Experience/proof items.
- Tech stack groups.
- Contact details.

This keeps the launch simple while making future edits straightforward.

## Contact Handling

For the first release, the contact form should be static-friendly:

- Show a polished form with fields for name, email, project type, budget/timeline,
  and message.
- On submit, generate a `mailto:` email to `jace.macalalad@gmail.com` with a
  prefilled subject and body.
- Show the email fallback visibly for users who prefer direct contact or whose
  mail client does not open.

Future upgrade path:

- Cloudflare Pages Functions.
- Cloudflare Turnstile.
- Domain email or email routing.
- Transactional email provider if needed.

## SEO and Metadata

The site should include metadata for:

- Jastinne Cesar Macalalad.
- jatskie.com.
- Software engineer in Australia/Victoria.
- Custom business systems.
- Legacy system modernization.
- Web apps, booking systems, enrolment systems, workflow software.
- Hardware integration and firmware-to-frontend engineering.

Use clear Open Graph metadata and structured page titles/descriptions.

## Error Handling

Because the launch site is static, error handling is mostly UX and deployment hygiene:

- Contact form should validate required fields before generating email.
- Failed or blocked mail client opening should leave the typed message visible and
  keep the fallback email visible.
- External links should open safely and remain non-critical to the main conversion path.
- Missing optional case-study links should not break the layout.

## Testing and Verification

Before launch:

- Run the project build.
- Check the homepage in desktop and mobile viewports.
- Verify text does not overlap or overflow.
- Verify all internal anchors and external links.
- Verify contact form validation and `mailto:` generation.
- Check Lighthouse-style basics where practical: performance, accessibility, SEO.
- Verify the site works as a static Cloudflare Pages deployment.

## Deployment

Target deployment:

- Cloudflare Pages.
- Custom domain: `jatskie.com`.

Cloudflare Pages should connect to the git repository for automatic deployments.
Domain DNS and Cloudflare account configuration are outside the static site code but
should be documented during implementation.

## Out of Scope for First Release

- Blog.
- CMS.
- Authentication.
- Database-backed contact submissions.
- Payment handling.
- Deep public case studies for private client work.
- Detailed employer/client disclosures not already public or explicitly approved.
