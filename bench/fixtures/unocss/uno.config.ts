import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'

export default defineConfig({
  mergeSelectors: false,
  content: {
    pipeline: {
      include: [/\.js$/],
    },
  },
  presets: [presetUno()],
  transformers: [transformerDirectives()],
})
