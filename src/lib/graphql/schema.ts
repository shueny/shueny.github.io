import { makeExecutableSchema } from '@graphql-tools/schema';
import { portfolioData } from '../data/portfolio';
import type { Portfolio } from '../types/portfolio';

type PortfolioData = typeof portfolioData;

const typeDefs = `#graphql
  type Greeting {
    hi: String!
    iam: String!
    name: String!
    nameEn: String!
    nameZh: String!
    jobTitle:  String!
    hobbies: String!
    email: String!
    portfolioUrl: String!
  }
  
  type Summary {
    title: String!
    list: [String!]!
    email: String!
    linkedin: String!
    github: String!
    portfolioUrl: String!
  }

  type Education {
    school: String!
    degree: String!
    period: String!
    description: String
  }

  type SkillCategory {
    title: String!
    icon: String!
    skills: [String!]!
  }

  type Skills {
    title: String!
    list: [SkillCategory!]!
  }

  type WorkExperience {
    company: String!
    position: String!
    period: String!
    description: [String!]!
    technologies: [String!]!
  }

  type SpecialExperience {
    title: String!
    description: String!
    date: String!
    image: String
  }

  type Language {
    title: String!
    icon: String!
    skills: [String!]!
  }

  type Portfolio {
    greeting: Greeting!
    summary: Summary!
    education: [Education!]!
    skills: Skills!
    workExperiences: [WorkExperience!]!
    specialExperiences: [SpecialExperience!]!
    languages: Language!
  }

  type Query {
    portfolio: Portfolio!
  }
`;

const resolvers = {
  Query: {
    portfolio: () => portfolioData,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
