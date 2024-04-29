import { test, expect } from "@playwright/test"
import { DataTableGetElementFromEveryPage } from '../pages/DataTablesGetElementFromEveryPage'

test('Retrieve Attributes from Every Page', async ({ page }) => {
    const dataTable = new DataTableGetElementFromEveryPage(page);

    // Navigate to the DataTable page
    await dataTable.navigateToDataTablePage();

    await dataTable.searchElement('London');

    // Keep clicking the "Next" button and retrieve attributes
    while (true) {

        // Check if the "Next" button is visible
        const isNextButtonVisible = await dataTable.isNextButtonVisible();

        // Retrieve attributes from the last but one row
        await dataTable.getLastButOneRowAttributes();

        // Break the loop if the "Next" button is not visible
        if (!isNextButtonVisible) {
            console.log("Next button is not visible. Stopping the test.");
            break;
        }

        // Go to the next page
        await dataTable.goToNextTablePage();

    }
});
