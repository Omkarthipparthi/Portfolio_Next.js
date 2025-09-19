type SocialProfile = {
  name: string
  url: string
}

export function generatePersonSchema(socialProfiles: SocialProfile[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    jobTitle: 'Software Developer',
    description: 'Software developer specializing in building exceptional web experiences.',
    image: 'https://your-domain.com/og/profile.jpg',
    sameAs: socialProfiles.map((profile) => profile.url),
    url: 'https://your-domain.com',
  }
}

export function generateProjectSchema(
  title: string,
  description: string,
  imageUrl: string,
  projectUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    description,
    url: projectUrl,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Your Name',
    },
  }
}
