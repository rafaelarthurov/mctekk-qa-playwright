const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,

  use: {
    baseURL: 'https://www.saucedemo.com/',  // simplifica las URLs relativas "page.goto('/')"
    headless: true,                         // para ejecutar sin interfaz gráfica (headless)
    screenshot: 'only-on-failure',          // captura de pantallas solo en fallos
    video: 'retain-on-failure',             // videos solo en fallos
    trace: 'retain-on-failure',             // activando trace para los fallos
  },

  reporter: [['html', { open: 'never' }]], // reporte HTML

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // BONUS - otro navegador:
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
