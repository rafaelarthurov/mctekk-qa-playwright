# MCTEKK - Prueba Técnica QA (Playwright + JS)

Este proyecto implementa la automatización de pruebas end-to-end con **Playwright** y **JavaScript**, para validar escenarios críticos en el sitio de práctica **SauceDemo**: login, carrito de compras y flujo de checkout. Forma parte de una práctica técnica solicitada por **MCTEKK** para el rol de QA.

---
## 🚀 Tecnologías utilizadas

- Node.js 🌳
- Playwright 🎭
- JavaScript 🧩
- HTML Reporter (Playwright) 📊

---

## 🗂️ Estructura del proyecto

```plaintext
/data
  credentials.js
  data.json
/pages
  LoginPage.js
  InventoryPage.js
  CartPage.js
  CheckoutPage.js
/tests
  login.spec.js
  cart.spec.js
  checkout.spec.js
.gitignore
.env.example
README.md
package.json
playwright.config.js
```

## 📝 Definición de cada carpeta

- `data/` → archivos de datos reutilizables (credenciales y data de pruebas)
- `pages/` → Page Objects (POM) para separar lógica de UI de los tests
- `tests/` → suites de pruebas automatizadas
- `test-results/` → se crea automáticamente al ejecutar las pruebas (evidencias) *(ignorado por git)*
- `playwright-report/` → reporte HTML generado por Playwright *(ignorado por git)*

---

## ⚙️ Instalación

1️⃣ Clonar el repositorio:

```bash
git clone https://github.com/rafaelarthurov/mctekk-qa-playwright.git
cd mctekk-qa-playwright
```

2️⃣ Instalar dependencias:

```bash
npm install
```

3️⃣ Instalar navegadores de Playwright (recomendado):

```bash
npx playwright install
```

---

## 🔐 Variables de entorno

Este proyecto soporta credenciales por variables de entorno para evitar “hardcodearlas” en el código.

1️⃣ Copia el archivo `.env.example` y renómbralo a `.env`

```bash
# Windows (PowerShell)
copy .env.example .env
```

2️⃣ Edita el `.env` si lo deseas:

```env
SAUCE_USER=standard_user
SAUCE_PASS=secret_sauce
```

> Nota: `.env` está excluido del repo por `.gitignore`.

---

## ▶️ Ejecución de las pruebas

Ejecutar todas las pruebas (por defecto corre los proyectos configurados en `playwright.config.js`):

```bash
npx playwright test
```

Ejecutar solo un navegador:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

---

## 📝 Generación de reportes

El proyecto genera un **HTML Report** (Playwright Reporter).

1️⃣ Ejecutar pruebas:

```bash
npx playwright test
```

2️⃣ Abrir el reporte:

```bash
npx playwright show-report
```

El reporte mostrará el detalle de ejecución por test y por navegador.  
Si un test falla, se adjuntan evidencias (screenshots / video) según configuración.

---

## 📌 Notas importantes

- Se configuró:
  - `baseURL` para simplificar navegación.
  - Ejecución `headless`.
  - **Screenshot solo en fallos**.
  - **Video solo en fallos**.
- Las carpetas `node_modules/`, `test-results/` y `playwright-report/` están excluidas del repositorio mediante `.gitignore`.
- La URL del entorno de pruebas es:
```bash
https://www.saucedemo.com/
```

---

## 🧪 Casos cubiertos

- Login fallido (credenciales inválidas)
- Login exitoso (credenciales válidas)
- Agregar productos al carrito y validación de items
- Checkout exitoso (finalizar compra)
- Checkout negativo (Postal Code requerido)

---

## 🎬 Evidencias (caso que falla a propósito)

Se incluyó un caso que **falla intencionalmente** para evidenciar en el reporte HTML la generación de:
- Screenshot (solo en fallos)
- Video (solo en fallos)

Esto permite visualizar claramente tests `Pass` y `Fail` junto con sus evidencias.

**Ubicación:**
- `tests/checkout.spec.js` (test marcado como falla intencional)

**Ejemplo de implementación del fallo intencional:**
- Se fuerza un assert con un texto incorrecto en el mensaje de error del checkout:
  - String correcto: `Error: Postal Code is required`
  - String usado para fallar: `Test que falla a proposito`
 <img width="1022" height="211" alt="image" src="https://github.com/user-attachments/assets/fb5c0595-e133-41d6-8ba5-c564779d3fc2" />

> Nota: **Este fallo no corresponde a un defecto del sistema bajo prueba.**

---

## 🧩 Curiosidades / Decisiones técnicas

- Se utilizó **Page Object Model (POM)** para separar:
  - tests (qué se valida)
  - pages (cómo se interactúa)
- Se priorizó el uso de selectores estables:
  - `data-test` cuando aplica
  - `#cart_contents_container` y `.cart_item` para la página del carrito

---

