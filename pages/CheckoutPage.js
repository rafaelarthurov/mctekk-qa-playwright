class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators del checkout page
        this.checkoutContainer = page.locator('#checkout_info_container');
        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.zipCodeField = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorContainer = page.locator('[data-test="error"]');

        //paso dos adicionales no implementados
        this.summaryInfo = page.locator('#checkout_summary_container');
        this.finishButton = page.locator('[data-test="finish"]');

        //locators de confirmacion final
        this.confirmationContainer = page.locator('#checkout_complete_container');
        this.completeHeader = page.locator('.complete-header');
    }

    async assertLoaded() {
        await this.checkoutContainer.waitFor({ state: 'visible' });
    }

    async fillCustomerInfo(firstName, lastName, zipCode) {
        if (firstName !== undefined) await this.firstNameField.fill(firstName);
        if (lastName !== undefined) await this.lastNameField.fill(lastName);
        if (zipCode !== undefined) await this.zipCodeField.fill(zipCode);
    }
    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutPage };