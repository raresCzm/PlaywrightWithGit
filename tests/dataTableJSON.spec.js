import { test, expect } from "@playwright/test"
import { DataTableGetElementFromEveryPage } from '../pages/DataTablesGetElementFromEveryPage'
const data = require('./dataTable.json');

data.cities.forEach((city) => {
    test(`Retrieve Attributes for ${city.city}`, async ({ page }) => {
        const dataTable = new DataTableGetElementFromEveryPage(page);

        // Navigate to the DataTable page
        await dataTable.navigateToDataTablePage();

        // Search for the city in the DataTable
        await dataTable.searchElement(city.city);

        // Keep clicking the "Next" button and retrieve attributes
        while (true) {
            // Check if the "Next" button is visible
            const isNextButtonVisible = await dataTable.isNextButtonVisible();

            // Retrieve attributes from the last but one row
            await dataTable.getLastButOneRowAttributes();

            // Break the loop if the "Next" button is not visible
            if (!isNextButtonVisible) {
                console.log("Next button is not visible. Stopping the test for " + city.city);
                break;
            }

            // Go to the next page
            await dataTable.goToNextTablePage();
        }
    });
});