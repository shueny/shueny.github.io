import type { GetStaticProps } from "next";

export enum LANGS {
  EN = "en",
  ZH = "zh",
}

export type StaticPropsParam = Parameters<GetStaticProps>[0];

export type PathSlug = {
  params: { locale: LANGS }
} 

export type I18nContent = {
  [key: string]: FileContent;
};

export type FileContent = {
  [key: string]: any;
};

export type ArityOneFn = (arg: any) => any;

export type Compose = (...fns: ArityOneFn[]) => (x: any) => any;
