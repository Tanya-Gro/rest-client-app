# REST Client ✨

## Project Description 📋

Our team project is focused on building a lightweight REST-client, inspired by tools like Postman or Thunder Client.
The application will allow users to send requests with configurable methods, URLs, headers, and body parameters, providing a user-friendly interface for working with APIs.

Key features include:

- **Authentication & Authorization** to ensure secure access.
- **Internationalization** support 2 languages (Russian and English).
- **RESTful-client**:
  - Method selector
  - Endpoint URL
  - Request editor
  - Headers editor
  - Response section
  - Generated code
- **Variables**. Ability to save and use custom variables (e.g. tokens, base URLs) in requests.
- **History of Requests** – track, revisit, and re-run previously executed queries with ease.

This project is developed by a team of three developers:

- [**Mariya Lezhebokova**](https://github.com/koonukaame) — Developer 💻
- [**Tatiana Grosul**](https://github.com/tanya-gro) — Team Lead and Developer 👩‍💻
- [**Viktor Vonyarkha**](https://github.com/Viktor1905) — Developer 💻

Our mentors are:

- [**Egor Gavrilenko**](https://github.com/BamblooV)
- [**Mikalai Nikitsiuk**](https://github.com/micolka)

## Project Purpose 🎯

The goal is to create a full-featured, yet simplified Postman-like client, where we practice building production-ready SPAs, integrating APIs, and maintaining clean, scalable code.

## Technology Stack 🛠️

- **Next.js** (framework & routing) 🛠️
- **App Router** (routing) 🚁
- **TypeScript** 🔤
- **NextAuth.js** (authentication) 🔑
- **PostgreSQL** (database) 🐘
- **Prisma** (ORM) 🌐
- **Tailwind CSS + shadcn/ui** 💅
- **React Hook Form** (forms) 📝
- **i18n** (internationalization) 🌍
- **Zod** (schema validation) ✅
- **Turbopack** (bundler) ⚡
- **Vitest** (unit testing) 🧪
- **ESLint** (code linting) 🧹
- **Prettier** (code formatting) 🎨
- **Husky** (Git hooks) 🦸‍♂️
  - Plugins: `lint-staged`

## Usage Instructions for Running Scripts 📝

### 🧪 Vitest

Vitest is a unit testing framework

- **Run tests in watch mode:**\
  `npm run test`
- **Run tests with coverage report:**\
  `npm run test:coverage`
- **Run tests with UI:**\
  `npm run test:ui` 

### 🧹 ESLint

ESLint helps detect and fix problems in TypeScript code

- **Check for linting issues:**\
  `npm run lint`
- **Automatically fix style issues:**\
  `npm run lint:fix`

### 🎨 Prettier

Prettier formats code for consistent style

- **Format code:**\
  `npm run format`
- **Check and fix formatting without modifying files:**\
  `npm run format:fix`

### 🦸‍♂️ Husky

Husky helps manage Git hooks, ensuring certain tasks are performed before committing or pushing code

- **Set up Husky Git hooks:**\
  `npm run prepare`

## Local Setup Guide ⚙️

- **Clone the repository:**\
  `git clone https://github.com/Tanya-Gro/rest-client-app`
- **Install dependencies:**\
  `npm install`
- **Set up environment variables:**\
  Copy `.env.example` to `.env` and fill in the required values.
- **Generate Prisma client:**\
  `npx prisma generate`
- **Run database migrations:**\
  `npx prisma migrate dev`
- **Start the development server:**\
  `npm run dev`
