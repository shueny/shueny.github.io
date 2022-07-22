export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

declare global {
	interface Window {
		dataLayer: Record<string, any>[]
	}
}
