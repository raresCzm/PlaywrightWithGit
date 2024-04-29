const { BaseActionPage } = require("./BaseActionPage")

exports.DataTableGetElementFromEveryPage = class DataTableGetElementFromEveryPage extends BaseActionPage {
    constructor(page) {
        super();
        this.page = page;
        this.searchField = page.locator('input.dt-input');
        //this.lastPageButton = page.getByLabel('Last');
        this.nextPageButton = page.locator('button[aria-label="Next"]');
        this.table = page.locator('.hero-callout');
    }
    async navigateToDataTablePage() {
        await this.page.goto('https://datatables.net/')
    }
    async searchElement(searchText) {
        // Perform search in the DataTable
        await this.searchField.click();
        await this.searchField.fill(searchText);
    }
    async goToNextTablePage() {
        console.log('Next page...')
        await this.nextPageButton.click();
    }

    async isNextButtonVisible() {
        let clickButton = true;
        // Check if the button is in the viewport
        let isButtonVisible = await this.nextPageButton.isEnabled();

        // Click the button only if it is visible
        if (!isButtonVisible) {
            //await  this.nextPageButton.click();
            clickButton = false;
            return clickButton;
            //console.log("Clicked on Next button");
        } else {
            return clickButton;
            //  console.log("Next button is not visible");
        }
    }

    async getLastButOneRowAttributes() {

        // Get all the rows in the table body
        await this.page.waitForSelector('.hero-callout');
        // Get all the rows in the table body
        const rows = await this.table.locator('tbody tr').elementHandles();
        // Introduce a 2-second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get the last but one row
        if (rows.length <= 1) {
            console.log('On the page there is no last but one element');

        } else {
            const lastButOneRow = rows[rows.length - 2];

            // Get all cells in the last but one row
            const cells = await lastButOneRow.$$('td');

            // Get header cells to extract column names
            const headerCells = await this.table.locator('thead tr th').elementHandles();
            const columnNames = await Promise.all(headerCells.map(cell => cell.textContent()));

            // Loop through each cell and display the column name along with its value
            for (let i = 0; i < cells.length; i++) {
                const columnName = columnNames[i];
                const cellText = await cells[i].textContent();
                console.log(`${columnName}: ${cellText}`);
            }

        }
    }


}