import { test, expect } from "@playwright/test"
import { NestedTablePage } from '../pages/NestedTablePage'

test('Nested Table Test', async ({ page }) => {
    const nestedTablePage = new NestedTablePage(page);

    // Navigate to the DataTables website
    await nestedTablePage.navigateToDataTablePage();

    // Search for a term and retrieve the second-to-last element
    await nestedTablePage.searchElement('London');

    //await page.pause();

    //take attributes of the last but one element
    await nestedTablePage.moveFirstColumnToLastPlace();
    //await page.pause();



});