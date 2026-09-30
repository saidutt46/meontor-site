/*
 * Copyright (c) 2026 Daivat Creations
 * All rights reserved.
 *
 * This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
export const prerender = true;
export const trailingSlash = 'never';

import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

// Vercel Web Analytics (owner, 2026-09-29): cookieless page views, served from
// this site's own origin (/_vercel/insights/), so the CSP stays 'self'.
injectAnalytics({ mode: dev ? 'development' : 'production' });
