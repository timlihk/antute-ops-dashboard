import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Edit `base` to '/<你的仓库名>/' when deploying to GitHub Pages
export default defineConfig({
  plugins: [react()],
  // base: '/your-repo-name/',
})
