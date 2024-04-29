const { BaseActionPage } = require("./BaseActionPage")

exports.DataTable = class DataTable extends BaseActionPage {
    constructor(page) {
        super();
        this.page = page;
        this.searchField = page.locator('input.dt-input');
        this.lastPageButton = page.getByLabel('Last');
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

    //go to last page of the table
    async goToLastTablePage() {
        await this.lastPageButton.click()
    }

    async getLastButOneRowAttributes() {
        // Get all the rows in the table body
        await this.page.waitForSelector('.hero-callout');
        // Get all the rows in the table body
        const rows = await this.table.locator('tbody tr').elementHandles();

        // Get the last but one row
        if (rows => 1) {
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
        } else {
            console.log('On the page there is no last but one element');

        }
    }

}

