import { test, expect } from "@playwright/test"
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { BaseActionPage } from "../pages/BaseActionPage";

const userData = require('./test-data.json'); // Import the data from your JSON file


userData.users.forEach((user, index) => {
    //test
    test(`Login Test ${user.expectedText}`, async ({ page }) => {
        const login = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const baseActionPage = new BaseActionPage(page);

        await login.gotoLoginPage();
        await login.enterCredentials(user.username, user.password);
        await login.clickLoginButton();

       

        if (user.testType == 'valid') {
            test.info().annotations.push({ type: 'Custom Message', description: 'Successfully login' });
            await productsPage.confirmPage();
        } else {
            if (user.expectedText == 'Epic sadface: Username and password do not match any user in this service') {
                test.info().annotations.push({ type: 'Custom Message', description: 'Test for wrong password or username' });
                await login.displayedErrorMessage();
            } else if ((!user.username)) {
                test.info().annotations.push({ type: 'Custom Message', description: 'Test for missing username' });
                login.missingUserName();
            } else if (!user.password) {
                test.info().annotations.push({ type: 'Custom Message', description: 'Test for missing password' });
                login.missingPassword();
            }
        }

        //baseActionPage.reportSoftAssertions();

    });
});



///////////////////
//asa era before
 // Assuming the error message is displayed after a failed login attempt

        // if (user.username.trim() !== '' && user.password != 'secret_sauce' && user.expectedText == 'Epic sadface: Username and password do not match any user in this service') {
        //     console.log("test 1");
        //     test.info().annotations.push({ type: 'Custom Message', description: 'Test for wrong password or username' });
        //     await login.displayedErrorMessage();
        // }

        // //need to check if the username is missing or the password
        // if (!user.password) {
        //     console.log("test 2");
        //     test.info().annotations.push({ type: 'Custom Message', description: 'Test for missing password' });
        //     login.missingPassword();
        //     return; // Exit the test if password is empty
        // }

        // // Verification for empty username field
        // if (!user.username) {
        //     console.log("test 3");
        //     test.info().annotations.push({ type: 'Custom Message', description: 'Test for missing username' });
        //     login.missingUserName();
        //     return; // Exit the test if username is empty
        // }

        // //succes login
        // if (user.username.trim() !== '' && user.password == 'secret_sauce' && user.expectedText == '') {
        //     console.log("test 4");
        //     test.info().annotations.push({ type: 'Custom Message', description: 'Successfully login' });
        //     await productsPage.confirmPage();
        // }
