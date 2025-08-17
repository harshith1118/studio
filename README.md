# EcoMind AI Toolkit

An interactive Next.js application that demonstrates AI capabilities using Google's Gemini models.

## Features

- Real-time AI text generation using Google Gemini models
- User authentication system (login/signup)
- Interaction history with local storage persistence
- Preset prompts for quick testing
- Responsive UI with sustainable design
- Copy-to-clipboard functionality

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.local`:
   ```bash
   cp .env.local .env.local
   ```
4. Add your Google Generative AI API key to `.env.local`
5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## Available Scripts

- `npm run dev` - Runs the Next.js app
- `npm run build` - Builds the Next.js app for production
- `npm run start` - Runs the production build
- `npm run lint` - Runs ESLint
- `npm run typecheck` - Runs TypeScript type checking

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Generative AI Documentation](https://ai.google.dev/)
- [Gemini Models](https://ai.google.dev/models/gemini)