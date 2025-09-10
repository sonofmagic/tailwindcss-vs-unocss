import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPackageInfo } from 'local-pkg'

export const dir = dirname(fileURLToPath(import.meta.url))

export const targets = [
  'none',
  'tailwindcss3',
  'tailwindcss4-postcss',
  'tailwindcss4-vite',
  'unocss-vite',
  'unocss-postcss',
]

export const targetPkgMap = {
  'tailwindcss3': 'tailwindcss3',
  'tailwindcss4-postcss': '@tailwindcss/postcss',
  'tailwindcss4-vite': '@tailwindcss/postcss',
  'unocss-vite': 'unocss',
  'unocss-postcss': '@unocss/postcss',
}

const pkgs = [
  'vite',
  'unocss',
  '@unocss/postcss',
  '@tailwindcss/vite',
  '@tailwindcss/postcss',
  'tailwindcss3',
  'tailwindcss4',
]

export async function getVersions() {
  const versions = Object.fromEntries(
    await Promise.all(
      pkgs.map(async i => [
        i,
        (await getPackageInfo(i))?.packageJson?.version,
      ]),
    ),
  )

  return versions
}
