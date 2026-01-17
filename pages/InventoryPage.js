class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators del inventory page
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
        this.shoppingCartWithItems = page.locator('[data-test="shopping-cart-badge"]');

    }

    async assertLoaded() {
        await this.inventoryContainer.waitFor({ state: 'visible' });
    }

    addToCartButton(itemName) {
        return this.page.locator(`[data-test="add-to-cart-${itemName}"]`);
    }

    removeFromCartButton(itemName) {
        return this.page.locator(`[data-test="remove-${itemName}"]`);
    }

    async addItemToCart(itemName) {
        await this.addToCartButton(itemName).click();
        await this.removeFromCartButton(itemName).waitFor({ state: 'visible' });
    }

    async removeItemFromCart(itemName) {
        await this.removeFromCartButton(itemName).click();
        await this.addToCartButton(itemName).waitFor({state: 'visible' });
    }

    async goToCart() {
        await this.shoppingCart.click();
    }

    async getNumberOfItemsInCart() {
        if (await this.shoppingCartWithItems.count() ===0){
            return 0;
        }
        const text = await this.shoppingCartWithItems.textContent();
        return Number(text);
    }
}

module.exports = { InventoryPage };