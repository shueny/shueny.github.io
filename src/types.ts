export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	link?: string;
	image: string;
	banner?: string; // Banner image for project card
	gallery?: string[]; // Array of screenshot URLs
	category: 'frontend' | 'fullstack' | 'design';
	visualDescription?: string;
	// Case Study Specifics
	problem?: string;
	solution?: string;
	features?: string[];
	techDeepDive?: string; // Technical implementation details
}

export interface Experience {
	id: string;
	role: string;
	company: string;
	period: string;
	description: string;
	achievements: string[];
}

export interface SkillData {
	subject: string;
	A: number;
	fullMark: number;
}

export interface Education {
	degree: string;
	school: string;
	period: string;
	description?: string;
}

export interface SpecialExperience {
	title: string;
	location?: string;
	year: string;
	description: string;
	achievements?: string[]; // Added optional achievements for consistency if needed
}

export interface ChatMessage {
	role: 'user' | 'model';
	text: string;
	timestamp: Date;
}

export enum SectionId {
	HERO = 'hero',
	SERVICES = 'services',
	IMPACT = 'impact',
	PROJECTS = 'projects',
	ABOUT = 'about',
	EXPERIENCE = 'experience',
	CONTACT = 'contact',
	ANALYSIS = 'analysis',
}
