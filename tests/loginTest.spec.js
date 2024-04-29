import { test, expect } from "@playwright/test"
import { LoginPage } from '../pages/LoginPage'


test('Login Test', async ({ page }) => {
    const login = new LoginPage(page)

    await login.gotoLoginPage()
    await login.enterCredentials('standard_user', 'secret_sauce')
    await login.clickLoginButton()

});

test('Login Fail Test', async ({ page }) => {
    const login = new LoginPage(page)
    await login.gotoLoginPage()
    await login.enterCredentials('standard_u', 'secret_sauce')
    await login.clickLoginButton()
    await login.displayedErrorMessage()
});

test('Missing username Test', async ({ page }) => {
    const login = new LoginPage(page)
    await login.gotoLoginPage()
    await login.enterCredentials('', 'secret_sauce')
    await login.clickLoginButton()
    await login.missingUserName()
});

test('Missing password Test', async ({ page }) => {
    const login = new LoginPage(page)
    await login.gotoLoginPage()
    await login.enterCredentials('standard_user', '')
    await login.clickLoginButton()
    await login.missingPassword()
   // await page.pause()

});