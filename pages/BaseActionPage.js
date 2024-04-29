const { expect } = require("@playwright/test");

exports.BaseActionPage = class BaseActionPage {

    constructor(page) {
        this.page = page
        this.softAssertions = [];
    }

    // async verifyElementText(element, expectedText) {
    //     // Get the text content of the element
    //     const elementText = await element.textContent()
    //     expect(elementText).toBe(expectedText)

    // }

    async verifyElementText(element, expectedText, assertionDescription) {
        // Get the text content of the element
        const elementText = await element.textContent();

        // Perform a soft assertion and collect failures
        try {
            expect(elementText).toBe(expectedText);
            //console.log(`Soft assertion passed: ${assertionDescription}`);
        } catch (error) {
            console.error(`Soft assertion failed: ${assertionDescription}`);
            this.softAssertions.push({
                description: assertionDescription,
                error: error.message,
            });
        }
    }

    reportSoftAssertions() {
        // Report soft assertion failures
        if (this.softAssertions.length > 0) {
            // console.error('Soft assertions failed:');
            this.softAssertions.forEach((failure, index) => {
                console.error(`${index + 1}. ${failure.description}: ${failure.error}`);
            });
        } else {
            console.log('All soft assertions passed.');
        }
    }

    async compareText(expectedText, actualText, fieldName) {
        try {
            expect(actualText).toBe(expectedText);
            console.log(`${fieldName}: Passed - Expected: ${expectedText}, Actual: ${actualText}`);
        } catch (error) {
            console.error(`${fieldName}: Failed - Expected: ${expectedText}, Actual: ${actualText}`);
            // Handle the error or log it as per your requirement
        }
    }

};

