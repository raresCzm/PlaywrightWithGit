import { test, expect } from "@playwright/test"
import { LoginPage } from '../pages/LoginPage'

const data = require('./test-data.json'); // Import the data from your JSON file

test('Login Test', async ({ page }) => {
    const login = new LoginPage(page)

    // const username = data.username;
    // const password = data.password;
    const userData = data.users[0];

    await login.gotoLoginPage()
    await login.enterCredentials(userData.username, userData.password)
    await login.clickLoginButton()

});

test('Login Fail Test', async ({ page }) => {
    const login = new LoginPage(page)
    const userData = data.users[3];
    await login.gotoLoginPage()
    await login.enterCredentials(userData.username, userData.password)
    await login.clickLoginButton()
    await login.displayedErrorMessage()
});

test('Missing username Test', async ({ page }) => {
    const login = new LoginPage(page)
    const userData = data.users[1];
    await login.gotoLoginPage()
    await login.enterCredentials(userData.username, userData.password)
    await login.clickLoginButton()
    await login.missingUserName()
});

test('Missing password Test', async ({ page }) => {
    const login = new LoginPage(page)
    const userData = data.users[2];
    await login.gotoLoginPage()
    await login.enterCredentials(userData.username, userData.password)
    await login.clickLoginButton()
    await login.missingPassword()
    await page.pause()

});
