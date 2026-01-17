const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { credentials } = require('../data/credentials');

test.describe('Login - Saucedemo', () => {
    
    test.beforeEach(async ({page}) => {
        // Navegar al login page antes de cada test
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('4- Login exitoso - Credenciales válidas', async ({page}) => {
        const loginPage = new LoginPage(page);

        // Realizar login con usuario y contraseña validos
        await loginPage.login(credentials.validUser, credentials.validPassword);

        // Verificar que la URL es la del inventario
        await expect(page).toHaveURL(/.*inventory\.html/);

        const inventoryContainer = page.locator('[data-test="inventory-container"]');
        await expect(inventoryContainer).toBeVisible();
    });

    test('3- Login fallido con credenciales invalidas', async ({page}) => {
        const loginPage = new LoginPage(page);

        // Realizar login con usuario y contraseña invalidos
        await loginPage.login('invalid_user', 'wrong_password');
        // Verificar que el mensaje de error es visible
        await expect(loginPage.errorMessage).toBeVisible();

        // Verificar que se muestra el mensaje de error
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');

    });

});

