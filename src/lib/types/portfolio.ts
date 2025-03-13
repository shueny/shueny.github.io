import { z } from 'zod';

export const GreetingSchema = z.object({
  name: z.string(),
  hiIm: z.string(),
  jobTitle: z.string(),
  hobbies: z.string(),
  email: z.string().email(),
  portfolioUrl: z.string().url(),
});

export const SummarySchema = z.array(z.string());

export const EducationSchema = z.array(
  z.object({
    school: z.string(),
    degree: z.string(),
    period: z.string(),
    description: z.string().optional(),
  })
);

export const SkillsSchema = z.object({
  technical: z.array(z.string()),
  soft: z.array(z.string()),
  languages: z.array(z.string()),
});

export const WorkExperienceSchema = z.array(
  z.object({
    company: z.string(),
    position: z.string(),
    period: z.string(),
    description: z.array(z.string()),
    technologies: z.array(z.string()),
  })
);

export const SpecialExperienceSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string().optional(),
  })
);

export const PortfolioSchema = z.object({
  greeting: GreetingSchema,
  summary: SummarySchema,
  education: EducationSchema,
  skills: SkillsSchema,
  workExperiences: WorkExperienceSchema,
  specialExperiences: SpecialExperienceSchema,
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

// 添加 GraphQL 查詢結果的類型
export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
};
