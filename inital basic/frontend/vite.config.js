import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
     proxy:{
      '/api': 'https://localhost:3000',  //jha jha api hoga wahi hi append hoga har jagh pe nahi hoga

     },
  },
  plugins: [react()],
})
