import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetWind3 } from 'unocss'

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
