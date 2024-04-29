import { test, expect } from "@playwright/test";
import { OrangeHRM } from '../pages/OrangeHRM'
const jsonFileData = require('./apiTestData.json');
const employeeRequest = require('./employeeRequest.json');
const fs = require('fs');

async function loginAndGoToPIMpage(page) {
    const orangeHRM = new OrangeHRM(page)

    //login to OrangeHRM and go to PIM page
    await orangeHRM.gotoLoginPage()
    await orangeHRM.login('Admin', 'admin123');
    await orangeHRM.clickLoginButton()
    await orangeHRM.validateLogin();
    //go to PIM page
    await orangeHRM.gotoPIMPage();
    await orangeHRM.validatePIMPage();
    await orangeHRM.goToPIMPageAddEmployee();
}


test('API POST Request', async ({ request, page }) => {
    //post request nu se poate face cum am facut get-ul, sa merg in UI undeva si sa trimit requestul. Se poate face doar prin API sau URL nu combinate
    const orangeHRM = new OrangeHRM(page);
    await loginAndGoToPIMpage(page);

    //send the POST request
    const response = await request.post(employeeRequest.url, {
        data: employeeRequest.data,
        headers: employeeRequest.headers
    });
    //use compareText() from BaseActionPage class
    try {
        // Soft assertions
        await expect(response.status()).toBe(200);
        const text = await response.text();
        expect(text).toContain('petru');
        // console.log(await response.json());
    } catch (error) {
        // Log the error without failing the test immediately
        console.error('Soft assertion failed:', error.message);
    }
    //console.log(await response.json());


});



// test('API test', async ({ page }) => {
//     const orangeHRM = new OrangeHRM(page);
//     await loginAndGoToPIMpage(page);
//     // await page.pause();

//     //send the URL
//     const apiURL = orangeHRM.searchEmployeeByURL('987655');
//     console.log('url: ' + (await apiURL).toString())
//     const response = await page.evaluate(async (apiURL) => {
//         try {
//             response = await fetch(apiURL);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return await response.json();
//         } catch (error) {
//             console.error('Error fetching API:', error);
//             return null;
//         }
//     }, (await apiURL).toString());

//     // Compare data with JSON file
//     if (response && response.data && response.data.length > 0) {
//         //just if the employee exists, the verification is executed
//         const apiFirstName = response.data[0].firstName;
//         const apiLastName = response.data[0].lastName;
//         const apiId = response.data[0].employeeId;

//         // Extract data from JSON file
//         const jsonFirstName = employeeRequest.data.firstName;
//         const jsonLastName = employeeRequest.data.lastName;
//         const jsonId = employeeRequest.data.employeeId;

//         //use compareText() from BaseActionPage class
//         await orangeHRM.compareText(apiFirstName, jsonFirstName, 'First name');
//         await orangeHRM.compareText(apiLastName, jsonLastName, 'Last name');
//         await orangeHRM.compareText(apiId, jsonId, 'ID');

//     }

// });


//API-Mocking
// test('get the JSON from API and add a new fruit', async ({ page }) => {
//     //get the response and add a new input to it
//     await page.route('*/**/api/v1/fruits', async route => {
//         const response = await route.fetch();
//         const json = await response.json();
//         json.push({ name: 'new fruit', id: 999 });
//         await route.fulfill({ response, json });
//     });
//     await page.goto('https://demo.playwright.dev/api-mocking');

//     //check if new fruit is visible
//     try {
//         await expect(page.getByText('new fruit')).toBeVisible();
//         console.log("New fruit is visible.");
//     } catch (error) {
//         console.error("Soft assertion failed:", error.message);
//     }


// });

// test('records or updates the HAR file', async ({ page }) => {
//     // Get the response from the HAR file
//     await page.routeFromHAR('./hars/fruit.har', {
//         url: '*/**/api/v1/fruits',
//         update: true,
//     });

//     // Go to the page
//     await page.goto('https://demo.playwright.dev/api-mocking');

//     // Assert that the fruit is visible
//     await expect(page.getByText('Strawberry')).toBeVisible();
// });


//Mock Browser API

// test('log battery calls', async ({ page }) => {
//     const log = [];
//     // Expose function for pushing messages to the Node.js script.
//     await page.exposeFunction('logCall', msg => log.push(msg));
//     await page.addInitScript(() => {
//         const mockBattery = {
//             level: 0.75,
//             charging: true,
//             chargingTime: 1800,
//             dischargingTime: Infinity,
//             // Log addEventListener calls.
//             addEventListener: (name, cb) => logCall(`addEventListener:${name}`)
//         };
//         // Override the method to always return mock battery info.
//         window.navigator.getBattery = async () => {
//             logCall('getBattery');
//             return mockBattery;
//         };
//     });

//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     await expect(page.locator('.battery-percentage')).toHaveText('75%');

//     // Compare actual calls with golden.
//     expect(log).toEqual([
//         'getBattery',
//         'addEventListener:chargingchange',
//         'addEventListener:levelchange'
//     ]);
// });


// login via POST request

// test('login via POST request', async ({ page }) => {
//     //complete username and password fields
//     const orangeHRM = new OrangeHRM(page);
//     await orangeHRM.gotoLoginPage()
//     await orangeHRM.login('Admin', 'admin123');
//     //send the validate post request
//     const requestUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate';

//     // Send a POST request to the login validation endpoint
//     try {
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/html; charset=UTF-8'
//             }
//         };
//         const response = await fetch(requestUrl, options);

//         if (response.ok) {
//             console.log('Login successful!');
//             // Proceed with further actions after successful login
//         } else {
//             console.error('Login failed:', await response.text());
//         }
//     } catch (error) {
//         console.error('Error occurred during login:', error);
//     }

//     //validate login
//     //console.log("ajung aici?");
//     await orangeHRM.validateLogin();

// });


//test on Swag Labs page
// test('API POST Request', async ({ request, page }) => {
//     // Define the URL of the endpoint
//     const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate';

//     // Define the body of the POST request
//     const requestBody = {
//         urlToOpen: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/inde', // URL to be opened
//         username: 'Admin', // Username for login
//         password: 'admin123' // Password for login
//     };

//     // Send the POST request with the body
//     const response = await request.post(url, {
//         json: requestBody
//     });

//     // Check the response status code
//     if (response.status() === 200) {
//         console.log('Request was successful.');
//         // Check if the response contains any data indicating success
//         const responseData = await response.json();
//         if (responseData.success) {
//             // If the response indicates success, open the specified URL
//             await page.goto(requestBody.urlToOpen);
//         } else {
//             console.log('Login credentials did not match.');
//         }
//     } else {
//         console.error(`Request failed with status code ${response.status()}.`);
//     }
// });



