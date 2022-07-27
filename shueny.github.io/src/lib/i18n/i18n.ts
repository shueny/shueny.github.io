import fs from 'fs';
import path from 'path';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {
	LANGS,
	StaticPropsParam,
	Compose,
	ArityOneFn,
	I18nContent,
	FileContent,
	PathSlug,
} from './types';

export const DEFAULT_LANG = LANGS.EN;

export async function getStaticPaths() {
	return {
		paths: getPathSlugs(),
		fallback: false,
	};
}

export function makeStaticPaths(...fns: ArityOneFn[]) {
	return async function getStaticPaths() {
		return {
			paths: compose(...fns)(getPathSlugs()),
			fallback: false,
		};
	};
}

export function makeStaticProps(
	source: string[],
	fn?: (arg: any, ctx: StaticPropsParam) => any
) {
	return async function getStaticProps(ctx: StaticPropsParam) {
		console.log('Generating / Regenerating');
		const i18nProps = await getI18nProps(ctx, source);
		const props = fn ? fn(i18nProps, ctx) : i18nProps;
		return {props};
	};
}
const getStaticProps = async ({locale}: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'about', 'typer'])),
		fallback: false,
	},
});

export function makeISRStaticProps(
	source: string[],
	fetchResource: (ctx: StaticPropsParam) => Promise<unknown>
) {
	return async function getStaticProps(ctx: StaticPropsParam) {
		console.log('Generating / Regenerating');
		const data = await fetchResource(ctx);
		const i18nProps = await getI18nProps(ctx, source);
		const props = {localResource: i18nProps, fetchResource: data};
		return {props, revalidate: 10};
	};
}

const getPathSlugs = () => {
	const supportLangs = [LANGS.EN, LANGS.ZH];

	return supportLangs.map((locale) => ({
		params: {
			locale,
		},
	}));
};

const getI18nProps = async ({params}: StaticPropsParam, source: any) => {
	const locale = (params?.locale as LANGS) || DEFAULT_LANG;
	const sources = readSourceFiles(source, locale);
	return {...sources, locale};
};

export const readSourceFiles = (folders: string[], locale: LANGS) => {
	const basePath = path.join('../static/locales', locale);

	return folders.reduce<I18nContent>((acc, folder) => {
		const folderPath = path.join(basePath, folder);
		const filenames = fs.readdirSync(folderPath);
		const fileContents = filenames.reduce<FileContent>((acc, filename) => {
			// assume format of file name must be 'xxx.json'
			const nameKey = toCamelCase(filename);
			const content = fs.readFileSync(path.join(folderPath, filename), {
				encoding: 'utf8',
			});
			acc[nameKey] = toParseJSON(content);
			return acc;
		}, {});

		return {...acc, ...fileContents};
	}, {});
};

/** utility */
const toCamelCase = (str: string) => {
	return str.split('.')[0].replace(/-./g, (m) => m[1].toUpperCase());
};

const toParseJSON = (content: string) => {
	let json = {};
	try {
		json = JSON.parse(content);
	} catch (error) {
		console.error(error);
	}
	return json;
};

const compose: Compose =
	(...fns) =>
	(x) =>
		fns.reduceRight((y, f) => f(y), x);
