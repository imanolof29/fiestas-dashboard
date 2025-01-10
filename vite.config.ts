import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
