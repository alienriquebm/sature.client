# 🎨 Saturé

**Saturé** is a sleek color palette generator that lets you create, save, and manage color combinations effortlessly. Built with simplicity and speed in mind, it's the perfect tool for designers, developers, and anyone in need of color inspiration.

## 🚀 Live Demo

👉 [sature-dev.alienriquebm.me](https://sature-dev.alienriquebm.me)

## 🧠 Tech Stack

- ⚡️ [Astro](https://astro.build/) — Ultra-fast static site builder
- 🎨 [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first styling
- ⚛️ React Hooks — For state and navigation logic
- 💾 LocalStorage — Persist palettes without a backend
- 🧪 [Vitest](https://vitest.dev/) + Testing Library — Unit testing with blazing speed
- 📁 Path Aliases (`@/`) — For clean and manageable imports
- 🐳 Docker + GitHub Actions — For automated deployment

## 📸 Features

- 🎲 Generate 5 random hex colors with a click
- 🔍 View and copy hex codes
- 💾 Save palettes to localStorage
- 🗑 Delete saved palettes with confirmation modal
- 🌗 Light and dark mode support
- 🔀 Simple navigation between homepage and saved palettes

## 🛠 Local Setup

To run the project locally:

```bash
git clone https://github.com/your-username/sature.git
cd sature
npm install
npm run dev
```

Access it at: `http://localhost:4321`

## 📦 Production Build

```bash
npm run build
```

The static output will be in the /dist directory and can be served with any static file server.

## 🐳 Docker Deployment

You can build and run the app in a Docker container using:

```bash
docker build -t sature .
docker run -p 8080:80 sature
Then open http://localhost:8080 in your browser.
```

## 🧪 Running Tests

This project uses Vitest for testing:

```bash
npm run test
```

Unit tests cover core components such as saving, rendering, and deleting palettes.

## 📁 Project Structure

```bash
src/
├── components/      # UI components like ColorBox, PaletteActions, etc.
├── hooks/           # Custom React hooks
├── pages/           # App pages: index, saved
├── styles/          # Global styles and Tailwind config
└── test/            # Vitest setup and test files
```

## 🧠 Technical Notes

- This is a frontend-only project using localStorage for persistence

- Authentication and backend functionality were intentionally omitted to focus on UX

- Future iterations (e.g. Lumina) may explore backend integrations like Strapi or NestJS

---
Built with ❤️ by @alienriquebm
