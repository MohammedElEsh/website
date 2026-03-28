import { defineConfig } from 'vite';

// Root `index.html` + root `style.css` / `script.js`; production output in `dist/`
// with content-hashed JS/CSS filenames (Vite default).
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
