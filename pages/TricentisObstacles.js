const { BaseActionPage } = require("./BaseActionPage")
import { expect } from '@playwright/test';

exports.TricentisObstacles = class TricentisObstacles extends BaseActionPage {

    constructor(page) {
        super();
        this.page = page;

    }

    async goToTricentisPage() {
        await this.page.goto('https://obstaclecourse.tricentis.com/');
    }

    async goToObstacleListPage() {
        await this.page.goto('https://obstaclecourse.tricentis.com/Obstacles/List');
        //await this.page.goto('https://www.google.ro/?hl=ro');
    }

    async searchObstacle(obstacleNumber) {
        const searchInput = await this.page.$('input.form-control.ui-autocomplete-input#search');
        await searchInput.fill(obstacleNumber);
        const searchButton = await this.page.$('span.glyphicon.glyphicon-search.form-control-feedback#searchIcon');
        await searchButton.click();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        //const firstTd = await this.page.$('tbody tr td:first-child');
        //await firstTd.click();
        const obstacleLink = await this.page.$(`a.btn.btn-default[href="/Obstacles/${obstacleNumber}/retry"]`);
        obstacleLink.click();

        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);
    }

    async verifySuccessAlert(page) {
        try {
            // Wait for the alert to appear
            const successAlert = await this.page.waitForSelector('.sweet-alert.showSweetAlert.visible', { timeout: 5000 });

            // Check if the alert contains the message 'Good job!'
            const messageElement = await successAlert.$('h2');
            const message = await messageElement.textContent();

            if (message.trim() === 'Good job!') {
                console.log('Success alert with message "Good job!" is displayed.');
                return true;
            } else {
                console.log('Success alert is displayed but the message is not "Good job!".');
                return false;
            }
        } catch (error) {
            console.log('Success alert is not displayed.');
            return false;
        }
    }

    async solveObstacle72954() {
        const clickMe2X = await this.page.locator('a[href="#"][id^="rnd_"]');
        for (let i = 0; i < 2; i++) {
            await clickMe2X.click();
        }
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        // Step 1: Locate the container
        const container = await this.page.$('.sweet-alert.showSweetAlert.visible');

        // Step 2: Verify if the container is visible
        if (container) {
            // Step 3: Locate the "Good job!" message within the container
            const goodJobMessage = await container.$('h2:has-text("Good job!")');

            console.log('const goodJobMessage: ' + goodJobMessage.textContent());

            // Step 4: Verify if the message is displayed using assertions
            super.verifyElementText(container, goodJobMessage, "assertion failed!")

            try {
                expect(goodJobMessage).toBe("Good job!");
                //console.log(`Soft assertion passed: ${assertionDescription}`);
            } catch (error) {
                console.error(`Soft assertion failed-> in try we are`);
                this.softAssertions.push({
                    //description: assertionDescription,
                    error: error.message,
                });

            }

        }
        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }

    async solveObstacle22505() {
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        await this.page.getByRole('link', { name: 'Click me!' }).click();

        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }

    async solveObstacle64161() {
        // await this.page.waitForTimeout(3000); // Wait for 3 seconds
        // Find the container element that contains all the property grid rows

        //generate order id
        await this.page.getByRole('link', { name: 'Generate order ID' }).click();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        // Find the container element that contains all the property grids
        const container = await this.page.$('.col-md-4');
        // Get all the property grid rows within the container
        const propertyGridRows = await container.$$('.row.propertyGrid');
        let orderId = null;
        // Iterate through each property grid row
        for (const row of propertyGridRows) {
            // Find the label in the current row
            const label = await row.$('.bg-info');

            // Get the text content of the label
            const labelText = await label.textContent();

            // Check if the label text is "order id"
            if (labelText.trim() === 'order id') {
                // Find the corresponding value in the row
                const value = await row.$('.border');

                // Get the next sibling of the value element
                const nextSibling = await value.evaluateHandle(node => node.nextElementSibling);

                // Get the text content of the next sibling element
                orderId = await this.page.evaluate(node => node.textContent.trim(), nextSibling);

                // Break out of the loop since we found the order id
                break;
            }

        }
        // Output the order id
        console.log('Order ID:', orderId);

        await this.page.getByPlaceholder('Get order id from table and').click();
        await this.page.getByPlaceholder('Get order id from table and').fill(orderId);
        await this.page.getByText('Good job! You solved this').click();
        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }


    async solveObstacle92248() {
        await this.page.getByRole('row', { name: 'John Doe john@example.com' }).locator('button[name="edit"]').click();
        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }

    async solveObstacle94441() {
        // await this.page.locator('#multiselect').selectOption('Functional testing');
        // await this.page.locator('#multiselect').selectOption(['Functional testing', 'GUI testing']);
        // await this.page.locator('#multiselect').selectOption(['Functional testing', 'GUI testing', 'End2End testing']);
        await this.page.locator('#multiselect').selectOption(['Functional testing', 'GUI testing', 'End2End testing', 'Exploratory testing']);
        //await this.page.pause();
        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);


    }

    async solveObstacle24499() {
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        //take the charaters
        const spanElement = await this.page.$('#typeThis');
        let text = await spanElement.textContent();


        //type the given characters
        await this.page.getByLabel('').click();
        await this.page.getByLabel('').fill(text);

        //number the options we have
        const numOptions = await this.page.$eval('.select2-results', ul => {
            const options = ul.querySelectorAll('li');
            return options.length;
        });

        console.log('Number of options:', numOptions);

        const entryCountInput = await this.page.$('input#entryCount.form-control');
        await entryCountInput.fill(numOptions.toString());

        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }

    async solveObstacle60469() {
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        // Locate the source and target elements
        const sourceElement = await this.page.$('.panel-body.fixed-panel.text-center#from');
        const targetElement = await this.page.$('.panel-body.fixed-panel.text-center#to');

        const toscaBot = await this.page.$('img#toscabot');

        // Ensure elements are valid
        if (sourceElement && targetElement && toscaBot) {
            // Get bounding boxes of source and target elements
            const sourceBoundingBox = await sourceElement.boundingBox();
            const targetBoundingBox = await targetElement.boundingBox();

            // Drag and drop toscaBot from source to target element
            await this.page.mouse.move(sourceBoundingBox.x + sourceBoundingBox.width / 2, sourceBoundingBox.y + sourceBoundingBox.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(targetBoundingBox.x + targetBoundingBox.width / 2, targetBoundingBox.y + targetBoundingBox.height / 2);
            await this.page.mouse.up();
        } else {
            console.error('One or more elements not found.');
        }
        // await this.page.pause();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);
    }

    
    async solveObstacle23292() {

        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        const table = await this.page.$('table#todo-tasks');

        if (!table) {
            console.log('Table not found!');
            return;
        }

        const rows = await table.$$('tbody tr');
        console.log('Number of rows: ' + rows.length);
        if (rows.length === 0) {
            console.log('No rows found in the table.');
            return;
        }

        console.log('Elements in order:');
        const ids = [];
        for (const row of rows) {
            const idCell = await row.$('td:first-child'); // First column contains the ID

            if (!idCell) {
                //console.log('ID cell not found in row:', row);
                continue; // Move to the next row if ID cell is not found
            }

            const id = await idCell.textContent();
            if (id.trim() !== 'No records ...') {
                ids.push(id.trim());
            }
        }
        // Sort the IDs in ascending order
        ids.sort((a, b) => a - b);

        console.log('IDs in order:', ids);

        // Move rows to the destination table
        for (const id of ids) {
            const row = await this.page.$(`table#todo-tasks tbody tr td:first-child:has-text("${id}")`);
            if (row) {
                // Drag the row to the destination table
                await this.page.dragAndDrop(`table#todo-tasks tbody tr td:first-child:has-text("${id}")`, 'table#completed-tasks tbody');

                // Output a message indicating successful move
                console.log(`Row with ID ${id} moved to the completed tasks table.`);
            } else {
                console.log(`No row found for ID: ${id}`);
            }
        }
        //verify success alert
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }

    async solveObstacle99999() {
        await this.page.waitForTimeout(3000); // Wait for 3 seconds

    }


    async solveObstacle21269(yearOffset) {
        // Get the current year
        const currentYear = new Date().getFullYear();

        // Calculate the year for which we want to find Christmas
        const targetYear = currentYear + yearOffset;

        // Christmas is on December 25th of the target year
        const christmasDay = new Date(targetYear, 11, 25);

        // Get the day of the week for Christmas (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeek = christmasDay.getDay();

        // Array of day names
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let christmas = dayNames[dayOfWeek];

        // Return the name of the day of the week
        //insert day into textField
        const christmasDayInput = await this.page.locator('input#christmasday.form-control').first();
        await christmasDayInput.click();
        await christmasDayInput.fill(christmas);
        //await this.page.pause();
        await this.page.waitForTimeout(3000); // Wait for 3 seconds
        this.verifySuccessAlert(this.page);

    }




}
