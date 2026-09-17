/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.75rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              },
              h2: {
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '4.5rem',
              },
              h2: {
                fontSize: '2rem',
              },
            },
          ],
        },
        lg: {
          css: [
            {
              h1: {
                fontSize: '5.5rem',
              },
              h2: {
                fontSize: '2.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
