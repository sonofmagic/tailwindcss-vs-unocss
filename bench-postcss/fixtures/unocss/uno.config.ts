import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['../../source/*.js'],
  },
  presets: [presetUno()],
})
