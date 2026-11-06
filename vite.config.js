import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standard Vite + React config. No special setup needed - Axios
// calls PHP directly using a full URL (http://localhost/movie-booking/backend/...),
// so no proxy configuration is required here.
export default defineConfig({
  plugins: [react()],
})
