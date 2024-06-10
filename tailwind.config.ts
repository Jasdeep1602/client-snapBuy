import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      xl: { max: '1200px' },
      lg: { max: '991px' },
      md: { max: '769px' },
      sm: { max: '550px' },
      xsm: { max: '375px' },
    },
  },
  plugins: [],
};
export default config;
