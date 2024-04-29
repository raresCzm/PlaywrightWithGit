import { test } from "@playwright/test";
import { OrangeHRM } from '../pages/OrangeHRM';
const data = require('./orangeHRM.json');

// Define a function to handle the common steps
async function performUserActions(page, user, action) {
    const orangeHRM = new OrangeHRM(page);
    await orangeHRM.gotoLoginPage();
    await orangeHRM.login(data.admin[0].username, data.admin[0].password);
    await orangeHRM.clickLoginButton();
    await orangeHRM.validateLogin();

    switch (action) {
        case 'add':
            await orangeHRM.gotoPIMPage();
            await orangeHRM.validatePIMPage();
            await orangeHRM.addUser(user.firstName, user.lastName, user.username, user.password);
            break;
        case 'login':
            await orangeHRM.logOut();
            await orangeHRM.login(user.username, user.password);
            await orangeHRM.clickLoginButton();
            await orangeHRM.validateLogin();
            //await orangeHRM.logOut();
            break;
        case 'search':
            await orangeHRM.validateLogin();
            await orangeHRM.gotoPIMPage();
            await orangeHRM.searchEmployeeAndGoToPersonalDetails(user.lastName);
            await orangeHRM.validatePersonalDetails();
            break;
        case 'delete':
            await orangeHRM.validateLogin();
            await orangeHRM.gotoPIMPage();
            await orangeHRM.searchEmployee(user.firstName);
            await orangeHRM.deleteUser();
            break;
        default:
            throw new Error(`Invalid action: ${action}`);
    }
    await orangeHRM.logOut();
}

// Define a reusable test function
function actionToPerform(action) {
    return async ({ page }) => {
        for (const userData of data.users) {
            await performUserActions(page, userData, action);
        }
    };
}

// Define tests
test.describe("Add User", () => {
    test("Add user", actionToPerform("add"));
});

test.describe("Login to new user account", () => {
    test("Login to new account", actionToPerform("login"));
});

test.describe("Search for user", () => {
    test("Search for user", actionToPerform("search"));
});

test.describe("Delete user", () => {
    test("Delete user", actionToPerform("delete"));
});
