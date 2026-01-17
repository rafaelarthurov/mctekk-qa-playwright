class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators del cart page
        this.cartContainer = page.locator('#cart_contents_container');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async assertLoaded() {
        await this.cartContainer.waitFor({ state: 'visible' });
    }

    async getNumberOfItemsInCart() {
        return await this.cartItems.count();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }  
}

module.exports = { CartPage };