import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import ErrorMessage from './ErrorMessage.svelte';
import SeoHead from './SeoHead.svelte';
import { findCopyViolations } from '../../../scripts/verify-lib.js';

// The error page is never prerendered, so `pnpm verify` cannot see it; these do.
describe('ErrorMessage', () => {
	it('says a missing page is missing', () => {
		const { body } = render(ErrorMessage, { props: { status: 404 } });
		expect(body).toContain("This page isn't here.");
	});
	it('does not call a server error a missing page', () => {
		const { body } = render(ErrorMessage, { props: { status: 500 } });
		expect(body).not.toContain("isn't here");
		expect(body).toContain('Something went wrong.');
	});
	it('follows the copy rules for every status', () => {
		for (const status of [404, 500]) {
			const { body } = render(ErrorMessage, { props: { status } });
			expect(findCopyViolations(body)).toEqual([]);
		}
	});
});

describe('SeoHead', () => {
	it('gives a noindex page no canonical link', () => {
		const { head } = render(SeoHead, {
			props: { title: 'Not found', description: 'x', path: '/404', noindex: true }
		});
		expect(head).not.toContain('rel="canonical"');
		expect(head).toContain('noindex');
	});
	it('keeps the canonical on an indexed page', () => {
		const { head } = render(SeoHead, { props: { title: 'x', description: 'x', path: '/support' } });
		expect(head).toContain('href="https://meontor-site.vercel.app/support"');
	});
});
