# DrawingBoard – Frontend

A modern React + TypeScript project bootstrapped with Vite, featuring Storybook for UI development and testing.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 3. Run Storybook

```bash
npm run storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

---

## 📦 Project Structure

```
Frontend/
├── public/              # Static assets
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   ├── styles/          # Global and component styles
│   └── ...
├── .storybook/          # Storybook configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧩 Features

- **React 18** with functional components and hooks
- **TypeScript** for static type safety
- **Vite** for lightning-fast development
- **Storybook** for isolated UI component development
- **Vanilla Extract** for type-safe, scalable CSS (if used)
- Path aliasing with `@` for cleaner imports

---

## 🛠️ Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start Vite dev server        |
| `npm run build`     | Build for production         |
| `npm run preview`   | Preview production build     |
| `npm run storybook` | Launch Storybook UI explorer |

---

## 📝 Notes

- Use `@/` to import from the `src` directory (e.g. `import Button from "@/components/Button"`).
- Storybook is configured to support Vite and path aliases.
- For custom configuration, edit `vite.config.ts` and `.storybook/main.ts`..

---

## 📄 License

This is DrawingBoard Capital LLC's proprietary code. All rights reserved.

- No license is granted for use, distribution, or modification outside of authorized parties.
- Redistribution or disclosure of this code, in whole or in part, is strictly prohibited.
