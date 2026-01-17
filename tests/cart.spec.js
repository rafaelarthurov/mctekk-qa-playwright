const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { credentials } = require('../data/credentials');
const data = require('../data/data.json');

test.describe('Cart - Saucedemo', () => {
    
    test.beforeEach(async ({page}) => {
        // Navegar al login page antes de cada test
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // Realizar login con usuario y contraseña validos
        await loginPage.login(credentials.validUser, credentials.validPassword);
        await page.waitForURL(/.*inventory\.html/);
        // Verificar que el inventory page se ha cargado
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.assertLoaded();
    });

    test('6- Agregar items al carrito y mostrarlos', async ({page}) => {
        const inventoryPage = new InventoryPage(page);

        // Agregar dos items al carrito
        const itemsDetails = data.items;
        for (const item of itemsDetails) {
            await inventoryPage.addItemToCart(item); 
        }

        // Verificar que el contador del carrito muestra 2 items
        await expect.poll(async () => {
            return await inventoryPage.getNumberOfItemsInCart();
        }).toBe(2);

        // Ir al carrito
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart\.html/);

        // Verificar que el cart page se ha cargado
        const cartPage = new CartPage(page);
        await cartPage.assertLoaded();
        
        // Verificar que hay 2 items en el carrito
        await expect.poll(async () => {
            return await cartPage.getNumberOfItemsInCart();
        }).toBe(2);
    });
});

