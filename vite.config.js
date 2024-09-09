import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseUrl } from './src/constants'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: baseUrl
})
