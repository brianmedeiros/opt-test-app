# Movie page

A React FE test app from Brian Medeiros.

## Prerequisites

- Node.js 20 or higher recommended
- npm 9 or higher
- TMDB API Key

## Install

1. **Extract the zip file and navigate to the project**
```bash
   cd opt-test-app
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Set up environment variables:**
```bash
   cp .env.example .env
```
   Then edit `.env` and add your TMDB API key:
```
   VITE_TMDB_API_KEY=your_api_key_here
```

4. **Start the development server:**
```bash
   npm run dev
```

5. **Open your browser to** [http://localhost:5173](http://localhost:5173)


## Available Scripts

`npm run dev` -> Start development server
`npm run build` -> Build for production
`npm run preview` -> Preview production build
`npm test` -> Run tests in watch mode
`npm run test:run` -> Run tests once
`npm run lint` -> Check for code issues
`npm run format` -> Format code with Prettier