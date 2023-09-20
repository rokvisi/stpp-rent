export function getPageTitle(pathname: string) {
	if (pathname === '/') return 'Home';
	if (pathname.startsWith('/docs')) return 'API Reference';

	return pathname;
}