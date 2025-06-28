import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  // Commands dari AdonisJS & Lucid
  commands: [() => import('@adonisjs/core/commands'), () => import('@adonisjs/lucid/commands')],

  // Service Providers yang dipakai
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    () => import('@adonisjs/core/providers/vinejs_provider'),
    () => import('@adonisjs/core/providers/edge_provider'), // 👈 Penting untuk view
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/vite/vite_provider'),
    () => import('@adonisjs/shield/shield_provider'),
    () => import('@adonisjs/static/static_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
  ],

  // File yang akan dipreload saat app jalan
  preloads: [
    () => import('#start/routes'),
    () => import('#start/kernel'),
    () => import('#start/view'), // 👈 Penting untuk helper view seperti `old()` dan `errors()`
  ],

  // Setup test
  tests: {
    suites: [
      {
        name: 'unit',
        files: ['tests/unit/**/*.spec(.ts|.js)'],
        timeout: 2000,
      },
      {
        name: 'functional',
        files: ['tests/functional/**/*.spec(.ts|.js)'],
        timeout: 30000,
      },
    ],
    forceExit: false,
  },

  // Meta files untuk reload server jika file view/public berubah
  metaFiles: [
    {
      pattern: 'resources/views/**/*.edge',
      reloadServer: false,
    },
    {
      pattern: 'public/**',
      reloadServer: false,
    },
  ],

  // Menyatakan tidak pakai assetsBundler built-in
  assetsBundler: false,

  // Build hook saat `node ace build`
  hooks: {
    onBuildStarting: [() => import('@adonisjs/vite/build_hook')],
  },
})
