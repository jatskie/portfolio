# Cloudflare Pages Deployment

## Project

Site: `jatskie.com`
Framework preset: Astro
Build command: `npm run build`
Build output directory: `dist`

Cloudflare's current Astro Pages guide and Pages build configuration list Astro's
build command as `npm run build` and the output directory as `dist`.

References:

- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/

## GitHub

Connect the GitHub repository that contains this project to Cloudflare Pages.
Use the production branch selected for launch, usually `main`.

This local repository currently needs a remote before Cloudflare can deploy from
GitHub. After the remote exists, push the production branch and select it in the
Cloudflare Pages project.

## Cloudflare Pages Settings

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: none required for the first release

If the Cloudflare build environment needs an explicit Node version, configure it
in the Pages project settings. Local verification currently uses Node 22.

## Custom Domain

1. In Cloudflare, open Workers & Pages.
2. Open the Pages project for `jatskie.com`.
3. Go to Custom domains.
4. Add `jatskie.com`.
5. Add `www.jatskie.com` if desired.
6. Follow Cloudflare's DNS prompts.
7. Verify HTTPS is active before sharing the site publicly.

Add the custom domain through the Pages dashboard before relying on manually
created DNS records. Cloudflare's custom-domain docs note that creating a CNAME
without first associating the domain in Pages can fail to resolve correctly.

## Contact Form Upgrade Path

The first release uses a static form that opens a prefilled email to
`jace.macalalad@gmail.com`.

Future upgrade:

- Cloudflare Pages Functions for form submission.
- Cloudflare Turnstile for spam prevention.
- Domain email or Cloudflare Email Routing.
- Transactional email provider if direct delivery is needed.
