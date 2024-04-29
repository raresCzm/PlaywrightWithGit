import { test, expect } from "@playwright/test"
import { OrangeHRM } from '../pages/OrangeHRM'

// test('Search for Employee', async ({ page }) => {
//     const orangeHRM = new OrangeHRM(page)

//     await orangeHRM.gotoLoginPage()
//     await orangeHRM.login('Admin', 'admin123')
//     await orangeHRM.clickLoginButton()
//     await orangeHRM.validateLogin();

//     //go to PIM page
//     await orangeHRM.gotoPIMPage();
//     await orangeHRM.validatePIMPage();
//     await orangeHRM.searchEmployeeAndGoToPersonalDetails('Cozmaa');
//     await orangeHRM.validatePersonalDetails();
//     await orangeHRM.logOut();

// });


test('Employee operations', async ({ page }) => {
    const driverLicense = "1111222";
    const orangeHRM = new OrangeHRM(page)

    await orangeHRM.gotoLoginPage()
    await orangeHRM.login('Admin', 'admin123')
    await orangeHRM.clickLoginButton()
    await orangeHRM.validateLogin();

    //add user
    console.log("Create new employee...")
    //go to PIM page
    await orangeHRM.gotoPIMPage();
    await orangeHRM.validatePIMPage();

    await orangeHRM.addUser("Raress", "Cozmaa", "cozmaUserr", "password12");
    //log out
    await orangeHRM.logOut();

    //login to the new user account
    console.log("Login into new employee account...")
    await orangeHRM.login("cozmaUserr", "password12");
    await orangeHRM.clickLoginButton();
    await orangeHRM.validateLogin();
    //log out
    await orangeHRM.logOut();

    // Wait for 3 seconds after logging out
    await page.waitForTimeout(3000);

    //search employee test
    console.log("Search for employee...")
    await orangeHRM.gotoLoginPage();
    await orangeHRM.login('Admin', 'admin123')
    await orangeHRM.clickLoginButton()
    //go to PIM page
    await orangeHRM.gotoPIMPage();
    await orangeHRM.validatePIMPage();
    await orangeHRM.searchEmployeeAndGoToPersonalDetails('Cozmaa');
    await orangeHRM.validatePersonalDetails();
    //await orangeHRM.logOut();

    //delete a user
    console.log("Delete employee...")
    // await orangeHRM.login('Admin', 'admin123')
    // await orangeHRM.clickLoginButton();
    await orangeHRM.gotoPIMPage();
    await orangeHRM.validatePIMPage();
    await orangeHRM.searchEmployee('Cozma');

    await orangeHRM.deleteUser();

    //await orangeHRM.logOut();

    //await page.pause();

});

