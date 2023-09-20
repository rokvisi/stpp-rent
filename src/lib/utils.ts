export function getPageTitle(pathname: string) {
	if (pathname === '/') return 'Home';
	if (pathname.startsWith('/docs')) return 'API Reference';

	return pathname;
}

export function isValidDocumentationPathname(pathname: string) {
	return pathname.startsWith("/docs/api/v1") && !(pathname.endsWith("/docs/api/v1") || pathname.endsWith("/docs/api/v1/"));
}