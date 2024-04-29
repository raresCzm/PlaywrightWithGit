const { BaseActionPage } = require("./BaseActionPage")

exports.NestedTablePage = class NestedTablePage extends BaseActionPage {
    constructor(page) {
        super();
        this.page = page;
        this.searchField = page.locator('input.dt-input');
        this.lastPageButton = page.getByLabel('Last');
        this.table = page.locator('.hero-callout');
    }

    async navigateToDataTablePage() {
        await this.page.goto('https://datatables.net/extensions/responsive/examples/column-control/colreorder.html')
    }


    async searchElement(searchText) {
        // Perform search in the DataTable
        await this.searchField.click();
        await this.searchField.fill(searchText);
    }

    async moveFirstColumnToLastPlace() {

        // Find the first column
        const firstColumnLocator = await this.page.locator('//th[@aria-label="First name: Activate to invert sorting"]');

        // Find the last column
        const lastColumnLocator = await this.page.locator('//th[@aria-label="Salary: Activate to sort"]');

        const lastNameColumn = await this.page.locator('th[aria-label="Last name: Activate to sort"]');

        // Swap the positions of the first and last columns
        await this.page.locator('//th[@aria-label="First name: Activate to invert sorting"]').dragTo(this.page.locator('//th[@aria-label="Salary: Activate to sort"]'));
        await this.page.locator('//th[@aria-label="Salary: Activate to sort"]').dragTo(this.page.locator('th[aria-label="Last name: Activate to sort"]'));

        const firstColumnIndex = 0;

        // Get the index of the last column (6 in this case)
        const lastColumnIndex = 6;

    }

}