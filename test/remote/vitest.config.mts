import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    testTimeout: 120000,
    hookTimeout: 120000
  }
})
