import { z } from 'zod';

export const GreetingSchema = z.object({
  name: z.string(),
  nameEn: z.string(),
  nameZh: z.string(),
  hi: z.string(),
  iam: z.string(),
  jobTitle: z.string(),
  hobbies: z.string(),
  email: z.string().email(),
  phone: z.string(),
  portfolioUrl: z.string().url(),
});

export const SummarySchema = z.object({
  title: z.string(),
  list: z.array(z.string()),
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  portfolioUrl: z.string().url(),
});

export const EducationSchema = z.array(
  z.object({
    school: z.string(),
    degree: z.string(),
    period: z.string(),
    description: z.string().optional(),
  })
);

const SkillCategorySchema = z.object({
  title: z.string(),
  icon: z.string(),
  skills: z.array(z.string()),
});

// export const SkillsSchema = z.object({
//   title: z.string(),
//   webMobile: SkillCategorySchema,
//   performance: SkillCategorySchema,
//   uiux: SkillCategorySchema,
//   versionControl: SkillCategorySchema,
//   testing: SkillCategorySchema,
// });

const LanguageSchema = z.object({
  title: z.string(),
  icon: z.string(),
  skills: z.array(z.string()),
});

export const SkillSetSchema = z.object({
  title: z.string(),
  list: z.array(SkillCategorySchema),
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

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.array(z.string()),
  image: z.string().optional(),
  url: z.string().url().optional(),
  technologies: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsSchema = z.object({
  title: z.string(),
  list: z.array(ProjectSchema),
});

export type Projects = z.infer<typeof ProjectsSchema>;

export const PortfolioSchema = z.object({
  greeting: GreetingSchema,
  summary: SummarySchema,
  education: EducationSchema,
  skills: SkillSetSchema,
  projects: ProjectsSchema,
  workExperiences: WorkExperienceSchema,
  specialExperiences: SpecialExperienceSchema,
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

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
