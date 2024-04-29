const { BaseActionPage } = require("./BaseActionPage")
const fs = require('fs');
const yaml = require('js-yaml');

exports.OrangeHRM = class OrangeHRM extends BaseActionPage {

    constructor(page) {
        super();
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' })
    }

    async gotoLoginPage() {
        // await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        // Read YAML configuration file
        const configFilePath = 'firstYAMLFile.yml'; // Adjust the file name here
        const configFileContents = fs.readFileSync(configFilePath, 'utf8');
        const config = yaml.load(configFileContents);

        // Extract the URL for the login page
        const loginPageUrl = config.pageToNavigate;

        // Navigate to the login page
        await this.page.goto(loginPageUrl);
    }

    async login(userName, insertedPassword) {
        await this.username.click()
        await this.username.fill(userName)
        await this.password.click()
        await this.password.fill(insertedPassword)
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async validateLogin() {
        console.log('validate login...')
        const dashboardHeading = this.page.locator('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module');
        const textContent = await dashboardHeading.textContent();
        await this.verifyElementText(dashboardHeading, textContent, "Login failed.")
    }

    async gotoPIMPage() {
        const pimButton = this.page.getByRole('link', { name: 'PIM' });
        await pimButton.click();
    }

    async goToPIMPageAddEmployee() {
        this.gotoPIMPage();
        const navigateToAddEmployee = this.page.getByRole('button', { name: 'Add' });
        await navigateToAddEmployee.click();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds

    }

    async validatePIMPage() {
        const pimHeading = this.page.locator('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module');
        const textContent = await pimHeading.textContent();
        await this.verifyElementText(pimHeading, textContent, "PIM page not displayed!")
    }

    async addUser(firstN, lastN, user, pass) {
        const addButton = this.page.getByRole('button', { name: 'Add' });
        await addButton.click();
        const firstName = this.page.getByPlaceholder('First Name');
        await firstName.fill(firstN);
        const lastName = this.page.getByPlaceholder('Last Name');
        await lastName.fill(lastN);
        const createLoginDetails = this.page.locator('form span');
        await createLoginDetails.click();
        const userName = this.page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input');
        await userName.fill(user);

        await this.page.locator('input[type="password"]').first().click();
        await this.page.locator('input[type="password"]').first().fill(pass);
        await this.page.locator('input[type="password"]').nth(1).click();
        await this.page.locator('input[type="password"]').nth(1).fill(pass);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds

    }

    async logOut() {
        const arrowDown = this.page.locator('i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon');
        arrowDown.click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    }

    async searchEmployee(nameOfEmployee) {
        await this.page.getByPlaceholder('Type for hints...').first().fill(nameOfEmployee);
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds

    }

    async searchEmployeeAndGoToPersonalDetails(employeeName) {

        //console.log("Inside searchEmployeeAndGoToPersonalDetails method...")
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        await this.page.getByPlaceholder('Type for hints...').first().fill(employeeName);
        await this.page.getByRole('button', { name: 'Search' }).click();
        //go to Personal Details page
        const firstEditButton = await this.page.locator('.oxd-icon.bi-pencil-fill').nth(0);
        await firstEditButton.click();

    }

    async validatePersonalDetails() {
        //await this.page.waitForTimeout(3000); // Wait for 3 seconds

        const personalDetailsElement = await this.page.locator('h6.oxd-text.oxd-text--h6.orangehrm-main-title').nth(0);
        const textContent = await personalDetailsElement.textContent();
        this.verifyElementText(personalDetailsElement, textContent, "Search not working!")
    }

    async updateDriverLicenseNumber(textToAdd) {
        const driverLicenseElement = this.page.locator('div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-input');
        await driverLicenseElement.click();
        await driverLicenseElement.fill(textToAdd);

        //save
        const saveButton = await this.page.$$('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space');
        await saveButton[0].click();

        // this.verifyElementText(driverLicenseElement, driverLicenseElement.textContent(), "Licence number not update correctly!")
    }

    async verifyDriverLicenseNumber(expectedText) {

        const driverLicenseElement = this.page.locator('div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-input');
        const textContent = await driverLicenseElement.textContent();

        if (expectedText == textContent) {
            console.log("Licence driver updated")
        } else {
            console.log("Licence driver not update correctly");
        }


        //this.verifyElementText(driverLicenseElement, expectedText, "Driver License Number not updated correctly!")
    }

    async deleteUser() {
        //go to PIM page and press the delete button for the first user
        const deleteButton = await this.page.locator('.oxd-icon.bi-trash').first();
        await deleteButton.click();
        const yesDeleteButton = await this.page.locator('button:has-text("Yes, Delete")');
        await yesDeleteButton.click();
        //Wait for the success toast to appear
        const successToast = await this.page.waitForSelector('.oxd-toast--success', { timeout: 3000 });

        // // Extract the text content of the success message
        const successMessageElement = await successToast.$('.oxd-text--toast-message');
        const successMessage = await successMessageElement.textContent();

        // Verify the success message
        if (successMessage.trim() === 'Successfully Deleted') {
            console.log('User deletion successful!');
        } else {
            console.log('User deletion failed!');
        }
        //this.verifyElementText(successToast,successMessage,"Deletion of user not performed!")


    }

    async searchEmployeeByURL(nameOrId) {
        //const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&nameOrId=0024&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC';

        const firstPartOfURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=';
        const lastPartOfURL = '&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC';

        const url = firstPartOfURL + nameOrId + lastPartOfURL;
        return url;

    }

    async validateLogin() {
        const request = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate';

        

    }




}