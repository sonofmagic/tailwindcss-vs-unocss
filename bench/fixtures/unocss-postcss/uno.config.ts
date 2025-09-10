import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'
import presetWind3 from 'unocss/preset-wind3'

export default defineConfig({
  mergeSelectors: false,
  content: {
    pipeline: {
      include: [/\.js$/],
    },
  },
  presets: [presetWind3()],
  transformers: [transformerDirectives()],
})
