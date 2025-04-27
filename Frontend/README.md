# DrawingBoard MVP – Frontend

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
- For custom configuration, edit `vite.config.ts` and `.storybook/main.ts`.

---

## 📄 License

This project is licensed under the MIT License.

    },

},
})

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
````
