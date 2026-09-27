// Types for verify-lib.js, so TypeScript tests can import it.
export function findCopyViolations(html: string): string[];
export function findForeignOrigins(html: string, siteUrl: string): string[];
export function findForeignOriginsInAsset(source: string, siteUrl: string): string[];
