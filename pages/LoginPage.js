const { BaseActionPage } = require("./BaseActionPage")

exports.LoginPage = class LoginPage extends BaseActionPage {


    constructor(page) {

        super()
        this.page = page;
        this.txtUserName = page.locator('[data-test="username"]')
        this.txtPassword = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        // this.errorButton = page.locator('[data-test="error-button"]')
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/')
    }

    async enterCredentials(userName, password) {
        await this.txtUserName.click()
        await this.txtUserName.fill(userName)
        await this.txtPassword.click()
        await this.txtPassword.fill(password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async displayedErrorMessage() {
        const errorButton = this.page.locator('[data-test="error"]')
        await errorButton.click();
        await super.verifyElementText(errorButton, 'Epic sadface: Username and password do not match any user in this service', 'Wrong username or password')
    }

    async missingUserName() {
        const errorButton = this.page.locator('[data-test="error"]')
        //await errorButton.click();
        await super.verifyElementText(errorButton, 'Epic sadface: Username is required', 'Missig username')
    }

    async missingPassword() {
        const errorButton = this.page.locator('[data-test="error"]')
        //  await errorButton.click();
        await super.verifyElementText(errorButton, 'Epic sadface: Password is required', 'Missing password')
    }



}