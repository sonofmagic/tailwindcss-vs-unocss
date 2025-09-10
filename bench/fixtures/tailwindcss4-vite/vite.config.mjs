import fs from 'node:fs'
import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'add @reference',
      load(id) {
        if (id.endsWith('gen.css')) {
          const code = fs.readFileSync(id, 'utf8')
          return `@reference "${path.resolve(__dirname, './style.css')}";\n${code}`
        }
      },
    },
    Tailwindcss(),
  ],
})
