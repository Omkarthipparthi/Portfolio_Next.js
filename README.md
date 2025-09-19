# Modern Developer Portfolio

A statically generated portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🚀 **Next.js 13 App Router** with static export
- 💨 **Tailwind CSS** for styling
- 🎨 **Framer Motion** animations
- 🌓 Dark/Light mode
- 📱 Fully responsive
- ♿ Accessible
- 🔍 SEO optimized
- 🎯 Performance optimized
- 📝 TypeScript for type safety

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Build and Deploy

1. Create a production build:
   ```bash
   npm run build
   ```

2. Deploy the `out` directory to your hosting provider:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### GitHub Pages
1. Update `next.config.mjs`:
   ```js
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
     basePath: '/your-repo-name',
   }
   ```

2. Deploy:
   ```bash
   npm run build
   # Commit and push the out directory to gh-pages branch
   ```

## Project Structure

```
.
├── app/               # Next.js App Router pages
├── components/        # React components
├── content/          # Static content and data
├── lib/              # Utility functions
├── public/           # Static assets
└── styles/           # Global styles
```

## Customization

1. Update `src/content/data.ts` with your projects and experience
2. Modify `public/og/*` with your OG images
3. Update metadata in `app/layout.tsx`
4. Customize theme colors in `tailwind.config.ts`

## Adding Third-Party Form Provider (Optional)

To add a form provider like Formspree:

1. Sign up at [Formspree](https://formspree.io)
2. Get your form endpoint
3. Update the contact form in `app/contact/page.tsx`:

```typescript
<form action="your-formspree-endpoint" method="POST">
  // ... form fields
</form>
```

## Performance

The site achieves high scores in Lighthouse:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## License

MIT © [Your Name]
