import { test, expect } from "@playwright/test"
import { DataTable } from '../pages/DataTables'

test('DataTable Test', async ({ page }) => {
    const dataTable = new DataTable(page);

    // Navigate to the DataTables website
    await dataTable.navigateToDataTablePage();

    // Search for a term and retrieve the second-to-last element
    await dataTable.searchElement('London');
    console.log('go to last page of the table..')
    await dataTable.goToLastTablePage();
    //await page.pause();

    //take attributes of the last but one element
    await dataTable.getLastButOneRowAttributes();


});