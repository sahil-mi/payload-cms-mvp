import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type AuthorSeed = {
  key: 'mara' | 'theo' | 'priya' | 'owen'
  data: (avatar: Media) => RequiredDataFromCollectionSlug<'authors'>
}

export const authorSeeds: AuthorSeed[] = [
  {
    key: 'mara',
    data: (avatar) => ({
      name: 'Mara Delgado',
      role: 'Creative Director',
      avatar: avatar.id,
      bio: 'Mara has led brand and product work for teams at every stage, from three-person startups to public companies. She still opens every project with the same question: what does this need to say, and to whom?',
    }),
  },
  {
    key: 'theo',
    data: (avatar) => ({
      name: 'Theo Nakamura',
      role: 'Principal Engineer',
      avatar: avatar.id,
      bio: "Theo builds the systems that make design decisions survive contact with production. He spent six years in ad tech before deciding he'd rather ship things people actually asked for.",
    }),
  },
  {
    key: 'priya',
    data: (avatar) => ({
      name: 'Priya Chandrasekaran',
      role: 'Head of Strategy',
      avatar: avatar.id,
      bio: 'Priya runs discovery on every engagement and has a low tolerance for decks that avoid the hard question. Previously led growth at two Series B fintechs.',
    }),
  },
  {
    key: 'owen',
    data: (avatar) => ({
      name: 'Owen Fitzgerald',
      role: 'Senior Brand Designer',
      avatar: avatar.id,
      bio: 'Owen thinks in systems, not logos. He obsesses over the parts of a brand nobody notices until they are wrong — spacing, motion timing, the weight of a rule line.',
    }),
  },
]
