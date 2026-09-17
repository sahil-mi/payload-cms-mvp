// Central registry of every photographic image used by the seed script.
// All images are served from Unsplash's stable CDN (images.unsplash.com) so seeding
// does not depend on any third-party API key or a flaky proxy. Each URL was verified
// with `curl -sI` to return 200 before being added here.

export type MediaDescriptor = {
  key: string
  url: string
  alt: string
}

const unsplash = (id: string, opts?: { w?: number; h?: number }): string => {
  const w = opts?.w ?? 1600
  const params = new URLSearchParams({
    q: '80',
    w: String(w),
    auto: 'format',
    fit: 'crop',
  })
  if (opts?.h) params.set('h', String(opts.h))
  return `https://images.unsplash.com/${id}?${params.toString()}`
}

export const mediaLibrary: MediaDescriptor[] = [
  // --- Home page ---
  {
    key: 'homeHero',
    url: unsplash('photo-1497366216548-37526070297c', { w: 2400, h: 1350 }),
    alt: 'Dramatic upward view of a modern glass and steel building facade at dusk',
  },
  {
    key: 'homeHowWeWork',
    url: unsplash('photo-1531482615713-2afd69097998', { w: 1800 }),
    alt: 'Designer reviewing layout comps at a minimal studio desk',
  },

  // --- About page ---
  {
    key: 'aboutHero',
    url: unsplash('photo-1531123897727-8f129e1688ce', { w: 2400, h: 1350 }),
    alt: 'Small cross-functional team collaborating around a table covered in sketches',
  },
  {
    key: 'aboutStory',
    url: unsplash('photo-1544005313-94ddf0286df2', { w: 1800 }),
    alt: 'Small studio team gathered around a table reviewing printed design boards',
  },
  {
    key: 'aboutCulture',
    url: unsplash('photo-1573496359142-b8d87734a5a2', { w: 1800 }),
    alt: 'Colleagues in conversation during an informal studio work session',
  },

  // --- Project covers ---
  // Each of these was opened and visually verified in-browser before being added here
  // (not just checked for a 200 status) — the previous set had several photo IDs whose
  // actual content didn't match their alt text (portraits standing in for architecture, etc).
  {
    key: 'projectMeridianCover',
    url: unsplash('photo-1786982364332-d95ab0c3e287', { w: 1800, h: 1200 }),
    alt: 'Humanoid robot standing in a bright gallery space',
  },
  {
    key: 'projectPalisadeCover',
    url: unsplash('photo-1576091160399-112ba8d25d1d', { w: 1800, h: 1200 }),
    alt: 'Doctor in a white coat using a smartphone',
  },
  {
    key: 'projectVesperCover',
    url: unsplash('photo-1522542550221-31fd19575a2d', { w: 1800, h: 1200 }),
    alt: 'Symmetrical modern building exterior with repeating window grid',
  },
  {
    key: 'projectTidewaterCover',
    url: unsplash('photo-1486406146926-c627a92ad1ab', { w: 1800, h: 1200 }),
    alt: 'Low-angle view of glass high-rise office towers against the sky',
  },
  {
    key: 'projectKestrelCover',
    url: unsplash('photo-1540575861501-7cf05a4b125a', { w: 1800, h: 1200 }),
    alt: 'Close-up of a jet turbine engine',
  },
  {
    key: 'projectArclightCover',
    url: unsplash('photo-1621948902786-8572b7911e19', { w: 1800, h: 1200 }),
    alt: 'Abstract diagonal motion blur in muted warm and cool tones',
  },

  // --- Project gallery: Meridian Robotics ---
  {
    key: 'meridianGallery1',
    url: unsplash('photo-1560472354-b33ff0c44a43', { w: 1600 }),
    alt: 'Abstract close-up of a smooth gradient surface in cool tones',
  },
  {
    key: 'meridianGallery2',
    url: unsplash('photo-1553877522-43269d4ea984', { w: 1600 }),
    alt: 'Close-up of layered circuit board traces catching the light',
  },
  {
    key: 'meridianGallery3',
    url: unsplash('photo-1552664730-d307ca884978', { w: 1600 }),
    alt: 'Detail shot of precision-machined metal components',
  },

  // --- Project gallery: Palisade Health ---
  {
    key: 'palisadeGallery1',
    url: unsplash('photo-1519389950473-47ba0277781c', { w: 1600 }),
    alt: 'Overhead view of hands typing on a laptop keyboard beside notes',
  },
  {
    key: 'palisadeGallery2',
    url: unsplash('photo-1522202176988-66273c2fd55f', { w: 1600 }),
    alt: 'Clean, sunlit workspace with a laptop and notebook on a light desk',
  },
  {
    key: 'palisadeGallery3',
    url: unsplash('photo-1497032628192-86f99bcd76bc', { w: 1600 }),
    alt: 'Overhead flat-lay of a desk setup with a laptop and coffee cup',
  },

  // --- Project gallery: Arclight Partners ---
  {
    key: 'arclightGallery1',
    url: unsplash('photo-1454165804606-c3d57bc86b40', { w: 1600 }),
    alt: 'Close-up of code displayed on a dark monitor',
  },
  {
    key: 'arclightGallery2',
    url: unsplash('photo-1522071820081-009f0129c71c', { w: 1600 }),
    alt: 'Wide shot of a moody workstation with code on multiple screens',
  },
  {
    key: 'arclightGallery3',
    url: unsplash('photo-1568992687947-868a62a9f521', { w: 1600 }),
    alt: 'Abstract dark tech texture with faint glowing lines',
  },

  // --- Blog post heroes ---
  {
    key: 'postHeroRebrands',
    url: unsplash('photo-1497366811353-6870744d04b2', { w: 2000, h: 1125 }),
    alt: 'Low-angle view of an unfinished concrete and glass building under construction',
  },
  {
    key: 'postHeroFintechTrust',
    url: unsplash('photo-1497366754035-f200968a6e72', { w: 2000, h: 1125 }),
    alt: 'Grid of illuminated windows on a dark building facade at night',
  },
  {
    key: 'postHeroDesignSystems',
    url: unsplash('photo-1497215728101-856f4ea42174', { w: 2000, h: 1125 }),
    alt: 'Repeating modular architectural facade with a strong geometric rhythm',
  },
  {
    key: 'postHeroAiFeatures',
    url: unsplash('photo-1487958449943-2429e8be8625', { w: 2000, h: 1125 }),
    alt: 'Abstract architectural lines converging toward a single vanishing point',
  },
  {
    key: 'postHeroMotion',
    url: unsplash('photo-1451187580459-43490279c0fa', { w: 2000, h: 1125 }),
    alt: 'Long-exposure light trails streaking across a dark cityscape',
  },
  {
    key: 'postHeroRetainer',
    url: unsplash('photo-1500648767791-00dcc994a43e', { w: 2000, h: 1125 }),
    alt: 'Tidy shared workspace with two laptops set up for a working session',
  },

  // --- Author avatars ---
  {
    key: 'avatarMara',
    url: unsplash('photo-1517245386807-bb43f82c33c4', { w: 600, h: 600 }),
    alt: 'Portrait of Mara Delgado, Creative Director at Northbeam Studio',
  },
  {
    key: 'avatarTheo',
    url: unsplash('photo-1600880292203-757bb62b4baf', { w: 600, h: 600 }),
    alt: 'Portrait of Theo Nakamura, Principal Engineer at Northbeam Studio',
  },
  {
    key: 'avatarPriya',
    url: unsplash('photo-1519085360753-af0119f7cbe7', { w: 600, h: 600 }),
    alt: 'Portrait of Priya Chandrasekaran, Head of Strategy at Northbeam Studio',
  },
  {
    key: 'avatarOwen',
    url: unsplash('photo-1541746972996-4e0b0f43e02a', { w: 600, h: 600 }),
    alt: 'Portrait of Owen Fitzgerald, Senior Brand Designer at Northbeam Studio',
  },

  // --- Testimonial avatars (clients, distinct from the studio's own authors) ---
  {
    key: 'avatarClient1',
    url: unsplash('photo-1573497019940-1c28c88b4f3e', { w: 400, h: 400 }),
    alt: 'Portrait of a smiling client, VP of Product at a partner company',
  },
  {
    key: 'avatarClient2',
    url: unsplash('photo-1573164713988-8665fc963095', { w: 400, h: 400 }),
    alt: 'Portrait of a client executive in a quarter-turn studio pose',
  },
  {
    key: 'avatarClient3',
    url: unsplash('photo-1531297484001-80022131f5a1', { w: 400, h: 400 }),
    alt: 'Portrait of a client marketing director smiling at the camera',
  },
  {
    key: 'avatarClient4',
    url: unsplash('photo-1487017159836-4e23ece2e4cf', { w: 400, h: 400 }),
    alt: 'Portrait of a client founder in a relaxed, confident pose',
  },
]
