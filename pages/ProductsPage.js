const { BaseActionPage } = require("./BaseActionPage")

exports.ProductsPage = class ProductsPage extends BaseActionPage {

    constructor(page) {
        super()
        this.page = page
        this.addToCartSauceLabsBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.addToCardBickLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.cart = page.locator('a').filter({ hasText: '2' })
        // await page.locator('a').filter({ hasText: '2' }).click();
    }

    async addProductsToCart() {
        await this.addToCartSauceLabsBackpack.click()
        await this.addToCardBickLight.click()
    }

    async goToCart() {
        await this.cart.click()
    }

    async confirmPage() {
        const titleElement = await this.page.locator('span.title');
        super.verifyElementText(titleElement, "Products", ' Successful login. Products page opened')

    }




}