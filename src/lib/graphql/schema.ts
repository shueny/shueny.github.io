import { makeExecutableSchema } from '@graphql-tools/schema';
import { portfolioData } from '../data/portfolio';

const typeDefs = `#graphql
  type Greeting {
    hiIm: String!
    name: String!
    jobTitle:  String!
    hobbies: String!
    email: String!
    portfolioUrl: String!
  }

  type Education {
    school: String!
    degree: String!
    period: String!
    description: String
  }

  type Skills {
    technical: [String!]!
    soft: [String!]!
    languages: [String!]!
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

  type Portfolio {
    greeting: Greeting!
    summary: [String!]!
    education: [Education!]!
    skills: Skills!
    workExperiences: [WorkExperience!]!
    specialExperiences: [SpecialExperience!]!
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
