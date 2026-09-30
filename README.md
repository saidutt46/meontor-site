# Meontor

### Moment + Mentor.

_Log your day in a tap. Understand it in a sentence._

[Website](https://meontor.com) (not yet live) • [Support](https://meontor.com/support)

---

## Overview

Meontor is an iPhone app for logging your day: one tap to capture a moment, a smart Home Screen widget that suggests what you're likely to log right now, and an on-device Mentor, written by Apple Intelligence, that reflects on what your day gave you. No account, no server, no tracking.

This repository hosts the **marketing and support site** for Meontor. The app itself lives in a private repository.

## Engineering

- **Framework:** SvelteKit 2 (Svelte 5 runes), fully prerendered
- **Styling:** Tailwind CSS 4 with Apple system colour tokens, SF system fonts (no web fonts)
- **Privacy:** no cookies, no third-party requests (enforced by CSP and `pnpm verify`); cookieless Vercel Web Analytics for page views
- **Deployment:** Vercel

### Local Development

pnpm runs under Node 24 from nvm, which is not on the default PATH:

```bash
export PATH=$HOME/.nvm/versions/node/v24.13.0/bin:$PATH
pnpm install
pnpm dev            # http://localhost:5173
pnpm build && pnpm verify
```

---

## License

**Copyright © 2026 Daivat Creations. All Rights Reserved.**

The source code, designs, and assets in this repository are the proprietary property of Daivat Creations. This code is provided for educational and transparency purposes only.

You may **not** use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
