import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPackageInfo } from 'local-pkg'

export const dir = dirname(fileURLToPath(import.meta.url))

export const targets = ['none', 'tailwindcss3', 'tailwindcss4', 'unocss']

const pkgs = ['vite', 'unocss', 'tailwindcss4', 'tailwindcss3']

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
