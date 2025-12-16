/**
 * Generates the full URL for a static asset located in the public/assets or public/images directory.
 * This helper handles the base URL prefix automatically, which is crucial for
 * deployments on subdirectories (like GitHub Pages).
 *
 * @param filename - The name of the file (e.g., 'cover.png', 'assets/cover.png', 'images/cover.png')
 * @returns The full resolved path (e.g., '/portfolio/assets/cover.png')
 */
export const getAssetUrl = (filename: string): string => {
	if (!filename) return '';

	// Astro uses import.meta.env.BASE_URL
	const baseUrl = import.meta.env.BASE_URL ?? '/';

	// Clean up input path (remove leading slash)
	const cleanName = filename.replace(/^\//, '');

	// If path explicitly starts with known directories (images/ or assets/), use it as is relative to base
	if (cleanName.startsWith('images/') || cleanName.startsWith('assets/')) {
		return `${baseUrl}${cleanName}`;
	}

	// Default behavior: assume file is in assets/ if no folder specified
	return `${baseUrl}assets/${cleanName}`;
};
