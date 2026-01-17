const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { credentials } = require('../data/credentials');
const data = require('../data/data.json');

test.describe('Checkout - Saucedemo', () => {

    test.beforeEach(async ({ page }) => {
        // Navegar al login page antes de cada test
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // Realizar login con usuario y contraseña validos
        await loginPage.login(credentials.validUser, credentials.validPassword);
        await page.waitForURL(/.*inventory\.html/);
        // Verificar que el inventory page se ha cargado
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.assertLoaded();

        for (const item of data.items) {
            await inventoryPage.addItemToCart(item);
        }

        // Ir al carrito
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart\.html/);

        // Verificar que el cart page se ha cargado
        const cartPage = new CartPage(page);
        await cartPage.assertLoaded();
        await expect.poll(async () => cartPage.getNumberOfItemsInCart()).toBe(data.items.length);

        // Proceder al checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

    test('12- Checkout exitoso - Finalizar compra', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        // Verificar que el checkout page se ha cargado
        await checkoutPage.assertLoaded();

        // Completar el formulario de checkout
        await checkoutPage.fillCustomerInfo(data.customers[0].firstName, data.customers[0].lastName, data.customers[0].postalCode);
        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
        await expect(checkoutPage.summaryInfo).toBeVisible();

        // Finalizar el checkout
        await checkoutPage.finishCheckout();

        await expect(page).toHaveURL(/.*checkout-complete\.html/);
        await expect(checkoutPage.confirmationContainer).toBeVisible();
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    test("11- Checkout negativo - Postal Code requerido", async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        // Verificar que el checkout page se ha cargado
        await checkoutPage.assertLoaded();

        //Compeltar el formulario sin enviar el zip code
        await checkoutPage.fillCustomerInfo(data.customers[0].firstName, data.customers[0].lastName, data.customers[0].emptyPostalCode);
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorContainer).toBeVisible();
        await expect(checkoutPage.errorContainer).toContainText('Error: Postal Code is required');
    });

    test("EVIDENCIA - FALLA INTENCIONAL :: Postal Code requerido", async ({ page }) => {
        // NOTA: este test falla intencionalmente para evidenciar screenshot/video configurados "only-on-failure".

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.assertLoaded();
        await checkoutPage.fillCustomerInfo(data.customers[0].firstName, data.customers[0].lastName, data.customers[0].emptyPostalCode);
        await checkoutPage.continueCheckout();
        await expect(checkoutPage.errorContainer).toBeVisible();
        // String para que pase el test: 'Error: Postal Code is required'
        await expect(checkoutPage.errorContainer).toContainText('Test que falla a proposito');
    });

});