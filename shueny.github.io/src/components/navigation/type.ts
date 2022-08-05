export type NavigationItemsType = {
	LOGO: {
		img: string;
		alt: string;
		title: string;
	};
	LINKS: {
		name: string;
		url: string;
	}[];
};

export interface INavigationProps {
	[key: string]: {
		[key: string]: string;
	};
}
