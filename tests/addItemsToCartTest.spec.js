import { test, expect } from "@playwright/test"
import { ProductsPage } from '../pages/ProductsPage'
import { LoginPage } from '../pages/LoginPage'

test('Products Test', async ({ page }) => {

    const login = new LoginPage(page)

    await login.gotoLoginPage()
    await login.enterCredentials('standard_user', 'secret_sauce')
    await login.clickLoginButton()

    //a break
    //await page.pause();

    const productsPage = new ProductsPage(page)
    //confirm page is opened
    productsPage.confirmPage()


    await productsPage.addProductsToCart()
    await productsPage.goToCart()


});